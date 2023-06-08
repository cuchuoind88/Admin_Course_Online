import React, { useState } from "react";
import "./chaptergrid.scss";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import ReactPlayer from "react-player";
import Watching from "./Watching";
export default function Chaptergrid({
  chapter,
  courseId,
  setOpenModal,
  setCurrentChapter,
  lessons,
}) {
  const filteredLessons = lessons.filter(
    (lesson) => lesson.chapter === chapter._id
  );
  console.log(chapter);
  console.log(lessons);
  return (
    <div className="chapter_grid">
      <div className="chapter_grid_header">
        <p>
          Chapter {chapter.chapterNumber} : {chapter.title}
        </p>
        <div
          className="btn_add_lesson"
          onClick={() => {
            setCurrentChapter(chapter._id);
            setOpenModal(true);
          }}
        >
          Add Lesson
        </div>
      </div>
      <div className="chapter_grid_info">
        {filteredLessons.map((filter) => {
          return <Watching filter={filter} key={filter._id} />;
        })}
      </div>
    </div>
  );
}
