import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import File from "./File";
import FileCard from "./FileCard";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import CancelIcon from "@material-ui/icons/Cancel";
import DeleteIcon from "@material-ui/icons/Delete";
import "./FilesView.css";

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

function FilesView({ files }) {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [fileId, setFileId] = useState(null);
  const [modalStyle] = useState(getModalStyle);

  function handleClose() {
    setOpen(false);
  }

  function confirmDelete(id) {
    db.collection(`myFiles`)
      .doc(id)
      .delete()
      .then(() => {
        alert("Document successfully deleted!");
      })
      .catch((error) => {
        alert("Error removing document: ", error);
      });
    setOpen(false);
  }

  function deleteFile(id) {
    setFileId(id);
    setOpen(true);
  }

  return (
    <div className="filesview">
      {files.length === 0 ? (
        <>
          <p>Currently no data is stored</p>
        </>
      ) : (
        <>
          <p>Recent</p>
          <div className="fileCards">
            {files.slice(0, 5).map(({ id, item }) => {
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
          <p>All files</p>
          <div className="filesview_title">
            <div className="filesview_title_left">
              <p>Name</p>
            </div>
            <div className="filesview_title_right">
              <p>Last modified</p>
              <p>File size</p>
              <p></p>
              {/* <p>Uploaded by</p> */}
            </div>
          </div>
          <div className="filesview_row">
            {files.map(({ id, item }) => {
              return (
                <File
                  key={id}
                  id={id}
                  caption={item.caption}
                  timestamp={item.timestamp}
                  fileUrl={item.fileUrl}
                  size={item.size}
                  user={item.user}
                  deleteFile={deleteFile}
                />
              );
            })}
          </div>
        </>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <>
            <h3>Confirm delete the file?</h3>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              startIcon={<CancelIcon />}
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              startIcon={<DeleteIcon />}
              onClick={() => confirmDelete(fileId)}
            >
              Confirm Delete
            </Button>
          </>
        </div>
      </Modal>
    </div>
  );
}

export default FilesView;
