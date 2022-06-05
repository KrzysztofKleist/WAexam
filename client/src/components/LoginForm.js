import { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

function LoginForm(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const credentials = { email, password };

    props.login(credentials);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div
        className="d-flex justify-content-center"
        style={{ marginTop: "20px" }}
      >
        <Form.Group controlId="email">
          <Form.Label>E-mail</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
            required={true}
          />
        </Form.Group>
      </div>
      <div
        className="d-flex justify-content-center"
        style={{ marginTop: "20px" }}
      >
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
            required={true}
            minLength={4}
          />
        </Form.Group>
      </div>
      <div
        className="d-flex justify-content-center"
        style={{ marginTop: "20px" }}
      >
        <Button type="submit">Login</Button>
      </div>
      <Link to="/">
        <div
          className="d-flex justify-content-center"
          style={{ marginTop: "20px" }}
        >
          <Button type="submit">Back to main page</Button>
        </div>
      </Link>
    </Form>
  );
}

function LogoutButton(props) {
  return (
    <Row>
      <Col>
        <Button variant="outline-primary" onClick={props.logout}>
          Logout
        </Button>
      </Col>
    </Row>
  );
}

export { LoginForm, LogoutButton };
