const config = require('./config.js');
const Sequelize = require('sequelize'); // initialize an instance of Sequelize

const isTesting = process.env.NODE_ENV === 'testing';

let sequelize;

if (isTesting) sequelize = new Sequelize(config.mysql_testing);
else sequelize = new Sequelize(config.mysql);

let db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
