module.exports = (sequelize, DataTypes) => {

    const todos = sequelize.define('todos', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        project_id: {
            type: DataTypes.INTEGER,
            allowNull: false,          
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        user_email: {
            type: DataTypes.STRING,
            allowNull: false,
          },
        text: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        done: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        assigned_to: {
            type: DataTypes.STRING,
        },
        note: {
            type: DataTypes.STRING
        }
    },{
        paranoid: true,
        underscored: true,
        freezTableName:true,
        timestamps: false
    });
    return todos;
}