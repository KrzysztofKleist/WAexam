import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import CourseTable from "./CourseTable";
import { LoginForm } from "./LoginForm";

function DefaultRoute() {
  return (
    <Container className="App">
      <h1>No data here...</h1>
      <h2>This is not the route you are looking for!</h2>
    </Container>
  );
}

function CourseRoute(props) {
  return (
    <Container className="App">
      <Row>
        <Col>
          <h1>All Courses</h1>
        </Col>
        <Col>
          <Link to="/login">
            <div className="d-flex justify-content-end">
              <Button variant="primary" size="lg">
                Login
              </Button>
            </div>
          </Link>
        </Col>
      </Row>
      <Row>
        <Col>
          <CourseTable courses={props.courses} />
        </Col>
      </Row>
    </Container>
  );
}

function LoginRoute(props) {
  return (
    <>
      <div
        className="d-flex justify-content-center"
        style={{ marginTop: "20px" }}
      >
        <Row>
          <Col>
            <h1>Login</h1>
          </Col>
        </Row>
      </div>
      <div className="d-flex justify-content-center">
        <Row className="justify-content-md-center">
          <Col>
            <LoginForm login={props.login} />
          </Col>
        </Row>
      </div>
    </>
  );
}

function LoggedInRoute() {
  return (
    <Container className="App">
      <h1>You logged in</h1>
    </Container>
  );
}

export { CourseRoute, DefaultRoute, LoginRoute, LoggedInRoute };
