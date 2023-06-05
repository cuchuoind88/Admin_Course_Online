import React from "react";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import { Link } from "react-router-dom";
import { Container } from "reactstrap";
import "./CreateCourse.scss";
import { Row, Col, Card } from "reactstrap";
import Basic from "./BasicInform/Basic";
export default function CreateCoure() {
  return (
    <div className="Wrapper">
      <Navbar />
      <div className="Wrapper_body">
        <Container>
          <Row>
            <Col md="12">
              <div class="add-course-header">
                <h2>Add New Course</h2>
                <div class="add-course-btns">
                  <ul class="nav">
                    <li>
                      <Link to="/dashboard" class="btn_back">
                        Back to Course
                      </Link>
                    </li>
                    <li>
                      <div className="btn_save">Save</div>
                    </li>
                  </ul>
                </div>
              </div>
            </Col>
            <Col md="12">
              <Card>
                <div className="widget_set">
                  <div className="widget_setcount">
                    <ul className="progress_bar">
                      <li className="progress_active">
                        <p>
                          <span></span>
                          Basic information
                        </p>
                      </li>
                      <li>
                        <p>
                          <span></span>
                          Curriculum
                        </p>
                      </li>
                    </ul>
                  </div>
                  <div className="widget_content">
                    <Basic />
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
