import React from "react";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useEffect } from "react";
import Modal from "./Modal/Modal";
import { useRef } from "react";
import { Container } from "reactstrap";
import "./CreateCourse.scss";
import { Row, Col, Card } from "reactstrap";
import { useState } from "react";
import Basic from "./BasicInform/Basic";
import Chapter from "./Chapter/Chapter";
import { useSelector } from "react-redux";
import JoditEditor from "jodit-react";
import { useDispatch } from "react-redux";
export default function CreateCoure() {
  const dispatch = useDispatch();
  const LXCstate = useSelector((state) => state);
  const [activeIndex, setActiveIndex] = useState(0);
  const [courseId, setCourseId] = useState("");
  const [editorState, setEditorState] = useState("");
  const [lessonContent, setlessonContent] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [currentChapter, setCurrentChapter] = useState("");
  const [lesson, setLesson] = useState([]);
  const navigate = useNavigate();
  const [formLesson, setFormLesson] = useState({
    title: "",
    video: "",
  });
  const config = {
    readonly: false,
  };
  const editor = useRef();
  const [formValue, setFormValue] = useState({
    title: "",
    thumbnail: "",
    price: "",
    chapterNumber: "",
    chapterTitle: "",
    courseDetails: "",
  });
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
  const SaveLesson = async () => {
    const newLesson = await axios.post(
      "http://localhost:2002/lesson/create",
      {
        video: formLesson.video,
        title: formLesson.title,
        content: lessonContent.replace(/<[^>]+>/g, ""),
        course: courseId,
        chapter: currentChapter,
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    setOpenModal(false);
    console.log(newLesson);
    setLesson((preLesson) => [...preLesson, newLesson.data.lesson]);
    // console.log(courseId);
    // console.log(currentChapter);
    // console.log(lessonContent.replace(/<[^>]+>/g, ""));
  };

  const handleContinue = async () => {
    try {
      if (
        formValue.title &&
        formValue.thumbnail &&
        formValue.price &&
        editorState
      ) {
        //Create Course
        let response = await axios.post(
          "http://localhost:2002/course/create-course",
          {
            title: formValue.title,
            thumbnail: formValue.thumbnail,
            price: formValue.price,
            courseDetails: editorState.replace(/<[^>]+>/g, ""),
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        setCourseId(response.data.courseId);
        setActiveIndex((prevIndex) => prevIndex + 1); // Tăng chỉ số thẻ li active lên 1
        //Create Chapter
        // axios
        //   .post(
        //     "http://localhost:2002/chapter/create",
        //     {
        //       title: formValue.chapterTitle,
        //       chapterNumber: formValue.chapterNumber,
        //       course: courseId,
        //     },
        //     {
        //       headers: {
        //         Authorization: "Bearer " + localStorage.getItem("token"),
        //       },
        //     }
        //   )
        //   .then((response) => {
        //     console.log(response.data);
        //   });
      } else {
        alert("Please fill all field");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handlePrevious = () => {
    setActiveIndex((prevIndex) => prevIndex - 1); // Giảm chỉ số thẻ li active xuống 1
  };
  return localStorage.token ? (
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
                    {/* <li>
                      <div className="btn_save" onClick={handleSave}>
                        Save
                      </div>
                    </li> */}
                  </ul>
                </div>
              </div>
            </Col>
            <Col md="12">
              <Card>
                <div className="widget_set">
                  <div className="widget_setcount">
                    <ul className="progress_bar">
                      <li
                        className={0 === activeIndex ? "progress_active" : ""}
                      >
                        <p>
                          <span></span>
                          Basic information
                        </p>
                      </li>
                      <li
                        className={1 === activeIndex ? "progress_active" : ""}
                      >
                        <p>
                          <span></span>
                          Chapter
                        </p>
                      </li>
                    </ul>
                  </div>
                  <div className="widget_content">
                    {activeIndex === 0 ? (
                      <Basic
                        formValue={formValue}
                        setFormValue={setFormValue}
                        editorState={editorState}
                        setEditorState={setEditorState}
                      />
                    ) : (
                      <Chapter
                        formValue={formValue}
                        setFormValue={setFormValue}
                        courseId={courseId}
                        setOpenModal={setOpenModal}
                        setCurrentChapter={setCurrentChapter}
                        lesson={lesson}
                      />
                    )}
                  </div>
                  <div>
                    <div class="widget-btn">
                      {activeIndex === 0 ? (
                        <Link to="/dashboard" class="btn btn-black">
                          Back
                        </Link>
                      ) : (
                        <a class="btn btn-black" onClick={handlePrevious}>
                          Previous
                        </a>
                      )}
                      {activeIndex === 0 ? (
                        <a
                          class="btn btn-info-light next_btn"
                          onClick={handleContinue}
                        >
                          Continue
                        </a>
                      ) : (
                        <div></div>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      {/*Modal*/}

      {openModal && (
        <Modal
          setOpenModal={setOpenModal}
          formLesson={formLesson}
          setFormLesson={setFormLesson}
          lessonContent={lessonContent}
          setlessonContent={setlessonContent}
          courseId={courseId}
          currentChapter={currentChapter}
          setLesson={setLesson}
        />
      )}
    </div>
  ) : (
    <Navigate to="/" />
  );
}
