import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Home from "./pages/home/Home";
import Profile from "./components/profile/Profile";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { Authcontext } from "./context/Authcontext";
import Messenger from "./pages/messeger/Messenger";

function App() {
  const { user } = useContext(Authcontext);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {user ? <Home /> : <Register />}
        </Route>

        {/* <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route> */}
        <Route path="/login">{user ? <Home /> : <Login />}</Route>

        <Route path="/register">
          {user ? <Redirect to="/" /> : <Register />}
        </Route>
        <Route path="/messenger">
          {!user ? <Redirect to="/" /> : <Messenger />}
        </Route>

        <Route path="/profile/:username">
          <Profile />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
