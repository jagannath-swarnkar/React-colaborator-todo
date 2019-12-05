"use strict";
module.exports = (sequelize, DataTypes) => {
  const student = sequelize.define(
    "student",
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      age: DataTypes.INTEGER
    },
    {
      paranoid: true,
      underscored: true,
      freezTableName:true,
      timestamps: false
    }
  );
  student.associate = function(models) {
    // associations can be defined here
  };
  return student;
};
