const fs = require('fs');
const dotenv = require("dotenv").config();
const { DB_HOST, DB_USER, DB_PASS, DB_NAME, DIALECT } = require("../config").envdata;
module.exports = {
  development: {
    username: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
    host: DB_HOST,
    dialect: DIALECT
  },
  test: {
    username: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
    host: DB_HOST,
    dialect: DIALECT
  },
  production: {
    username: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
    host: DB_HOST,
    dialect: DIALECT
  }
};