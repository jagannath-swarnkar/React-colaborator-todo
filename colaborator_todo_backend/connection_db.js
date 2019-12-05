const Sequelize = require("sequelize");

module.exports = () => {
  // Creating Sequelize connections
  var sequelize = new Sequelize("todoproject", "root", "jagan@jagan", {
    host: "127.0.0.1",
    dialect: "mysql",
    define: {
      underscored: true,
      freezeTableName: true
    }

    // operatorAliases: false
  });

  //  Creating database with sequelize connections
  sequelize
    .query("CREATE DATABASE IF NOT EXISTS todoproject")
    .then(() => {
      console.log("Database is created successfully!");
    })
    .catch(err => {
      console.log("ERROR in DATABASE CREATION!", err);
    });

  // Authenticating the database dconnection with sequelizez
  sequelize
    .authenticate()
    .then(function() {
      console.log("CONNECTED! ");
    })
    .catch(function(err) {
      console.log("SOMETHING DONE GOOFED");
    })
    .done();

  // Connect all the models/tables in the database to a db object,
  //so everything is accessible via one object
  const db = {};
  db.Sequelize = Sequelize;
  db.sequelize = sequelize;

  // Models/Tables
  db.userdetail = require("./models/userdetail.js")(sequelize, Sequelize);
  db.todos = require("./models/todos.js")(sequelize, Sequelize);
  db.comments = require("./models/comments.js")(sequelize, Sequelize);
  db.files = require("./models/files.js")(sequelize, Sequelize);
  db.projects = require("./models/projects.js")(sequelize, Sequelize);
  db.subComments = require("./models/subComments.js")(sequelize, Sequelize);
  // console.log(db)
  // let db1 = require('./models/index');

  //Syncing the modification into the database;
  db.sequelize
    .sync({ force: false })
    .then(() => {
      console.log("modification has been implemented to the database");
    })
    .catch(err => {
      console.log("Modification failed due to some weird errors", err);
    });

  return db;
};
