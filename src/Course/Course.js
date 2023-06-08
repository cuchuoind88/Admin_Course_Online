import React from "react";
import "./Course.scss";
import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag, faEye, faPlus } from "@fortawesome/free-solid-svg-icons";
export default function Course() {
  const url = "http://localhost:2002/course/viewall";
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    axios
      .get(url, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setCourses(response.data.result);
      });
  }, []);
  return (
    <div className="course_wrapper">
      <div className="course_header">
        <div>
          <h4>Courses</h4>
          <p>
            Manage your courses and its update like live, draft and insight.
          </p>
        </div>
        <div className="Add_course">
          <FontAwesomeIcon icon={faPlus} />
          <button>
            <Link to="/create-course">Create Course</Link>
          </button>
        </div>
      </div>
      <div className="course_body">
        <table className="table_course">
          <thead>
            <tr>
              <th>COURSES</th>
              <th>STUDENTS</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {courses?.map((course) => {
              return (
                <tr key={course._id}>
                  <td>
                    <div className="course_info">
                      <div className="course_img">
                        <img src={course.thumbnail} />
                      </div>
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
                  </td>
                  <td>
                    <p className="student">{course.enrolledCount}</p>
                  </td>
                  <td>
                    <span
                      className={
                        course.status === "active"
                          ? "active_course"
                          : "disable_course"
                      }
                    >
                      {course.status === "active" ? "active" : "disable"}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
