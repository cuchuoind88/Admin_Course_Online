import React from "react";
import { Button } from "reactstrap";
import Login from "./LoginPage/Login";
import Admin from "./AdminPage/Admin";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateCoure from "./CreateCourse/CreateCoure";
import CourseDetail from "./CourseDetail/CourseDetail";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Admin />} />
        <Route path="/create-course" element={<CreateCoure />} />
        <Route path="/edit-course/:courseId" element={<CourseDetail />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
