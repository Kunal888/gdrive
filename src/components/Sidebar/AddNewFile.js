import React, { useState } from "react";
import "./AddNewFile.css";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import InputBase from "@material-ui/core/InputBase";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

import firebase from "firebase";
import { storage, db } from "../../firebase";

function getModalStyle() {
  return {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  button: {
    margin: "1rem",
  },
  input: {
    margin: "1rem",
  },
}));

function AddNewFile({ user }) {
  const classes = useStyles();

  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
    setUploading(false);
    setFile(null);
  }

  function handleChange(e) {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  }

  function handleUpload() {
    setUploading(true);
    storage
      .ref(`files/${file.name}`)
      .put(file)
      .then((snapshot) => {
        storage
          .ref(`files`)
          .child(file.name)
          .getDownloadURL()
          .then((url) => {
            db.collection(`myFiles`).add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: file.name,
              fileUrl: url,
              size: snapshot._delegate.bytesTransferred,
              user: user,
            });
          })
          .then(() => {
            alert("Document added succesfully!");
          })
          .catch((err) => {
            alert("There was a problem in uplading the document!");
          });
        setUploading(false);
        setOpen(false);
        setFile(null);
      });
  }

  return (
    <div>
      <div className="sidebar_newfile" onClick={handleOpen}>
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          startIcon={<AddIcon />}
        >
          Add File
        </Button>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <>
            {uploading && <p>uploading...</p>}
            {!uploading && (
              <>
                <h3>Select the files that you want to upload...</h3>
                {!file ? (
                  <InputBase
                    variant="contained"
                    color="primary"
                    placeholder="Search…"
                    className={classes.input}
                    type="file"
                    onChange={handleChange}
                  />
                ) : (
                  <>
                    <Button
                      variant="contained"
                      color="default"
                      className={classes.button}
                      startIcon={<CloudUploadIcon />}
                      onClick={handleUpload}
                    >
                      Upload
                    </Button>
                    <span>{file.name}</span>
                  </>
                )}
              </>
            )}
          </>
        </div>
      </Modal>
    </div>
  );
}

export default AddNewFile;
