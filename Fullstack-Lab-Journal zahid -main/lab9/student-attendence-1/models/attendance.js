'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Attendance extends Model {
    static associate(models) {
      //belongs to student
      Attendance.belongsTo(models.student, { foreignKey: 'studentId', as: 'student' });
      //belongs to course
      Attendance.belongsTo(models.Course, { foreignKey: 'courseId', as: 'course' });
    }
  }
  Attendance.init({
    studentId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    courseId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Present'
    }
  }, {
    sequelize,
    modelName: 'Attendance',
    tableName: 'Attendances'
  });
  return Attendance;
};
