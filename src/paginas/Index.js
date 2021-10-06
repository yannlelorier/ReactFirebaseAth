import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Dashboard from "./Dashboard";
import Logout from "./Logout";
import SignUp from "./Signup";
import Login from "./Login";
import getFirebase from "../firebase/firebaseconfiguration";
import { GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";

export default function Navigate(props) {
  const firebase = getFirebase();

  const socialLoginGoogle = async (props) => {
    await firebase
      .auth()
      .signInWithPopup(GoogleAuthProvider)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {});
  };

  const socialLoginFacebook = async (props) => {
    await firebase
      .auth()
      .signInWithPopup(FacebookAuthProvider)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {});
  };

  const signOut = async () => {
    try {
      if (firebase) {
        await firebase.auth().signOut();
        alert("Successfully signed out!");
      }
    } catch (error) {
      console.log("error", error);
    }
    props.history.push("/");
  };

  const loginSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log(props);
    try {
      if (props) {
        console.log("iniciando");
        const user = await firebase
          .auth()
          .signInWithEmailAndPassword(data.get("email"), data.get("password"));
        //console.log("user", user);
        props.history.push("/");
      }
    } catch (error) {}
  };

  const signupSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    try {
      if (firebase) {
        const user = await firebase
          .auth()
          .createUserWithEmailAndPassword(
            data.get("email"),
            data.get("password")
          );
        console.log("user", user);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">LoginUser</Link>
          </li>
          <li>
            <Link to="/signup">Signup</Link>
          </li>
          <li>
            <Link to="/logout">logout</Link>
          </li>
        </ul>
        {props.currentUser ? (
          <Switch>
            <Route exact path={"/"} render={() => <Dashboard />}></Route>
            <Route
              path={"/logout"}
              render={() => (
                <Logout
                  signOut={() => signOut}
                  firebase={props.firebase}
                  signupSubmit={signupSubmit}
                  history={props.history}
                />
              )}
            ></Route>
          </Switch>
        ) : (
          <Switch>
            <Route
              exact
              path={"/"}
              render={() => (
                <Login
                  firebase={props.firebase}
                  signupSubmit={signupSubmit}
                  history={props.history}
                />
              )}
            ></Route>
            <Route
              path={"/signup"}
              render={() => (
                <SignUp
                  firebase={props.firebase}
                  signupSubmit={signupSubmit}
                  history={props.history}
                />
              )}
            ></Route>
          </Switch>
        )}
      </div>
    </Router>
  );
}
