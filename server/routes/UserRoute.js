"use strict";

const express = require("express");
const router = express.Router();

const dao = require("../modules/UserDataAccess");

// router.get("/courses", (req, res) => {
//   dao
//     .listCourses()
//     .then((courses) => {
//       res.status(200).json(courses);
//     })
//     .catch((reason) => {
//       res.status(500).json(reason);
//     });
// });

router.post("/sessions", (req, res) => {
  res.end();
});

module.exports = router;
