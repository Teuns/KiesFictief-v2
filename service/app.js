// node Backend Server Entry
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./database/config.js');
const quizApi = require('./controllers/quiz/QuizController');

const isTesting = process.env.NODE_ENV == 'testing' ? true : false;

const app = express();

app.use(
    cors({
        origin: 'http://192.168.2.39:5173',
    })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const db = require('./database/db'),
    sequelize = db.sequelize;

// check the databse connectionsequelize
sequelize
    .authenticate()
    .then(() => console.log('Connection has been established successfully.'))
    .catch((err) => console.error('Unable to connect to the database:', err));

const QuizModel = sequelize.import('./models/Quiz');
const StatementModel = sequelize.import('./models/Statement');
const PartyModel = sequelize.import('./models/Party');
const PartyStatementModel = sequelize.import('./models/Party_Statement');

// registered api routing
app.use('/api/quiz', quizApi.router);

// monitor port
db.sequelize.sync({ force: isTesting }).then(async function () {
    db.sequelize.query('SET NAMES utf8mb4;');
    // create roles

    app.listen(config.port, config.hostname, function () {
        console.log(`Successfully listening at port: ${config.port}`);
    });

    app.emit('serverStarted');
});

module.exports = app;
