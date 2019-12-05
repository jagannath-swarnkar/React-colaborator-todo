module.exports = (sequelize, DataTypes) => {
    const comments = sequelize.define('comments', {
        comment_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        todo_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        comment: {
            type: DataTypes.TEXT,
        },
    },{
        paranoid: true,
        underscored: true,
        freezTableName:true,
        timestamps:false
    });
    comments.associate = function(models) {
      // associations can be defined here
    };
    return comments;
  };