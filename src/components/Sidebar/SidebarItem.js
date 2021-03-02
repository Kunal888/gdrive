import React from "react";
import "./SidebarItem.css";

function SidebarItem({ label }) {
  return (
    <div className="sidebar_item">
      <p>{label}</p>
    </div>
  );
}

export default SidebarItem;
