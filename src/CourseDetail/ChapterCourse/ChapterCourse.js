import React from "react";
import "./ChapterCourse.scss";
import Watching from "../../CreateCourse/Chapter/Watching";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useState } from "react";
import { faL, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
export default function ChapterCourse({
  setCurrentChapter,
  lessons,
  setOpenModal,
  chapterId,
  chapterNumber,
  title,
  chapter,
  setChapter,
  setLoading,
}) {
  const [openEditor, setOpenEditor] = useState(false);
  const [cTitle, setCTitle] = useState(title);
  const [cNumber, setCNumber] = useState(chapterNumber);
  console.log(cTitle, cNumber);
  const [formValue, setFormValue] = useState({
    title: "",
    number: "",
  });
  const handleDelete = async () => {
    try {
      setLoading(true);
      const result = await axios.delete(
        `http://localhost:2002/chapter/delete/${chapterId}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      setChapter(() => {
        return chapter.filter((chap) => chap._id !== chapterId);
      });
      setLoading(false);
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  };
  const handleUpdate = async () => {
    const result = await axios.put(
      `http://localhost:2002/chapter/update/${chapterId}`,
      {
        title: formValue.title,
        chapterNumber: formValue.number,
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    console.log(result);
    setCTitle(result.data.newChapter.title);
    setCNumber(result.data.newChapter.chapterNumber);
  };
  return (
    <div className="chapter_wrapper">
      <div className="chapter_header">
        <p>
          Chapter {cNumber} : {cTitle}
        </p>
        <div className="btn_chapters">
          <div
            className="btn_edit_chapter"
            onClick={() => {
              setOpenEditor(!openEditor);
            }}
          >
            <FontAwesomeIcon icon={faPenToSquare} />
          </div>
          <div className="btn_delete_chapter" onClick={handleDelete}>
            <FontAwesomeIcon icon={faTrash} />
          </div>
          <div
            className="btn_add_lesson"
            onClick={() => {
              setCurrentChapter(chapterId);
              setOpenModal(true);
            }}
          >
            Add Lesson
          </div>
        </div>
      </div>
      {openEditor && (
        <div className="edit_chapter_block">
          <form>
            <div className="form_group">
              <label className="edit_chapter_label">Chapter Title</label>
              <input
                type="text"
                className="form-control"
                placeholder="Chapter Title"
                value={formValue.title}
                onChange={(e) =>
                  setFormValue({
                    ...formValue,
                    title: e.target.value,
                  })
                }
              />
            </div>
            <div className="form_group">
              <label className="edit_chapter_label">Chapter Number</label>
              <input
                type="text"
                className="form-control"
                placeholder="Chapte Number"
                value={formValue.number}
                onChange={(e) =>
                  setFormValue({
                    ...formValue,
                    number: e.target.value,
                  })
                }
              />
            </div>
          </form>
          <button className="btn_update_chapter" onClick={handleUpdate}>
            Update Chapter
          </button>
        </div>
      )}
      <div className="chapter_grid_info">
        {lessons.map((lesson) => {
          return <Watching filter={lesson} key={lesson._id} />;
        })}
      </div>
    </div>
  );
}
