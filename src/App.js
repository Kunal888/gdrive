import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import Header from "./components/Header/Header";
import Img from "./media/account.png";
import Sidebar from "./components/Sidebar/Sidebar";
import FilesView from "./components/Files/FilesView";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { auth, provider } from "./firebase";
import "./App.css";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: "0.2rem",
    padding: "0rem",
    color: "red",
  },
}));

function App() {
  const [user, setUser] = useState();
  const [files, setFiles] = useState([]);

  function handleLogin() {
    if (!user) {
      auth
        .signInWithPopup(provider)
        .then((res) => setUser(res.user))
        .catch((err) => alert(err.message));
    } else if (user) {
      auth
        .signOut()
        .then(() => {
          setUser(null);
        })
        .catch((err) => alert(err.message));
    }
  }

  useEffect(() => {
    db.collection(`myFiles`)
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setFiles(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            item: doc.data(),
          }))
        );
      });
  }, []);

  const classes = useStyles();

  return (
    <div className="App">
      {user ? (
        <>
          <Header user={user} setUser={setUser} files={files} />
          <div className="App_content">
            <Sidebar user={user.email} />
            <FilesView files={files} />
          </div>
        </>
      ) : (
        <>
          <div className="App_login">
            <img src={Img} alt="Login"></img>
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              onClick={handleLogin}
            >
              Log in using Google Account
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
