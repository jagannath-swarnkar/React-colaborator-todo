module.exports = (sequelize, DataTypes) => {

    const sub_comments = sequelize.define('sub_comments', {
        sub_comment_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        comment_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        todo_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        sub_comment: {
            type: DataTypes.TEXT,
        },
    },{
        paranoid: true,
        underscored: true,
        freezTableName:true,
        timestamps: false
    });
    return sub_comments;
}