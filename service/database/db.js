import config from './config.js';
import Sequelize from 'sequelize';
import * as process from 'node:process';

const isTesting = process.env.NODE_ENV === 'testing';

let sequelize;

if (isTesting) sequelize = new Sequelize(config.mysql_testing);
else sequelize = new Sequelize(config.mysql);

let db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
