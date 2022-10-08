import React, { useRef, useState } from "react";
import { Container } from "@mui/system";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useHistory } from "react-router-dom";
import userService from "../../services/users";

const LogIn = ({ setUser }) => {
  const navigate = useHistory();
  // Lomakkeen kentät
  const inputs = useRef({});
  // Virheilmoitukset
  const [logInErrors, setLogInErrors] = useState({});

  // Lomakkeen kenttien käsittely
  const inputHandler = (e) => {
    inputs.current[e.target.name] = e.target.value;
  };

  // Lomakkeen käsittely
  const formHandler = (e) => {
    e.preventDefault();

    // Lomakevirheet
    let errors = {};

    // Tarkistetaan ettei kentät ole tyhjiä
    if (!inputs.current.email) {
      errors = { ...errors, email: "Syötä sähköposti" };
    }

    if (!inputs.current.password) {
      errors = { ...errors, password: "Syötä salasana" };
    }

    // Jos kenttiä on tyhjänä, annetaan asianmukainen virhe.
    if (Object.entries(errors).length > 0) {
      setLogInErrors({ ...errors });
    } else {
      // Jos ei virheitä, kirjaudutaan sisään.
      setLogInErrors({});
      userService
        .login(inputs.current)
        .then((res) => {
          // Lisätään käyttäjän token ja nimi App.js tilamuuttujaan user
          setUser(res);
          navigate.push("/");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <Container>
      <Typography variant="h3" component="h1" align="center">
        Kirjaudu sisään
      </Typography>
      <Box sx={{ mt: 2 }} component="form" onSubmit={formHandler}>
        <Stack spacing={2}>
          <Typography>Kirjaudu sisään.</Typography>
          <TextField
            label="Email"
            name="email"
            fullWidth
            type="email"
            onChange={inputHandler}
            error={Boolean(logInErrors.email)}
            helperText={logInErrors.email}
          />
          <TextField
            label="Salasana"
            name="password"
            fullWidth
            type="password"
            inputProps={{
              autoComplete: "new-password",
            }}
            onChange={inputHandler}
            error={Boolean(logInErrors.password)}
            helperText={logInErrors.password}
          />
          <Button variant="contained" fullWidth type="submit">
            Kirjaudu sisään
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};
export default LogIn;
