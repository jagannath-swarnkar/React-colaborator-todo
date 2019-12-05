module.exports = (sequelize, DataTypes) => {

    const files = sequelize.define('files', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        todo_id: {
            type: DataTypes.INTEGER,
            allowNull: false
            
        },
        file: {
            type: DataTypes.STRING,
        }
    },{
        paranoid: true,
        underscored: true,
        freezTableName:true,
        timestamps:false
    });
    return files;
}