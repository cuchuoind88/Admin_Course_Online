import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import "./Chapter.scss";
import Chaptergrid from "./Chaptergrid";
import Check from "../../LoadingScreen/Check";
export default function Chapter({
  formValue,
  setFormValue,
  courseId,
  setOpenModal,
  setCurrentChapter,
  lesson,
}) {
  const [chapters, setChapter] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log(courseId);
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
  return (
    <div className="add_chapter_info">
      <div className="add_chapter_header">
        <h4>{formValue.title}</h4>
      </div>
      <button className="add_chapter_btn" onClick={handleOpen}>
        Add Chapter
      </button>

      <div className="add_chapter_form">
        <form>
          <div className="form_group">
            <label className="add_chapter_label">Chapter Title</label>
            <input
              type="text"
              className="form-control"
              placeholder="Chapter Title"
              value={formValue.chapterTitle}
              onChange={(e) =>
                setFormValue({ ...formValue, chapterTitle: e.target.value })
              }
            />
          </div>
          <div className="form_group">
            <label className="add_chapter_label">Chapter Number</label>
            <input
              type="text"
              className="form-control"
              placeholder="Chapte Number"
              value={formValue.chapterNumber}
              onChange={(e) =>
                setFormValue({ ...formValue, chapterNumber: e.target.value })
              }
            />
          </div>
        </form>
        {loading ? (
          <Check />
        ) : (
          chapters?.map((chapter) => {
            return (
              <Chaptergrid
                chapter={chapter}
                key={chapter._id}
                courseId={courseId}
                setOpenModal={setOpenModal}
                setCurrentChapter={setCurrentChapter}
                lessons={lesson}
              />
            );
          })
        )}
      </div>
    </div>
  );
}
