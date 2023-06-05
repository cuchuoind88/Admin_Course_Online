import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Sidebar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faGraduationCap,
  faUsers,
  faPowerOff,
} from "@fortawesome/free-solid-svg-icons";
export default function Sidebar() {
  const dispatch = useDispatch();
  const LXCstate = useSelector((state) => state);
  console.log(LXCstate);
  const handleClick = (item) => {
    dispatch({
      type: "SET_ACTIVE",
      payload: item,
    });
  };
  return (
    <div className="setting-menu">
      <h4>DASHBOARD</h4>
      <ul>
        <li
          className={`nav-item ${
            LXCstate.active === "myDashboard" ? "active" : ""
          }`}
          onClick={() => handleClick("myDashboard")}
        >
          <FontAwesomeIcon icon={faHouse} />
          <span>My Dashboard</span>
        </li>
        <li
          className={`nav-item ${
            LXCstate.active === "myCourse" ? "active" : ""
          }`}
          onClick={() => handleClick("myCourse")}
        >
          <FontAwesomeIcon icon={faGraduationCap} />
          <span>My Course</span>
        </li>
        <li
          className={`nav-item ${LXCstate.active === "myUser" ? "active" : ""}`}
          onClick={() => handleClick("myUser")}
        >
          <FontAwesomeIcon icon={faUsers} />
          <span>User</span>
        </li>
        <li className="nav-item">
          <FontAwesomeIcon icon={faPowerOff} />
          <span>Sign Out</span>
        </li>
      </ul>
    </div>
  );
}
