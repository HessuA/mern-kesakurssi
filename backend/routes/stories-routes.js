const express = require("express");
const storyControllers = require("../controllers/story-controllers");
const authCheck = require("../middleware/auth-check");

// Stories reititykset

const storyRouter = express.Router();

// Hae käyttäjän storyt
storyRouter.get("/api/stories/user/:id", storyControllers.findStoriesByUserId);

// Tästä eteenpäin vaatii autentikaation

// Lisää story
storyRouter.post("/api/stories", authCheck, storyControllers.createStory);

// Poista story
storyRouter.delete("/api/stories/:id", authCheck, storyControllers.deleteStory);

// Muokkaa story
storyRouter.patch(
  "/api/stories/edit/:id",
  authCheck,
  storyControllers.editStory
);

module.exports = storyRouter;
