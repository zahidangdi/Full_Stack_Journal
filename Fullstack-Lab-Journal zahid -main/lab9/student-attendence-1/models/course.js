'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    static associate(models) {
      // Course has many attendance records
      Course.hasMany(models.Attendance, { foreignKey: 'courseId', as: 'attendances' });
      // Course has many enrollment records
      Course.hasMany(models.Enrollment, { foreignKey: 'courseId', as: 'enrollments' });
    }
  }
  Course.init({
    courseCode: {
      type: DataTypes.STRING,
      allowNull: false
    },
    courseName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    credits: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Course',
    tableName: 'Courses'
  });
  return Course;
};