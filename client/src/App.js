import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Alert, Container, Row } from "react-bootstrap";

import {
  CourseRoute,
  DefaultRoute,
  LoginRoute,
  LoggedInRoute,
} from "./components/CourseViews";

import API from "./API";

function App() {
  const [courses, setCourses] = useState([]);
  const [message, setMessage] = useState("");

  const handleLogin = async (credentials) => {
    try {
      const user = await API.logIn(credentials);
      // setLoggedIn(true);
      setMessage({ msg: `Welcome, ${user.name}!`, type: "success" });
    } catch (err) {
      console.log(err);
      setMessage({ msg: err, type: "danger" });
    }
  };

  const getCourses = async () => {
    const courses = await API.getAllCourses();
    courses.sort(function (a, b) {
      return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
    });
    setCourses(courses);
    setMessage({ msg: "Loading complete!", type: "success" });
  };

  useEffect(() => {
    getCourses();
  }, []);

  return (
    <Container className="App">
      {message && (
        <Row>
          <Alert
            variant={message.type}
            onClose={() => setMessage("")}
            dismissible
          >
            {message.msg}
          </Alert>
        </Row>
      )}
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginRoute login={handleLogin} />} />
          <Route path="/" element={<CourseRoute courses={courses} />} />
          <Route path="*" element={<DefaultRoute />} />
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;
