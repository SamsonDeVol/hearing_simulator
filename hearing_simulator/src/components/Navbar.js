/** @jsxImportSource @emotion/react */

import { NavLink, Outlet } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import Dropdown from "./Dropdown";
import logo from "../img/logo.png";
import "./Navbar.css";

const activeStyle = { backgroundColor: "rgb(253, 210, 110)" };

function Navbar() {
  const [isDropdownClicked, setisDropdownClicked] = useState(false);

  function toggleDropdown() {
    setisDropdownClicked(!isDropdownClicked);
  }

  function turnoffDropdown() {
    setisDropdownClicked(false);
  }

  return (
    <>
      <nav className={"navbar"}>
        <div className={"home"}>
          <div className={"logo"}>
            <NavLink className={"logolink"} to={"/hearing_simulator"}>
              <img src={logo}></img>
            </NavLink>
          </div>
          <div className={"homelink"}>
            <NavLink
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
              className={"link"}
              onClick={turnoffDropdown}
              to="/hearing_simulator"
            >
              Audiomatic
            </NavLink>
          </div>
        </div>
        <div className={"sidelinks"}>
          <NavLink
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
            className={"link"}
            onClick={turnoffDropdown}
            to="/use"
          >
            Use
          </NavLink>
          <NavLink className={"link"} onClick={toggleDropdown}>
            About &nbsp;
            {isDropdownClicked ? (
              <FontAwesomeIcon icon={faCaretDown} />
            ) : (
              <FontAwesomeIcon icon={faCaretRight} />
            )}
          </NavLink>
        </div>
      </nav>
      {isDropdownClicked && <Dropdown />}
      <Outlet />
    </>
  );
}

export default Navbar;
