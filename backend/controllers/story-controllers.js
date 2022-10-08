const User = require("../models/user-model");
const Story = require("../models/story-model");
const HttpError = require("../models/http-error");

// Lisää tarina
const createStory = async (req, res, next) => {
  console.log("POST, lisätään tarina");
  const { date, place, content, userId } = req.body;

  const user = await User.findById(userId);

  const newStory = new Story({
    date,
    place,
    content,
  });

  try {
    const saveStory = await newStory.save();

    // Tallennetaan storyn id  myös käyttäjän stories arrayhun
    user.stories = user.stories.concat(saveStory._id);
    await user.save();
  } catch (err) {
    const error = new HttpError("Tarinan lisääminen epäonnistui", 500);
    return next(error);
  }

  res.status(201).json(newStory);
};

// Hae käyttäjän tarinat
const findStoriesByUserId = async (req, res, next) => {
  console.log("Get, hae käyttäjän tarinat");

  const userId = req.params.id;

  let userStories;

  try {
    // Haetaan muuttujaan käyttäjä sekä hänen tarinansa
    userStories = await User.findById(userId).populate("stories", {
      content: 1,
      date: 1,
      place: 1,
    });
  } catch (err) {
    const error = new HttpError("Tarinoiden haku ei onnistunut", 500);
    return next(error);
  }

  res.json(userStories);
};

// Muokkaa tarinaa
const editStory = async (req, res, next) => {
  console.log("PATCH, muokataan tarinaa");
  const { date, place, content, userId } = req.body;

  // Parametrina saatu storyId
  const storyId = req.params.id;

  const user = await User.findById(req.userData.id);

  // Jos käyttäjältä löytyy tarina päivitetääm
  if (user.stories.includes(storyId)) {
    const story = await Story.findByIdAndUpdate(storyId, {
      date,
      place,
      content,
    });
    return res.status(204).end();
  }

  const error = new HttpError("Ei voida muokata", 401);

  return next(error);
};

// Poista yksittäinen tarina kannasta
const deleteStory = async (req, res, next) => {
  console.log("DELETE, poista tarina");

  // Parametrina saatu story id
  const storyId = req.params.id;

  // Haetaan käyttäjä
  const user = await User.findById(req.userData.id);

  // Jos käyttäjän tarinoista löytyy poistettava storyId, poistetaan tarina
  if (user.stories.includes(storyId)) {
    const story = await Story.findByIdAndRemove(storyId);

    return res.status(204).end();
  }

  const error = new HttpError("Tarinaa ei löydy", 404);

  return next(error);
};

exports.createStory = createStory;
exports.findStoriesByUserId = findStoriesByUserId;
exports.editStory = editStory;
exports.deleteStory = deleteStory;
