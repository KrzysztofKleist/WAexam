"use strict";
/* Data Access Object (DAO) module for accessing courses */

const sqlite = require("sqlite3");
const { Course } = require("./Course");

const db = new sqlite.Database("courses.db", (err) => {
  if (err) throw err;
});

// get all courses
exports.listCourses = () => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM courses";
    db.all(sql, [], (err, rows) => {
      if (err) reject(err);
      else {
        const courses = rows.map(
          (row) =>
            new Course(
              row.code,
              row.name,
              row.credits,
              row.registeredStudents,
              row.maxStudents,
              row.incompatibileWith,
              row.preparatoryCourse
            )
        );
        resolve(courses);
      }
    });
  });
};
