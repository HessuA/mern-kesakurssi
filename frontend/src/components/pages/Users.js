import React from "react";
import { Container } from "@mui/system";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useHistory } from "react-router-dom";

const Users = ({ users }) => {
  const navigate = useHistory();

  // Haetaan vuosi iän laskemista varten.
  const year = new Date().getFullYear();

  // Navigoi käyttäjän tarinoihin stories sivulle
  const goUserStories = (id) => {
    if (id) {
      navigate.push(`${id}/stories/`);
    }
  };

  return (
    <Container>
      <Typography variant="h3" component="h1">
        Kaikki käyttäjät
      </Typography>
      <Box sx={{ mt: 2 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nimi</TableCell>
                <TableCell align="right">Paikkakunta</TableCell>
                <TableCell align="right">Ikä</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.length > 0 ? (
                users.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell
                      onClick={() => goUserStories(user._id)}
                      sx={{ cursor: "pointer" }}
                    >
                      {user.name}
                    </TableCell>
                    <TableCell align="right">{user.city}</TableCell>
                    <TableCell align="right">{year - user.birthyear}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell align="center" colSpan={3}>
                    Käyttäjiä ei ole vielä lisätty
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default Users;
