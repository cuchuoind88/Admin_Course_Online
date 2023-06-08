import React from "react";
import Navbar from "../Navbar/Navbar";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import jwt_decode from "jwt-decode";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import "./Admin.scss";
import Sidebar from "../Sidebar/Sidebar";
import { Container, Row, Col } from "reactstrap";
import Course from "../Course/Course";
import axios from "axios";
export default function Admin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const LXCstate = useSelector((state) => state);
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
  const handleComponent = () => {
    if (LXCstate.active === "myUser") {
      return <div>USER</div>;
    } else if (LXCstate.active === "myCourse") {
      return <Course />;
    } else {
      return <div>Dashboard</div>;
    }
  };
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
    verifyLogin();
    grabUserDetails();
  }, []);
  return localStorage.token ? (
    <>
      <Navbar />
      <div className="Admin_Container">
        <Container>
          <Row>
            <Col lg="3">
              <div className="sidebar_left">
                <div className="setting-widget">
                  <div className="profile-bg">
                    <h5>Admin</h5>
                    <img src="https://dreamslms.dreamguystech.com/html/assets/img/instructor-profile-bg.jpg" />

                    <div className="profile-img">
                      <img src={LXCstate.userDetails.avatar} />
                    </div>
                  </div>
                  <div className="profile-group">
                    <div className="profile-name">
                      <h4>{LXCstate.auth.username}</h4>
                      <p>Instructor</p>
                    </div>
                    <div className="view_profile">View Profile</div>
                  </div>
                </div>
                <Sidebar />
              </div>
            </Col>
            <Col lg="9">{handleComponent()}</Col>
          </Row>
        </Container>
      </div>
    </>
  ) : (
    <Navigate to="/" />
  );
}
