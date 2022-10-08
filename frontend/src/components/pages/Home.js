import React from "react";
import { Container } from "@mui/system";
import { Typography, Box, Paper } from "@mui/material";
import bicycle from "../../images/bicycle.jpg";

const Home = ({ users }) => {
  // Arvotaan kaksi satunnaista tarinaa
  const stories = users
    .flatMap((el) => el.stories)
    .sort(() => 0.5 - Math.random())
    .slice(0, 2);

  return (
    <Container>
      <Typography variant="h3" component="h1" align="center">
        Pyöräretkemme
      </Typography>
      <Typography variant="subtitle2" align="center">
        Tervetuloa tutustumaan seuramme jäsenten pyöräretkitarinoihin!
      </Typography>
      <Box sx={{ mt: 4 }} display="flex" justifyContent="center">
        <img
          src={bicycle}
          alt="Pyörä nojaa seinään"
          style={{
            width: "300px",
            height: "300px",
            borderRadius: "100%",
            objectFit: "cover",
          }}
        />
      </Box>
      <Box sx={{ mt: 6 }}>
        <Typography variant="h4" component="h2" textAlign="center">
          Poimintoja tarinoista
        </Typography>
        <Box sx={{ mt: 4 }} display="flex" justifyContent="space-around">
          {stories.length > 0 &&
            stories.map((el) => (
              <Paper
                key={el._id}
                variant="outlined"
                sx={{ width: "35%", padding: "2rem" }}
              >
                <Typography variant="h4" component="h3">
                  {el.place}
                </Typography>
                <Typography>{el.date}</Typography>
                <Typography sx={{ mt: 3 }}>{el.content}</Typography>
              </Paper>
            ))}
        </Box>
      </Box>
    </Container>
  );
};
export default Home;
