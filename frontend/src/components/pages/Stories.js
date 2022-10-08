import React, { useEffect, useState } from "react";
import {
  Typography,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Modal,
} from "@mui/material";
import { Container } from "@mui/system";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useHistory, useParams } from "react-router-dom";
import storyService from "../../services/stories";

const Stories = ({ users, user }) => {
  const navigate = useHistory();
  const { id } = useParams();
  // Select kentästä valittu käyttäjä, jos tullaan user sivulta eli mukana id parametri, näytetään sen mukaiset tarinat. Jos tullaan valikon kautta oletuksena näytetään kirjautunut käyttäjä. Muuten voi valita haluamansa käyttäjän tarinat.
  const [userId, setUserId] = useState(id ? id : user ? user.user_id : "");

  // Select kentän käsittely
  const handleChange = (event) => {
    setUserId(event.target.value);
  };

  // Haetun käyttäjän tarinat
  const [userStories, setUserStories] = useState([]);

  // Dialogin avaus muuttuja
  const [openModal, setOpenModal] = useState(false);

  // Dialogin sisältö
  const [modalContent, setModalContent] = useState(null);

  // Hae käyttäjän tarinat
  const getUserStories = (userId) => {
    if (userId) {
      storyService.getStories(userId).then((res) => {
        setUserStories(res.stories);
      });
    }
  };

  // Kun valikosta vaihdetaan käyttäjää, suoritetaan uusi haku
  useEffect(() => {
    getUserStories(userId);
  }, [userId]);

  // Tarinan poisto
  const handleRemove = (id) => {
    if (id) {
      const config = {
        headers: {
          Authorization: `bearer ${user.token}`,
        },
        data: {
          userId: user.user_id,
        },
      };

      storyService
        .deleteStory(id, config)
        .then((res) => {
          // Kun poistettu, päivitetään lista
          getUserStories(userId);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    }
  };

  // Tarinan muokkaus
  const handleEdit = (id) => {
    if (id) {
      navigate.push(`/stories/edit/${id}`);
    }
  };

  // Dialogin avaus
  const handleOpenDialog = (story) => {
    if (story) {
      const modal = userStories.find((el) => el._id === story);
      setModalContent(modal);
      setOpenModal(true);
    }
  };

  // Dialogin tyylit
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Container>
      <Typography variant="h4" component="h1">
        Tutustu käyttäjien tarinoihin
      </Typography>
      <Typography>Valitse käyttäjä jonka tarinoihin haluat tutustua</Typography>
      <Box sx={{ mt: 2 }}>
        <FormControl fullWidth>
          <InputLabel id="users-select">Valitse käyttäjä</InputLabel>
          <Select
            labelId="users-select"
            id="users-select-field"
            value={userId}
            label="Käyttäjä"
            onChange={handleChange}
          >
            {users.length > 0 &&
              users.map((el) => (
                <MenuItem key={el._id} value={el._id}>
                  {el.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ mt: 2 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>PVM</TableCell>
                <TableCell align="right">Kohde</TableCell>
                <TableCell align="right">Tarina</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userStories.length > 0 ? (
                userStories.map((story) => (
                  <TableRow key={story._id}>
                    <TableCell>{story.date}</TableCell>
                    <TableCell
                      align="right"
                      onClick={() => handleOpenDialog(story._id)}
                      sx={{ cursor: "pointer" }}
                    >
                      {story.place}
                    </TableCell>
                    <TableCell align="right">{story.content}</TableCell>
                    {
                      // Näytetään poista/muokkaa painikkeet vain kirjautuneen listauksessa
                      user && userId === user.user_id ? (
                        <>
                          <TableCell align="right">
                            <IconButton
                              edge="end"
                              aria-label="edit"
                              onClick={() => handleEdit(story._id)}
                            >
                              <EditIcon />
                            </IconButton>
                          </TableCell>
                          <TableCell align="right">
                            <IconButton
                              edge="end"
                              aria-label="delete"
                              onClick={() => handleRemove(story._id)}
                            >
                              <DeleteIcon color="error" />
                            </IconButton>
                          </TableCell>
                        </>
                      ) : null
                    }
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell align="center" colSpan={3}>
                    Käyttäjällä ei ole vielä tarinoita!
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      {/* Modal */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box sx={style}>
          <Typography variant="h3" component="h2">
            {modalContent ? modalContent.place : ""}
          </Typography>
          <Typography>{modalContent ? modalContent.date : ""}</Typography>
          <Typography sx={{ mt: 3 }}>
            {modalContent ? modalContent.content : ""}
          </Typography>
        </Box>
      </Modal>
      {/* Modal end */}
    </Container>
  );
};
export default Stories;
