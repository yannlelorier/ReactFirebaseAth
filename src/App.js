import "./styles.css";
import { useEffect } from "react";
import SignIn from "./paginas/Login";
import Loading from "./components/Loading";
import Index  from "./paginas/Index";
import utilsFunctions from "./funciones/FirebaseFunctions";
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


  return currentUser === "Cargando..." ? (
    <Loading />
  ) : (
    <div className="App">
      <h1>{currentUser} </h1>
      <Index
        socialLogin={socialLogin}
        currentUser={currentUser}
        getFirebase={props.getFirebase}
        history={props.history}
      />
    </div>
  );
}
