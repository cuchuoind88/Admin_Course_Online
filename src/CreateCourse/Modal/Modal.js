import React from "react";
import { useState, useRef } from "react";
import JoditEditor from "jodit-react";
import axios from "axios";
import "./Modal.scss";
export default function Modal({
  setOpenModal,
  lessonContent,
  setlessonContent,
  courseId,
  currentChapter,
  setLesson,
}) {
  const editor = useRef();
  const config = {
    readonly: false,
  };
  const [selectedFile, setSelectedFile] = useState({});
  console.log(selectedFile);
  const [formTitle, setFormTile] = useState("");
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const SaveLesson = async () => {
    const formData = new FormData();
    formData.append("video", selectedFile);
    formData.append("title", formTitle);
    formData.append("course", courseId);
    formData.append("chapter", currentChapter);
    formData.append("content", lessonContent.replace(/<[^>]+>/g, ""));
    const newLesson = await axios.post(
      "http://localhost:2002/lesson/create",
      // video: "",
      // title: formTitle,
      // content: lessonContent.replace(/<[^>]+>/g, ""),
      // course: courseId,
      // chapter: currentChapter,
      formData,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "multipart/form-data", // Cấu hình header để Axios hiểu dữ liệu là FormData
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
  return (
    <div className="Modal_lesson">
      <div className="Modal_body">
        <div className="Modal_header">
          <h4>Create Lesson</h4>
          <button
            className="close_button"
            onClick={() => {
              setOpenModal(false);
            }}
          >
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="circle-xmark"
              class="svg-inline--fa fa-circle-xmark "
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM175 208.1L222.1 255.1L175 303C165.7 312.4 165.7 327.6 175 336.1C184.4 346.3 199.6 346.3 208.1 336.1L255.1 289.9L303 336.1C312.4 346.3 327.6 346.3 336.1 336.1C346.3 327.6 346.3 312.4 336.1 303L289.9 255.1L336.1 208.1C346.3 199.6 346.3 184.4 336.1 175C327.6 165.7 312.4 165.7 303 175L255.1 222.1L208.1 175C199.6 165.7 184.4 165.7 175 175C165.7 184.4 165.7 199.6 175 208.1V208.1z"
              ></path>
            </svg>
          </button>
        </div>
        <form>
          <div className="form_lesson_group">
            <label className="form_lesson_label">Lesson Title</label>
            <input
              type="text"
              placeholder="Lesson Title"
              className="form_lesson_control"
              value={formTitle}
              onChange={(e) => {
                setFormTile(e.target.value);
              }}
            />
          </div>
          <div className="form_lesson_group">
            <label className="form_lesson_label">Video Lesson</label>
            <input
              className="form_lesson_control input_file"
              type="file"
              onChange={handleFileChange}
            />
          </div>

          <div className="form_lesson_group">
            <label className="form_lesson_label">Lesson Content</label>
            <JoditEditor
              ref={editor}
              value={lessonContent}
              config={config}
              tabIndex={1}
              onBlur={(newContent) => setlessonContent(newContent)}
            />
          </div>
        </form>
        <button className="Save_lesson_btn" onClick={SaveLesson}>
          Save
        </button>
      </div>
      <div className="Modal_overlay"></div>
    </div>
  );
}
