var express = require("express");
var app = express();
var cors = require("cors");
app.use(cors());
app.use(express.json());
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
// const checkToken = require('./tokenvar');
const { DB_HOST, DB_USER, DB_PASS, DB_NAME } = require("./config").envdata;
var checkToken = require("./TokenVerify");

//-------------------------------------------------------------------------------------
// setup for sequelize
const dbConnection = require("./connection_db.js");
const db1 = dbConnection();
// app.use(dbConnection())
const Sequelize = require("sequelize");
const db = require("./models");
// console.log(db);

const Op = Sequelize.Op;

// Creating routes for backend endpoints which are in routes folder-----

// endpoint for signup-----------------------
var signup = express.Router();
require("./Routes/Signup")(db, signup);
app.use("/", signup);

// endpoint for login------------------------
var login = express.Router();
require("./Routes/Login")(db, login, jwt);
app.use("/", login);

// endpoint for project detail table---------
var project = express.Router();
require("./Routes/Project")(db, Op, project, jwt, checkToken);
app.use("/", project);

// endpoint for todos------------------------
var todos = express.Router();
require("./Routes/Todos")(db, todos, checkToken);
app.use("/", todos);

var fileUpload = express.Router();
require("./Routes/file-upload")(db, fileUpload, checkToken);
app.use("/", fileUpload);

app.listen((PORT = 3030), () => {
  console.log("your app is running on PORT : ", PORT);
});
