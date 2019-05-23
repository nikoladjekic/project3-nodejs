const Sequelize = require('sequelize');
const sequelize = require('../database/db');

const User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  username:{ 
    type:Sequelize.STRING,
    allowNull: false
  },
  firstName:{ 
    type:Sequelize.STRING,
    allowNull: false
  },
  lastName:{ 
    type:Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  _id: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = User;
