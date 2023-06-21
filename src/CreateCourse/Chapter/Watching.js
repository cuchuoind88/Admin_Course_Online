import React from "react";
import "./Watching.scss";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import ReactPlayer from "react-player";
export default function Watching({ filter }) {
  const [watch, setWatch] = useState(false);
  return (
    <div className="faq_grid">
      <div className="faq_header">
        <div
          className="faq_icon"
          onClick={() => {
            setWatch(!watch);
          }}
        >
          <FontAwesomeIcon icon={faBars} />
          <span>{filter.title}</span>
        </div>
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="chevron-down"
          class="svg-inline--fa fa-chevron-down "
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
        >
          <path
            fill="currentColor"
            d="M224 416c-8.188 0-16.38-3.125-22.62-9.375l-192-192c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L224 338.8l169.4-169.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-192 192C240.4 412.9 232.2 416 224 416z"
          ></path>
        </svg>
      </div>
      {watch && (
        <div className="Lesson_Detail">
          <h4 className="Player_content">{filter.content}</h4>
          <div className="Player_wrapper">
            <ReactPlayer
              id="my_video_1"
              controls
              preload="auto"
              width="100%"
              height="100%"
              className="React_player"
              url={filter.video}
              config={{
                file: {
                  hlsOptions: {
                    withCredentials: true,
                  },
                },
              }}
              plugins={[require("@videojs/http-streaming")]}
            />
          </div>
        </div>
      )}
    </div>
  );
}
