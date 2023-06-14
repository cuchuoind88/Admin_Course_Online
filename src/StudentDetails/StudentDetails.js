import React from "react";
import "./StudentDetails.scss";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag, faEye, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
export default function StudentDetails() {
  const { username } = useParams();
  console.log(username);
  const [user, setUser] = useState({});
  useEffect(() => {
    axios
      .get(`http://localhost:2002/user/view/${username}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setUser(response.data.result);
        console.log(response.data.result);
      });
  }, []);
  return (
    <div className="wrapper">
      <Navbar />
      <div className="student_banner">
        <Container>
          <Row>
            <Col md="12">
              <div className="profile_info">
                <a href="#">
                  <img src={user?.avatar} />
                </a>
                <h4>
                  <p>{user?.username}</p>
                  <span>{user?.role}</span>
                </h4>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="student_body">
        <Container>
          <Row>
            <Col lg="8">
              <div className="card_education">
                <div className="card_education_body">
                  <h5 className="sub-title">Courses</h5>
                  <Row>
                    {user.enrolledCourse?.map((course) => {
                      return (
                        <Col lg="6" md="6">
                          <div className="course_box">
                            <div className="product">
                              <div className="product-img">
                                <a>
                                  <img src={course.thumbnail} />
                                </a>
                              </div>
                              <div className="product-content">
                                <h3>{course.title}</h3>
                                <div className="course_detail">
                                  <p>{course.title}</p>
                                  <div className="course_attribute">
                                    <div className="course_price">
                                      <FontAwesomeIcon icon={faTag} />
                                      <p>{course.price} VND</p>
                                    </div>
                                    <div className="course_view">
                                      <FontAwesomeIcon icon={faEye} />
                                      <p>{course.views} Views</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Col>
                      );
                    })}
                  </Row>
                </div>
              </div>
            </Col>
            <Col lg="4">
              <div className="card_overview">
                <div className="card_body">
                  <h5 className="subs-title">Contact Details</h5>
                  <div className="contact_info">
                    <div className="edu-wrap">
                      <div className="edu-name">
                        <span>
                          <img
                            src="https://dreamslms.dreamguystech.com/html/assets/img/instructor/email-icon.png"
                            alt="Address"
                          />
                        </span>
                      </div>
                      <div className="edu-detail">
                        <h6>Email</h6>
                        <p>
                          <a>{user.email}</a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
