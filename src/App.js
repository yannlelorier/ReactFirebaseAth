import "./styles.css";
import { useEffect } from "react";
import Index from "./paginas/Index";
import FirebaseFunctions from "./funciones/FirebaseFunctions";
import Loading from "./components/Loading";

export default function App(props) {
  const { firebase, currentUser, getCurrentUser } = FirebaseFunctions(props);

  useEffect(() => {
    if (firebase) {
      firebase.auth().onAuthStateChanged((authUser) => {
        if (authUser) {
          getCurrentUser(authUser.email);
        } else {
          getCurrentUser(null);
        }
      });
    }
  }, []);

  return (
    <div className="App">
      {currentUser === "Cargando..." ? (
        <Loading />
      ) : (
        <Index
          currentUser={currentUser}
          getFirebase={props.getFirebase}
          history={props.history}
        />
      )}
    </div>
  );
}
