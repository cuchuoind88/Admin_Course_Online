import React from "react";
import "./Student.scss";
import { Row, Col } from "reactstrap";
import { useEffect, useState } from "react";
import axios from "axios";
export default function Student() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:2002/user/view", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setUsers(res.data.result);
      });
  }, []);
  return (
    <Row>
      <Col md="12">
        <div className="settings-widget">
          <div className="setting-inner">
            <div className="course-head-student">
              <h3>Student</h3>
              <p>List of Student in Your Course</p>
            </div>
          </div>
        </div>
      </Col>
      {users?.map((user) => {
        return (
          <Col md="6" lg="4">
            <div className="student-box">
              <div className="student-box-header">
                <div className="student-img">
                  <img src={user.avatar}></img>
                </div>
                <div className="student-content">
                  <h5>{user.username}</h5>
                </div>
              </div>
              <div className="student-enroll">
                <ul>
                  <li>
                    Role :<span className="User_role">{user.role}</span>
                  </li>
                  <li>
                    Status :
                    <span className={user.isVerified ? "verifyed_student" : ""}>
                      {user.isVerified ? "Verified" : "None"}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </Col>
        );
      })}
    </Row>
  );
}
