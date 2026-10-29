'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Enrollment extends Model {

    static associate(models) {
      //belongs to student
      Enrollment.belongsTo(models.student, { foreignKey: 'studentId', as: 'student' });
      //belongs to course
      Enrollment.belongsTo(models.Course, { foreignKey: 'courseId', as: 'course' });
    }
  }
  Enrollment.init({
    studentId: DataTypes.INTEGER,
    courseId: DataTypes.INTEGER,
    enrollmentDate: DataTypes.DATE,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Enrollment',
  });
  return Enrollment;
};