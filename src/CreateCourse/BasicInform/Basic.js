import React from "react";
import "./Basic.scss";
import { useState, useEffect, useRef } from "react";
import JoditEditor from "jodit-react";
export default function Basic() {
  const config = {
    readonly: false,
  };
  const [formValue, setFormValue] = useState({
    title: "",
    thumbnail: "",
    price: 0,
  });
  const editor = useRef(null);
  const [editorState, setEditorState] = useState("");
  return (
    <div className="add_course_info">
      <div className="add_course_header">
        <h4>Basic Information</h4>
      </div>
      <div className="add_course_form">
        <form>
          <div className="form_group">
            <label className="add_course_label">Course Title</label>
            <input
              type="text"
              class="form-control"
              placeholder="Course Title"
            />
          </div>
          <div className="form_group">
            <label className="add_course_label">Course Thumnail</label>
            <input
              type="text"
              class="form-control"
              placeholder="Course Thumnail"
            />
          </div>
          <div className="form_group">
            <label className="add_course_label">Course Price</label>
            <input
              type="text"
              class="form-control"
              placeholder="Course Price"
            />
          </div>
          <div className="form_group">
            <label className="add_course_label">Course Details</label>
            <JoditEditor
              ref={editor}
              value={editorState}
              config={config}
              tabIndex={1}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
