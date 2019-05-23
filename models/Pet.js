const Sequelize = require('sequelize');
const sequelize = require('../database/db');

const Pet = sequelize.define('pet', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name:{ 
    type:Sequelize.STRING,
    allowNull: false
  },
  category: {
    type: Sequelize.STRING,
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM,
    values: ["AVAILABLE", "PENDING", "SOLD"]
  },
  _id: {
    type: Sequelize.STRING,
    allowNull: false
  }

});


module.exports = Pet;
