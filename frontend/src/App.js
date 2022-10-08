import React, { useEffect, useState } from "react";
import Footer from "./components/partials/Footer";
import Header from "./components/partials/Header";
import Home from "./components/pages/Home";
import Users from "./components/pages/Users";
import Stories from "./components/pages/Stories";
import LogIn from "./components/pages/LogIn";
import SignUp from "./components/pages/SignUp";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { Box } from "@mui/material";
import EditOrNewStory from "./components/pages/EditOrNewStory";
import userService from "./services/users";

const App = () => {
  // Tallennetaan käyttäjä tilamuuttujaan
  const [user, setUser] = useState(null);

  // Kaikki käyttäjät tilamuuttujassa.
  const [users, setUsers] = useState([]);

  // Muuttuja jonka avulla päivitetään users listaa jos se muuttuu
  const [newUser, setNewUser] = useState(false);

  // Haetaan kaikki käyttäjät tilamuuttujaan users.
  useEffect(() => {
    userService
      .getAll()
      .then((initUsers) => {
        setUsers(initUsers);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [newUser]);

  // Tarkistetaan onko käyttäjää localStoragessa
  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedUser");
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      setUser(user);
    }
  }, []);

  // Kun user tilamuuttujan tila muuttuu lisätään käyttäjä tarvittaessa localStorageen
  useEffect(() => {
    if (!user) {
      // console.log("Täällä poistamassa keytä");
      window.localStorage.removeItem("loggedUser");
      return;
    }
    // Lisätään käyttäjä localStorageen
    window.localStorage.setItem("loggedUser", JSON.stringify(user));
  }, [user]);

  return (
    <>
      <Router>
        <Header user={user} setUser={setUser} />
        <Box sx={{ maxWidth: "650px", margin: "auto" }}>
          <Switch>
            <Route exact path="/">
              <Home users={users} />
            </Route>
            <Route path="/users">
              <Users users={users} />
            </Route>
            <Route exact path="/stories/">
              <Stories users={users} user={user} />
            </Route>
            <Route path="/:id/stories/">
              <Stories users={users} user={user} />
            </Route>
            <Route path="/stories/new/">
              <EditOrNewStory
                user={user}
                newUser={newUser}
                setNewUser={setNewUser}
              />
            </Route>
            <Route path="/stories/edit/:id">
              <EditOrNewStory
                user={user}
                users={users}
                newUser={newUser}
                setNewUser={setNewUser}
              />
            </Route>
            <Route path="/signup">
              <SignUp newUser={newUser} setNewUser={setNewUser} />
            </Route>
            <Route path="/login">
              <LogIn setUser={setUser} />
            </Route>
            <Redirect to="/" />
          </Switch>
        </Box>
        <Footer />
      </Router>
    </>
  );
};

export default App;
