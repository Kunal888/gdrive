import React from "react";
import InsertDriveFile from "@material-ui/icons/InsertDriveFile";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import DeleteIcon from "@material-ui/icons/Delete";
import "./File.css";

function formatFileSize(bytes) {
  if (bytes == 0) return "0 Bytes";
  var k = 1000,
    sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
    i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

function getDate(timestamp) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const date = `${timestamp?.toDate().getDate()} ${
    months[timestamp?.toDate().getMonth()]
  } ${timestamp?.toDate().getFullYear()}`;

  return date;
}

function File({ id, caption, timestamp, fileUrl, size, user, deleteFile }) {
  return (
    <div className="filesview_title">
      <a href={fileUrl} target="_blank" download>
        <div className="filesview_title_left">
          <InsertDriveFile fontSize="inherit" style={{ fontSize: "2rem" }} />
          <p>{caption}</p>
          <CloudDownloadIcon className="downloadIcon" />
        </div>
      </a>
      <div className="filesview_title_right">
        <p>{getDate(timestamp)}</p>
        <p>{formatFileSize(size)}</p>
        <DeleteIcon className="deleteIcon" onClick={() => deleteFile(id)} />
      </div>
    </div>
  );
}

export default File;
