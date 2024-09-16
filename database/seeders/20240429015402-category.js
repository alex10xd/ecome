'use strict';
const categoryJSON = require("../category.json")
const categoryDBMapped = categoryJSON.map((p=>{
  return{
    name: p.name
  }
}))
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
     await queryInterface.bulkInsert('Categories', categoryDBMapped, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
