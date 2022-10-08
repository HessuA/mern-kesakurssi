import React, { useRef, useState } from "react";
import { Container } from "@mui/system";
import {
  Typography,
  TextField,
  Box,
  Stack,
  Button,
  Alert,
  AlertTitle,
  Collapse,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useHistory } from "react-router-dom";
import userService from "../../services/users";

const SignUp = ({ newUser, setNewUser }) => {
  // Routterin navigate
  const navigate = useHistory();
  // Lomakkeen kentät
  const inputs = useRef({});
  // Lomakkeen virheet
  const [formErrors, setFormErrors] = useState({});
  // Alert-boxin tila
  const [alert, setAlert] = useState(false);
  // Palvelimen virheet
  const [serverError, setServerError] = useState();

  // Lomakkeen kenttien käsittely
  const inputHandler = (e) => {
    inputs.current[e.target.name] = e.target.value;
  };

  // Lomakkeen käsittely
  const formHandler = (e) => {
    e.preventDefault();

    let errors = {};

    // Seuraavissa tarkastetaan että lomakkeen kentät on täytetty.
    if (!inputs.current.name) {
      errors = { ...errors, name: "Nimi on pakollinen tieto" };
    }

    if (!inputs.current.city) {
      errors = { ...errors, city: "Paikkakunta on pakollinen tieto" };
    }

    if (!inputs.current.birthyear) {
      errors = { ...errors, birthyear: "Syntymävuosi on pakollinen tieto" };
    }

    if (!inputs.current.email) {
      errors = { ...errors, email: "Sähköposti on pakollinen tieto" };
    }

    if (!inputs.current.password) {
      errors = { ...errors, password: "Salasana on pakollinen tieto" };
    }

    // Jos virheitä, ilmoitetaan käyttäjälle virheviestillä.
    if (Object.entries(errors).length > 0) {
      setFormErrors({ ...errors });
    } else {
      setFormErrors({});

      userService
        .createNew(inputs.current)
        .then((res) => {
          // Päivitetään users listaus
          setNewUser(!newUser);
          navigate.push("/login");
        })
        .catch((error) => {
          // Näytetään virheviesti
          setServerError(error.response.data.message);
          setAlert(true);
        });
    }
  };

  return (
    <Container>
      <Typography align="center" variant="h3" component="h1">
        Luo käyttäjä
      </Typography>
      <Box component="div" sx={{ mt: 4 }}>
        <Typography>Rekisteröidy järjestelmään.</Typography>
        <Box component="form" sx={{ mt: 2 }} onSubmit={formHandler}>
          <Stack spacing={2}>
            <TextField
              label="Nimi"
              fullWidth
              name="name"
              onChange={inputHandler}
              error={Boolean(formErrors.name)}
              helperText={formErrors.name}
            />
            <TextField
              label="Paikkakunta"
              fullWidth
              name="city"
              onChange={inputHandler}
              error={Boolean(formErrors.city)}
              helperText={formErrors.city}
            />
            <TextField
              label="Syntymävuosi"
              fullWidth
              name="birthyear"
              type="number"
              InputProps={{
                inputProps: { min: 0, max: new Date().getFullYear() },
              }}
              onChange={inputHandler}
              error={Boolean(formErrors.birthyear)}
              helperText={formErrors.birthyear}
            />
            <TextField
              label="Email"
              fullWidth
              name="email"
              type="email"
              onChange={inputHandler}
              error={Boolean(formErrors.email)}
              helperText={formErrors.email}
            />
            <TextField
              label="Salasana"
              fullWidth
              name="password"
              type="password"
              inputProps={{
                autoComplete: "new-password",
              }}
              onChange={inputHandler}
              error={Boolean(formErrors.password)}
              helperText={formErrors.password}
            />
            <Button type="submit" variant="contained" fullWidth>
              Tallenna
            </Button>
          </Stack>
        </Box>
      </Box>
      <Collapse in={alert}>
        <Alert
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => setAlert(false)}
            >
              <CloseIcon />
            </IconButton>
          }
        >
          <AlertTitle>Error!</AlertTitle>
          {serverError}
        </Alert>
      </Collapse>
    </Container>
  );
};
export default SignUp;
