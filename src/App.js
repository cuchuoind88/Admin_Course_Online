import React from "react";
import { Button } from "reactstrap";
import Login from "./LoginPage/Login";
import Admin from "./AdminPage/Admin";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateCoure from "./CreateCourse/CreateCoure";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Admin />} />
        <Route path="/create-course" element={<CreateCoure />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
