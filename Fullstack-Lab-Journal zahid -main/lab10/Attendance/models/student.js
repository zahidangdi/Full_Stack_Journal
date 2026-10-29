'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // static associate(models) {
    //   Student.hasMany(models.Attendance, { foreignKey: 'studentId' });

    //   Student.hasOne(models.Course, { foreignKey: 'studentId' });
    // }
  }
  Student.init({
    rollNumber: DataTypes.STRING,
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    department: DataTypes.STRING,
    semester: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Student',
  });
  return Student;
};