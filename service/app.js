// node Backend Server Entry
import express from 'express';
import bodyParser from 'body-parser';
import config from './database/config.js';
import quizApi from './controllers/quiz/QuizController.js';
import * as process from 'node:process';
import db from './database/db.js';

const isTesting = process.env.NODE_ENV === 'testing' ? true : false;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const sequelize = db.sequelize;

// Check the database connection
sequelize
    .authenticate()
    .then(() => console.log('Connection has been established successfully.'))
    .catch((err) => console.error('Unable to connect to the database:', err));

// Registered api routing
app.use('/api/quiz', quizApi.router);

// Monitor port
db.sequelize.sync({ force: isTesting }).then(async function () {
    db.sequelize.query('SET NAMES utf8mb4;');

    app.listen(config.port, config.hostname, function () {
        console.log(`Successfully listening at port: ${config.port}`);
    });

    app.emit('serverStarted');
});

export default app;
