import React from "react";
import { AppBar, Box, Toolbar, Typography, Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";

const Header = ({ user, setUser }) => {
  // Kirjautumattoman menu
  const menuItems = [
    {
      linkName: "Etusivu",
      link: "/",
    },
    {
      linkName: "Käyttäjät",
      link: "/users",
    },
    {
      linkName: "Tarinat",
      link: "/stories",
    },
    {
      linkName: "Luo käyttäjä",
      link: "/signup",
    },
    {
      linkName: "Kirjaudu sisään",
      link: "/login",
    },
  ];

  // Kirjautuneen käyttäjän menu
  const loggedUserMenuItems = [
    {
      linkName: "Etusivu",
      link: "/",
    },
    {
      linkName: "Käyttäjät",
      link: "/users",
    },
    {
      linkName: "Tarinat",
      link: "/stories",
    },
    {
      linkName: "Uusi tarina",
      link: "/stories/new",
    },
    {
      linkName: "Kirjaudu ulos",
      link: "/",
    },
  ];

  // Tarkastetaan onko käyttäjä kirjautunut sisään ja muokataan valikkoa tarvittaessa.
  const menu = user ? loggedUserMenuItems : menuItems;

  // Jos painetaan logout kirjaudutaan ulos järjestelmästä.
  const handleClick = (event) => {
    // Jos painettu linkki on log out asetetaan user tilaksi null. Tälläin App.js oleva useEffect poistaa localStoragesta käyttäjän tiedot
    if (event.target.id === "Kirjaudu ulos") {
      setUser(null);
    }
  };

  // Otetaan käyttäjän nimi muuttujaan, tervehditään nimellä.
  const name = user ? user.user : "";

  return (
    <Box>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              textAlign: "center",
            }}
            component="nav"
          >
            {menu.length > 0 &&
              menu.map((menuItem) => (
                <Button
                  id={menuItem.linkName}
                  key={menuItem.linkName}
                  color="inherit"
                  component={Link}
                  to={menuItem.link}
                  onClick={handleClick}
                >
                  {menuItem.linkName}
                </Button>
              ))}
          </Box>
          {user ? (
            <Stack>
              <Typography variant="body2">Tervehdys</Typography>
              <Typography>{name}</Typography>
            </Stack>
          ) : (
            ""
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default Header;
