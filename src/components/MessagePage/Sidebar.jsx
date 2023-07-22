import React from "react";
import SidebarProfile from "./SidebarProfile";
import Search from "./Search";

const Sidebar = () => {
  return (
    <>
      <div style={{ overflow: "scroll", height: "calc(100vh - 120px)" }}>
        <Search />
        <SidebarProfile />
        <SidebarProfile />
        <SidebarProfile />
        <SidebarProfile />
        <SidebarProfile />
        <SidebarProfile />
        <SidebarProfile />
        <SidebarProfile />
        <SidebarProfile />
        <SidebarProfile />
        <SidebarProfile />
        <SidebarProfile />
        <SidebarProfile />
      </div>
    </>
  );
};

export default Sidebar;
