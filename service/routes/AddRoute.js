import db from '../database/db.js';
const sequelize = db.sequelize;
import Quiz from '../models/Quiz.js';
const QuizModel = Quiz(sequelize, db.Sequelize.DataTypes);

const createQuiz = async ({ title }) => {
    return QuizModel.create({ title });
};

export default async function (req, res) {
    const { title } = req.body;
    createQuiz({ title })
        .then(() => {
            res.json({ msg: 'De quiz is succesvol aangemaakt!' });
        })
        .catch(function (e) {
            console.log('e: ', e.message);
            res.status(401).json({ msg: e.message });
        });
}
