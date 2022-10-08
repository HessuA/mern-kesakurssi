require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const HttpError = require("../models/http-error");
const User = require("../models/user-model");

// Lisää käyttäjä
const createUser = async (req, res, next) => {
  console.log("POST, lisätään käyttäjä.");
  const { name, city, birthyear, email, password } = req.body;

  // Hashataan salasana
  const hassPassword = await bcrypt.hash(password, 12);

  // Luodaan käyttäjä
  const createNewUser = new User({
    name,
    city,
    birthyear,
    email,
    password: hassPassword,
  });

  try {
    await createNewUser.save();
  } catch (err) {
    console.log(err);
    // Jos käyttäjän lisäämä email on jo käytössä, annetaan virhe.
    if (err.errors.email) {
      const error = new HttpError("Sähköposti on jo käytössä", 400);
      return next(error);
    }

    const error = new HttpError(
      "Käyttäjän lisääminen epäonnistui, kokeile uudelleen",
      500
    );
    return next(error);
  }

  res.status(201).json(createNewUser);
};

// Kirjaudu sisään.
const logIn = async (req, res, next) => {
  console.log("Post, kirjaudu sisään");
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  // Tarkastetaan että salasana täsmää
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.password);

  if (!(user && passwordCorrect)) {
    const error = new HttpError("Sähköposti tai salasana on väärin.", 401);
    return next(error);
  }

  const userToken = {
    username: user.name,
    id: user._id,
  };

  const token = jwt.sign(userToken, process.env.TOKENSECRET);

  res.status(200).json({ token, user: user.name, user_id: user._id });
};

// Hae kaikki käyttäjät
const getAllUsers = async (req, res, next) => {
  console.log("Get pyyntö, hae kaikki käyttäjät.");
  let users;
  try {
    users = await User.find().populate("stories", {
      content: 1,
      date: 1,
      place: 1,
    });
  } catch (err) {
    const error = new HttpError(
      "Jotain meni pieleen, ei voi hakea käyttäjiä",
      500
    );
    return next(error);
  }

  if (!users || users.length === 0) {
    const error = new HttpError("Yhtään käyttäjää ei löytynyt", 404);
    return next(error);
  }

  res.json(users);
};

exports.getAllUsers = getAllUsers;
exports.createUser = createUser;
exports.logIn = logIn;
