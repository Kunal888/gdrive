import React, { useState, useEffect } from "react";
import Logo from "../../media/logo.png";
import { auth, provider } from "../../firebase";
import FileCard from "../Files/FileCard";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import { fade, makeStyles } from "@material-ui/core/styles";
import "./Header.css";

function Header({ user, setUser, files }) {
  const [searchText, setSearchText] = useState("");
  const [searchFiles, setSearchFiles] = useState([]);

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
    setSearchFiles(
      files.filter((file) => {
        return (
          searchText !== "" &&
          file.item.caption.toLowerCase().search(searchText.toLowerCase()) !==
            -1
        );
      })
    );
  }, [searchText]);

  const useStyles = makeStyles((theme) => ({
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.black, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.black, 0.05),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "auto",
      },
      border: "1px solid black",
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "20ch",
      },
    },
    button: {
      width: "100%",
      height: "70%",
    },
  }));

  const classes = useStyles();

  return (
    <div>
      <div className="header">
        <div className="header_logo">
          <img src={Logo} alt="logo"></img>
          <span>Files</span>
        </div>
        <div className="header_search">
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              value={searchText}
              inputProps={{ "aria-label": "search" }}
              onChange={(e) => setSearchText(e.target.value)}
              // onKeyUp={() => searchFile()}
            />
          </div>
        </div>
        <div className="header_icons">
          <img src={user.photoURL} alt="user-image"></img>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            size="small"
            onClick={handleLogin}
          >
            Sign out
          </Button>
        </div>
      </div>
      <div className="searchFile">
        {searchFiles.length > 0 ? (
          <>
            <p>{searchFiles.length} results found:</p>
            <div className="fileCards">
              {searchFiles.map(({ id, item }) => {
                return (
                  <FileCard
                    key={id}
                    id={id}
                    caption={item.caption}
                    timestamp={item.timestamp}
                    fileUrl={item.fileUrl}
                    size={item.size}
                  />
                );
              })}
            </div>
          </>
        ) : (
          <>
            {searchText !== "" ? (
              <p>No result found for "{searchText}"</p>
            ) : (
              <p></p>
            )}
          </>
        )}
        {/* <p>{searchText}</p> */}
      </div>
      <hr />
    </div>
  );
}

export default Header;
