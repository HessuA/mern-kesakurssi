import React, { useRef, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Container } from "@mui/system";
import { Typography, TextField, Box, Stack, Button } from "@mui/material";

import storyService from "../../services/stories";

const EditOrNewStory = ({ user, users, newUser, setNewUser }) => {
  const { id } = useParams();
  const navigate = useHistory();

  // Jos ei ole kirjautunut ohjaa etusivulle
  if (!user) {
    navigate.push("/");
  }

  /************************************/

  // Muokkausnäkymässä muuttuja story datalle, jos id tulee parametrina voidaan olettaa että ollaan muokkausnäkymässä joten filtteröidään id:n mukainen tarina muuttujaan.
  const edit = id
    ? users
        .map((user) => user.stories.find((story) => story._id === id))
        .filter((story) => story !== undefined)[0]
    : null;

  // Lomakkeen kentät, jos muokkausnäkymä, tuodaan kentät alkuperäisestä
  const inputs = useRef(
    id
      ? {
          date: edit.date,
          place: edit.place,
          content: edit.content,
        }
      : {}
  );

  // Lomakevirheet
  const [formErrors, setFormErrors] = useState({});

  // Inputtien käsittely
  const inputHandler = (e) => {
    inputs.current[e.target.name] = e.target.value;
  };

  // Lomakkeen käsittely
  const formHandler = (e) => {
    e.preventDefault();

    let errors = {};

    if (!inputs.current.date) {
      errors = {
        ...errors,
        date: "Päivämäärän syöttäminen on pakollinen tieto.",
      };
    }

    if (!inputs.current.place) {
      errors = {
        ...errors,
        place: "Paikan ilmoittaminen on pakollinen tieto.",
      };
    }

    if (!inputs.current.content) {
      errors = {
        ...errors,
        content: "Tarina on pakollinen tieto.",
      };
    }

    if (Object.entries(errors).length > 0) {
      setFormErrors(errors);
    } else {
      setFormErrors({});
      // Lisätään käyttäjän id inputs.currenttiin
      inputs.current["userId"] = user.user_id;

      const config = {
        headers: {
          Authorization: `bearer ${user.token}`,
        },
      };

      // Päivityspyyntö
      if (id) {
        storyService
          .editStory(id, inputs.current, config)
          .then((res) => {
            setNewUser(!newUser);
            navigate.push("/stories");
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        // Uusi tarina

        storyService
          .newStory(inputs.current, config)
          .then((res) => {
            setNewUser(!newUser);
            navigate.push("/stories");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };

  return (
    <Container>
      <Typography variant="h3" component="h1">
        {id ? "Muokkaa tarinaa" : "Lisää uusi tarina"}
      </Typography>
      <Box sx={{ mt: 2 }} component="form" onSubmit={formHandler}>
        <Stack spacing={2}>
          <TextField
            name="date"
            label="Päivämäärä"
            onChange={inputHandler}
            defaultValue={edit ? edit.date : ""}
            error={Boolean(formErrors.date)}
            helperText={formErrors.date}
          />
          <TextField
            name="place"
            label="Kohde"
            onChange={inputHandler}
            defaultValue={edit ? edit.place : ""}
            error={Boolean(formErrors.place)}
            helperText={formErrors.place}
          />
          <TextField
            name="content"
            label="Kirjoita tarinasi"
            multiline
            minRows={6}
            onChange={inputHandler}
            defaultValue={edit ? edit.content : ""}
            error={Boolean(formErrors.content)}
            helperText={formErrors.content}
          />
          <Button type="submit" variant="contained" fullWidth>
            {id ? "Tallenna tarina" : "Lisää tarina"}
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};
export default EditOrNewStory;
