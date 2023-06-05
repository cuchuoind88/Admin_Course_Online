import React, { useState } from "react";
import { Row, Col } from "reactstrap";
import "./Login.scss";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FormGroup, Input, Label } from "reactstrap";
import jwt_decode from "jwt-decode";
export default function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const LXCstate = useSelector((state) => state);
  const grabUserDetails = () => {
    axios
      .get("http://localhost:2002/student/view-profile", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        dispatch({
          type: "POPULATE_USER_DETAILS",
          payload: response.data.result,
        });
        console.log(LXCstate);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const loginHandle = (values) => {
    // setLoading(true);
    axios
      .post(url, {
        username: values.userName,
        password: values.password,
      })
      .then((response) => {
        // // setLoading(false);
        navigate("/dashboard");
        localStorage.setItem("token", response.data.token);
        const decode = jwt_decode(response.data.token);
        console.log(decode);
        dispatch({
          type: "LOG_IN",
          payload: decode,
        });
        console.log(LXCstate);
        grabUserDetails();
      })
      .catch((err) => {
        if (err.response) {
          setLoading(false);
          setError(true);
          console.log(err.response);
        }
      });
    console.log(values);
  };
  const url = "http://localhost:2002/student/login";
  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
    },
    validationSchema: Yup.object({
      userName: Yup.string()
        .max(10, "Must be 10 characters or less")
        .required("Required"),
      password: Yup.string()
        .max(10, "Must be 10 characters or less")
        .required("Required"),
    }),
    onSubmit: (values) => {
      loginHandle(values);
    },
  });
  return (
    <Row>
      <Col md="6" className="Login_background">
        <div className="welcome-login">
          <div className="login-banner">
            <img src="https://dreamslms.dreamguystech.com/html/assets/img/login-img.png" />
          </div>
          <div className="login_text">
            <h3>
              Welcome to
              <br />
              LXC Courses
            </h3>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam.
            </p>
          </div>
        </div>
        <div className="nav_dot">
          <button></button>
          <button></button>
          <button></button>
        </div>
      </Col>
      <Col md="6">
        <div className="Login_form">
          <div className="form_header">
            <img src="https://dreamslms.dreamguystech.com/html/assets/img/logo.svg" />
          </div>
          <h1>Sign into Your Account</h1>
          <form onSubmit={formik.handleSubmit}>
            <FormGroup className="mb-3">
              <div className="input-group">
                <label htmlFor="userName">Username</label>
                <input
                  id="userName"
                  name="userName"
                  placeholder="User name"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.userName}
                />
              </div>
              {formik.touched.userName && formik.errors.userName ? (
                <div className="error">{formik.errors.userName}</div>
              ) : null}
            </FormGroup>
            <FormGroup>
              <div className="input-group">
                <label htmlFor="password">Password</label>
                <input
                  placeholder="Password"
                  id="password"
                  name="password"
                  type="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
              </div>
              {formik.touched.password && formik.errors.password ? (
                <div className="error">{formik.errors.password}</div>
              ) : null}
            </FormGroup>
            <FormGroup check className="mt-4">
              <Label check>
                <Input defaultChecked type="checkbox" />
                <span className="form-check-sign" />
                Remember me!
              </Label>
            </FormGroup>
            <div className="text-center">
              {error && (
                <p className="text-danger">Incorrect userName or password !</p>
              )}
              <button className="btn_start" type="submit">
                Sign In
              </button>
            </div>
          </form>
        </div>
      </Col>
    </Row>
  );
}
