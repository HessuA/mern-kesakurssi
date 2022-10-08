require("dotenv").config();
const jwt = require("jsonwebtoken");
const HttpError = require("../models/http-error");

// autentikointi ja autorisointikoodit
module.exports = (req, res, next) => {
  console.log("Tarkastetaan");
  // if (req.method === "OPTIONS") {
  //   return next();
  // }
  try {
    console.log(req.body);
    // Req saatu token
    const token = req.headers.authorization.substring(7);
    console.log(token);
    const decodedToken = jwt.verify(token, process.env.TOKENSECRET);

    // Jos ei ole tokenia tai tokenista decoodattu id ei ole pyynnön mukana tullut userId niin autentikaatio ei mene läpi
    if (!token || decodedToken.id !== req.body.userId) {
      console.log("Täällä. throw");
      throw new HttpError("Authentication failed", 401);
    }

    // Käyttäjän id dataan
    req.userData = { id: decodedToken.id };
    // Jatketaan seuraavaan mw
    next();
  } catch (err) {
    console.log(err);
    console.log("Täällä. Err");
    const error = new HttpError("Authentication failed", 401);
    return next(error);
  }
};
