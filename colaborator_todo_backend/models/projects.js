module.exports = (sequelize, DataTypes) => {

    const projects = sequelize.define('projects', {
        project_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        project_name: {
            type: DataTypes.STRING,
            allowNull: false,          
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        user_name: {
            type: DataTypes.STRING,
        },
        user_email: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.TEXT,
        },
        project_date: {
            type: DataTypes.DATE,
        }
    },{
        paranoid: true,
        underscored: true,
        freezTableName:true,
        timestamps: false
    });
    return projects;
}