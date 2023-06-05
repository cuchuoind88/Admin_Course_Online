import React from "react";
import Navbar from "../Navbar/Navbar";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import "./Admin.scss";
import Sidebar from "../Sidebar/Sidebar";
import { Container, Row, Col } from "reactstrap";
import Course from "../Course/Course";
export default function Admin() {
  const dispatch = useDispatch();
  const LXCstate = useSelector((state) => state);
  const handleComponent = () => {
    if (LXCstate.active === "myUser") {
      return <div>USER</div>;
    } else if (LXCstate.active === "myCourse") {
      return <Course />;
    } else {
      return <div>Dashboard</div>;
    }
  };
  return (
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
  );
}
