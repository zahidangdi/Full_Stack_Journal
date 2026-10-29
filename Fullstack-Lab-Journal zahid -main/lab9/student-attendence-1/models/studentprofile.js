'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StudentProfile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  StudentProfile.init({
    studentId: DataTypes.INTEGER,
    phone: DataTypes.STRING,
    address: DataTypes.STRING,
    guardianName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'StudentProfile',
  });
  return StudentProfile;
};