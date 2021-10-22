import "./styles.css";
import * as React from 'react';
import { useEffect } from "react";
import utilsFunctions from "./funciones/FirebaseFunctions";
import Index  from "./paginas/Index";
import Logout from './paginas/Logout';
import Loading from "./components/Loading";
import Dashboard from "./paginas/Dashboard";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const socialLogin = async (props) => {
  await firebase
    .auth()
    .signInWithPopup(props)
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      setError(error.message);
    });
};


export default function App(props) {
  //console.log("props-> App");
  //console.log(props);

  const { firebase, currentUser, getCurrentUser } = utilsFunctions(props);

  useEffect((e) => {
    if (firebase) {
      firebase.auth().onAuthStateChanged((authUser) => {
        if (authUser) {
          getCurrentUser(authUser.email);
          //console.log("sesión, Activa");
        } else {
          getCurrentUser(null);
          //console.log("No hay sesión");
          //props.history.push("/login")
        }
      });
    }
  }, []);

  return currentUser === "Cargando..." ? (
    <Loading />
  ) : (
    <div className="App">
      <Index 
      socialLogin={socialLogin}
      currentUser={currentUser}
      getFirebase={props.getFirebase}
      history={props.history}
    />
    </div>
  );
}
