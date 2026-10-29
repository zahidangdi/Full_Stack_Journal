'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint('StudentProfiles', {
      fields: ['studentId'],
      type: 'foreign key',
      name: 'fk_student_profile_studentId',
      unique: true,
      references: {
        table: 'Students',
        field: 'id'
      },


      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      "StudentProfiles",
      "fk_student_profile_studentId"
    );
  }
};
