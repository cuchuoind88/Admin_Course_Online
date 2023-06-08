import React from "react";
import "./Navbar.scss";
import { Container, Row, Col } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const verifyLogin = () => {
    if (localStorage.token) {
      const decode = jwt_decode(localStorage.getItem("token"));
      console.log(decode);
      dispatch({
        type: "LOG_IN",
        payload: decode,
      });
      //token hêt han sau 15 ngay , kiem tra xem token con han không nếu không sẽ log-out
      const currentTime = Date.now() / 1000;
      if (decode.exp < currentTime) {
        dispatch({
          type: "LOG_OUT",
        });
      }
    }
  };
  // verifyLogin();
  const grabUserDetails = () => {
    axios
      .get("http://localhost:2002/student/view-profile", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        dispatch({
          type: "POPULATE_USER_DETAILS",
          payload: response.data.result,
        });
        console.log(LXCstate);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    grabUserDetails();
    verifyLogin();
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("You are logged out");
    dispatch({
      type: "LOG_OUT",
    });
    navigate("/");
  };
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
                  <button className="btn_logout" onClick={handleLogout}>
                    Log out
                  </button>
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
