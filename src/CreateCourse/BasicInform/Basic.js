import React from "react";
import "./Basic.scss";
import { useState, useEffect, useRef } from "react";
import JoditEditor from "jodit-react";
export default function Basic({
  formValue,
  setFormValue,
  editorState,
  setEditorState,
}) {
  const config = {
    readonly: false,
  };
  const editor = useRef();

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (
  //     formValue.title &&
  //     formValue.thumbnail &&
  //     formValue.price &&
  //     editorState
  //   ) {
  //   }
  // };
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
              value={formValue.title}
              onChange={(e) =>
                setFormValue({ ...formValue, title: e.target.value })
              }
            />
          </div>
          <div className="form_group">
            <label className="add_course_label">Course Thumnail</label>
            <input
              type="text"
              class="form-control"
              placeholder="Course Thumnail"
              value={formValue.thumbnail}
              onChange={(e) =>
                setFormValue({ ...formValue, thumbnail: e.target.value })
              }
            />
          </div>
          <div className="form_group">
            <label className="add_course_label">Course Price</label>
            <input
              type="text"
              class="form-control"
              placeholder="Course Price"
              value={formValue.price}
              onChange={(e) =>
                setFormValue({ ...formValue, price: e.target.value })
              }
            />
          </div>
          <div className="form_group">
            <label className="add_course_label">Course Details</label>
            <JoditEditor
              ref={editor}
              value={editorState}
              config={config}
              tabIndex={1}
              onBlur={(newContent) => setEditorState(newContent)}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
