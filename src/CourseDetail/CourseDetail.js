import React from "react";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import jwt_decode from "jwt-decode";
import { Row, Col } from "reactstrap";
import Modal from "../CreateCourse/Modal/Modal";
import { Card } from "reactstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Loading from "../LoadingScreen/Loading";
import { useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import "./CourseDetails.scss";
import { Container } from "reactstrap";
import JoditEditor from "jodit-react";
import ChapterCourse from "./ChapterCourse/ChapterCourse";
import { useParams } from "react-router-dom";
export default function CourseDetail() {
  const { courseId } = useParams();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const LXCstate = useSelector((state) => state);
  const [lessonContent, setlessonContent] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [currentChapter, setCurrentChapter] = useState("");
  const [lesson, setLesson] = useState([]);
  const [chapter, setChapter] = useState([]);
  const [formLesson, setFormLesson] = useState({
    title: "",
    video: "",
  });
  const [course, setCourse] = useState({});
  const [isEditing, setEditing] = useState(true);
  const [formValue, setFormValue] = useState({
    title: "",
    thumbnail: "",
    price: "",
    chapterNumber: "",
    chapterTitle: "",
  });
  const config = {
    readonly: isEditing,
  };
  const [editorState, setEditorState] = useState("");
  console.log(course);
  const handleOpen = () => {
    //Create Chapter
    setLoading(true);
    axios
      .post(
        "http://localhost:2002/chapter/create",
        {
          title: formValue.chapterTitle,
          chapterNumber: parseInt(formValue.chapterNumber),
          course: courseId,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        setLoading(false);
        setChapter((preChapter) => [...preChapter, response.data.chapter]);
        setFormValue({ ...formValue, chapterTitle: "", chapterNumber: "" });
      });
  };
  const handleSaveBasic = async () => {
    setEditing(true);
    console.log(formValue);
    let response = await axios.put(
      `http://localhost:2002/course/update/${courseId}`,
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
    alert(response.data.msg);
  };
  const editor = useRef();
  const verifyLogin = async () => {
    if (localStorage.token) {
      const decode = jwt_decode(localStorage.getItem("token"));
      console.log(decode);
      dispatch({
        type: "LOG_IN",
        payload: decode,
      });
      const currentTime = Date.now() / 1000;
      if (decode.exp < currentTime) {
        dispatch({
          type: "LOG_OUT",
        });
      }
    }
  };
  useEffect(() => {
    verifyLogin();
  }, []);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:2002/course/viewenrolled/${courseId}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setLoading(false);
        setCourse(response.data.result);
        setChapter(response.data.result.chapters);
        setFormValue({
          title: response.data.result.title,
          thumbnail: response.data.result.thumbnail,
          price: response.data.result.price,
        });
        setEditorState(response.data.result.courseDetails);
      });
  }, [lesson]);
  return (
    <div className="Course_Detail_Wrapper">
      {loading ? (
        <Loading />
      ) : (
        <>
          <Navbar />
          <div className="Course_Detail_Body">
            <Container>
              <Row>
                <Col md="12">
                  <div class="edit-course-header">
                    <h2>Edit Course</h2>
                    <div class="edit-course-btns">
                      <ul class="nav">
                        <li>
                          <Link to="/dashboard" class="btn_back">
                            Back to Course
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </Col>
                <Col md="12">
                  <Card>
                    <div className="card_body">
                      <div className="edit_course_info">
                        <div className="edit_course_header">
                          <h4>Information About Course</h4>
                          <button
                            className="Edit_button"
                            onClick={() => {
                              setEditing(false);
                            }}
                          >
                            Edit
                          </button>
                        </div>
                        <div className="edit_course_form">
                          <form>
                            <div className="form_group">
                              <label
                                className="edit_course_label"
                                disabled={isEditing}
                              >
                                Course Title
                              </label>
                              <input
                                type="text"
                                className={
                                  !isEditing
                                    ? "form-control"
                                    : "disabled-form form-control"
                                }
                                placeholder="Course Title"
                                value={formValue.title}
                                disabled={isEditing}
                                onChange={(e) =>
                                  setFormValue({
                                    ...formValue,
                                    title: e.target.value,
                                  })
                                }
                              />
                            </div>
                            <div className="form_group">
                              <label className="edit_course_label">
                                Course Thumnail
                              </label>
                              <input
                                type="text"
                                className={
                                  !isEditing
                                    ? "form-control"
                                    : "disabled-form form-control"
                                }
                                placeholder="Course Thumnail"
                                disabled={isEditing}
                                value={formValue.thumbnail}
                                onChange={(e) =>
                                  setFormValue({
                                    ...formValue,
                                    thumbnail: e.target.value,
                                  })
                                }
                              />
                            </div>
                            <div className="form_group">
                              <label className="edit_course_label">
                                Course Price
                              </label>
                              <input
                                type="text"
                                className={
                                  !isEditing
                                    ? "form-control"
                                    : "disabled-form form-control"
                                }
                                placeholder="Course Price"
                                disabled={isEditing}
                                value={formValue.price}
                                onChange={(e) =>
                                  setFormValue({
                                    ...formValue,
                                    price: e.target.value,
                                  })
                                }
                              />
                            </div>
                            <div className="form_group">
                              <label className="edit_course_label">
                                Course Details
                              </label>
                              <JoditEditor
                                ref={editor}
                                value={editorState}
                                config={config}
                                tabIndex={1}
                                onBlur={(newContent) =>
                                  setEditorState(newContent)
                                }
                              />
                            </div>
                          </form>
                          {!isEditing && (
                            <button
                              className="btn_save_course"
                              onClick={handleSaveBasic}
                            >
                              Save Basic Infomation
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                </Col>
                <Col md="12">
                  <div className="add_chapter_form">
                    <div className="add_chapter_header">
                      <h4>{formValue.title}</h4>
                    </div>
                    <button className="add_chapter_btn" onClick={handleOpen}>
                      Add Chapter
                    </button>
                    <form>
                      <div className="form_group">
                        <label className="add_chapter_label">
                          Chapter Title
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Chapter Title"
                          value={formValue.chapterTitle}
                          onChange={(e) =>
                            setFormValue({
                              ...formValue,
                              chapterTitle: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="form_group">
                        <label className="add_chapter_label">
                          Chapter Number
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Chapte Number"
                          value={formValue.chapterNumber}
                          onChange={(e) =>
                            setFormValue({
                              ...formValue,
                              chapterNumber: e.target.value,
                            })
                          }
                        />
                      </div>
                    </form>
                  </div>
                </Col>
                <Col md="12">
                  {chapter?.map((chapterrr) => {
                    return (
                      <ChapterCourse
                        setCurrentChapter={setCurrentChapter}
                        chapterId={chapterrr._id}
                        lessons={chapterrr.lessons}
                        setOpenModal={setOpenModal}
                        chapterNumber={chapterrr.chapterNumber}
                        title={chapterrr.title}
                        chapter={chapter}
                        setChapter={setChapter}
                        setLoading={setLoading}
                      />
                    );
                  })}
                </Col>
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
              </Row>
            </Container>
          </div>
        </>
      )}
    </div>
  );
}
