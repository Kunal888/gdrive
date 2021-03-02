import React from "react";
import "./Sidebar.css";
import AddNewFile from "./AddNewFile";
import SidebarItem from "./SidebarItem";

function Sidebar({ user }) {
  return (
    <div className="sidebar">
      <AddNewFile user={user} />
      {/* <hr /> */}
      {/* <SidebarItem label="All files" />
      <hr />
      <SidebarItem label="My files" />
      <hr />
      <SidebarItem label="Settings" />
      <hr /> */}
    </div>
  );
}

export default Sidebar;
