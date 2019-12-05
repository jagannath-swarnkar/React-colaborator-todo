module.exports = (sequelize, DataTypes) => {

    const userdetail = sequelize.define('userdetails', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING,
            required: true,
            
        },
        email: {
            type: DataTypes.STRING,
            required: true,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null,
          }
    },{
        paranoid: true,
        freezTableName:true,
        underscored: true
    });
    return userdetail;
}