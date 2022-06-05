import "bootstrap-icons/font/bootstrap-icons.css";
import { useState } from "react";
import { Table, Button } from "react-bootstrap";
// import { Link } from "react-router-dom";

function CourseTable(props) {
  return (
    <>
      <Table striped>
        <thead>
          <tr>
            <th>Code</th>
            <th>Course</th>
            <th style={{ textAlign: "center" }}>Credits</th>
            <th style={{ textAlign: "center" }}>Registered Students</th>
            <th style={{ textAlign: "center" }}>Max Students</th>
          </tr>
        </thead>
        <tbody>
          {props.courses.map((crs) => (
            <CourseRow course={crs} key={crs.code} />
          ))}
        </tbody>
      </Table>

      {/* <Link to='/add'>
        <Button variant='success'>Add Exam</Button>
      </Link> */}
    </>
  );
}

function CourseRow(props) {
  const [expand, setExpand] = useState(false);

  let statusClass = null;

  if (expand) {
    statusClass = "table-warning";
  } else {
    statusClass = "";
  }

  return (
    <>
      <tr className={statusClass}>
        <CourseData course={props.course} />
        {/* <ExamActions exam={props.exam} deleteExam={props.deleteExam} /> */}
        {expand ? (
          <HideButton expand={expand} setExpand={setExpand} />
        ) : (
          <ExpandButton expand={expand} setExpand={setExpand} />
        )}
      </tr>
      {expand ? <CourseAdditionalData course={props.course} /> : ""}
    </>
  );
}

function CourseData(props) {
  let numOfStudents = props.course.registeredStudents || "";

  if (numOfStudents === "") {
    numOfStudents = undefined;
  } else {
    numOfStudents = numOfStudents.split(",").length;
  }

  return (
    <>
      <td>{props.course.code}</td>
      <td>{props.course.name}</td>
      <td style={{ textAlign: "center" }}>{props.course.credits}</td>
      <td style={{ textAlign: "center" }}>{numOfStudents}</td>
      <td style={{ textAlign: "center" }}>{props.course.maxStudents}</td>
    </>
  );
}

function CourseAdditionalData(props) {
  return (
    <>
      <tr className={"table-warning"}>
        <td></td>
        <td>
          <tr>Incompatibile with: {props.course.incompatibileWith}</tr>
          <tr>Preparatory course: {props.course.preparatoryCourse}</tr>
        </td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
    </>
  );
}

function ExpandButton(props) {
  return (
    <td>
      <Button
        variant="primary"
        onClick={() => {
          props.setExpand(true);
        }}
      >
        <i className="bi bi-arrow-down-circle"></i>
      </Button>
    </td>
  );
}

function HideButton(props) {
  return (
    <td>
      <Button
        variant="warning"
        onClick={() => {
          props.setExpand(false);
        }}
      >
        <i className="bi bi-arrow-up-circle"></i>
      </Button>
    </td>
  );
}

export default CourseTable;
