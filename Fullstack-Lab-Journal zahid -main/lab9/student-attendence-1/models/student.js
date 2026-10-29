'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class student extends Model {
    static associate(models) {
      // Student has many attendance records
      student.hasMany(models.Attendance, { foreignKey: 'studentId', as: 'attendances' });
      // Student has many enrollment records
      student.hasMany(models.Enrollment, { foreignKey: 'studentId', as: 'enrollments' });
    }
  }
  student.init({
    rollNumber: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true
    },
    department: {
      type: DataTypes.STRING,
      allowNull: true
    },
    semester: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'student',
    tableName: 'students'
  });
  return student;
};