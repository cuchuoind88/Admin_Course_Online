import React from "react";
import "./Navbar.scss";
import { Container, Row, Col } from "reactstrap";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
export default function Navbar() {
  const dispatch = useDispatch();
  const LXCstate = useSelector((state) => state);
  return (
    <>
      <nav className="navbar_admin">
        <Container>
          <div className="navbar_content">
            <div className="navbar_logo">
              <img src="https://dreamslms.dreamguystech.com/html/assets/img/logo.svg"></img>
            </div>
            <div className="navbar_navigate">
              <ul className="navbar_header">
                <li className="navbar_item">
                  <img src="https://dreamslms.dreamguystech.com/html/assets/img/icon/messages.svg" />
                </li>
                <li className="navbar_item">
                  <img src="https://dreamslms.dreamguystech.com/html/assets/img/icon/cart.svg" />
                </li>
                <li className="navbar_item">
                  <img src="https://dreamslms.dreamguystech.com/html/assets/img/icon/notification.svg" />
                </li>
                <li className="navbar_item">
                  <button className="btn_logout">Log out</button>
                </li>
                <li className="navbar_item">
                  <span className="user_avatar">
                    <img src={LXCstate.userDetails.avatar} />
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </nav>
    </>
  );
}
