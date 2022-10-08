require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const userRouter = require("./routes/users-routes");
const storyRouter = require("./routes/stories-routes");

// routermäärittelyt tänne
const app = express();

app.use(bodyParser.json());

// sallitaan CORS-pyynnöt ja autentikointi
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept,Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", " GET, POST, PATCH, DELETE");
  next();
});

// tänne reitityskutsut

// Käyttäjä kutsut
app.use(userRouter);

// Story kutsut
app.use(storyRouter);

// olemattomien osoitteiden käsittely tänne
app.use((req, res, next) => {});

// ketjun viimeinen virhekäsittelijä tänne
app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  res
    .status(error.code || 500)
    .send({ message: error.message || "Unknown error" });
});

// app.listen(5000, () => {
//   console.log("Kuuntelee porttia 5000");
// });

// MongoDB:n yhteyskuvaaja ja optioiden määrittelyt tänne
mongoose
  .connect(process.env.DB_URI, { useNewUrlParser: true })
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });
