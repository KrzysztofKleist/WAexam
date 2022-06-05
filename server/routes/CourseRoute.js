"use strict";

const express = require("express");
const router = express.Router();

const dao = require("../modules/CourseDataAccess");

router.get("/courses", (req, res) => {
  dao
    .listCourses()
    .then((courses) => {
      res.status(200).json(courses);
    })
    .catch((reason) => {
      res.status(500).json(reason);
    });
});

module.exports = router;
