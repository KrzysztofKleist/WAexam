"use strict";

const express = require("express");
// const res = require("express/lib/response");
const morgan = require("morgan");
const cors = require("cors");
const courseDao = require("./modules/CourseDataAccess");
const userDao = require("./modules/UserDataAccess");
// Passport-related imports
const passport = require("passport");
const LocalStrategy = require("passport-local");
const session = require("express-session");
// init express
const app = express();
const port = 3001;

// set up the middlewares
app.use(morgan("dev"));
app.use(express.json());
const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
  credentials: true,
};
app.use(cors(corsOptions));

// Passport: set-up the local strategy
passport.use(
  new LocalStrategy(async function verify(email, password, cb) {
    const user = await userDao.getUser(email, password);
    if (!user) {
      return cb(null, false, "Incorrect username or password.");
    }

    return cb(null, user);
  })
);

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (user, cb) {
  return cb(null, user);
});

app.use(
  session({
    secret: "shhhhh... it's a secret!",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.authenticate("session"));

/*** Course APIs ***/
app.get("/api/courses", (req, res) => {
  courseDao
    .listCourses()
    .then((courses) => {
      res.status(200).json(courses);
    })
    .catch((reason) => {
      res.status(500).json(reason);
    });
});

/*** User APIs ***/
app.post("/api/sessions", passport.authenticate("local"), (req, res) => {
  console.log("CHUJEC");
  res.status(201).json(req.user);
});

// activate the server
app.listen(port, () =>
  console.log(`Server started at http://localhost:${port}.`)
);
