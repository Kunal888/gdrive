import React from "react";
import InsertDriveFile from "@material-ui/icons/InsertDriveFile";
import "./FileCard.css";

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

function FileCard({ id, caption, timestamp, fileUrl, size }) {
  return (
    <div className="fileCard">
      <a href={fileUrl} target="_blank" download>
        <div className="fileCard_top">
          <InsertDriveFile fontSize="inherit" style={{ fontSize: "6rem" }} />
          <p>{caption}</p>
        </div>
      </a>
      <div className="fileCard_bottom">
        <p>{getDate(timestamp)}</p>
        <p>{formatFileSize(size)}</p>
      </div>
    </div>
  );
}

export default FileCard;
