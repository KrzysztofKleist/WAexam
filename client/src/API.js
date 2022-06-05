import Course from "./Course";

const SERVER_URL = "http://localhost:3001";

const getAllCourses = async () => {
  const response = await fetch(SERVER_URL + "/api/courses");
  const coursesJson = await response.json();
  if (response.ok) {
    return coursesJson.map(
      (crs) =>
        new Course(
          crs.code,
          crs.name,
          crs.credits,
          crs.registeredStudents,
          crs.maxStudents,
          crs.incompatibileWith,
          crs.preparatoryCourse
        )
    );
  } else throw coursesJson;
};

const logIn = async (credentials) => {
  const response = await fetch(SERVER_URL + "/api/sessions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(credentials),
  });
  if (response.ok) {
    const user = await response.json();
    return user;
  } else {
    const errDetails = await response.text();
    throw errDetails;
  }
};

const API = { getAllCourses, logIn };
export default API;
