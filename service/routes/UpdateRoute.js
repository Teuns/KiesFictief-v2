import db from '../database/db.js';
const sequelize = db.sequelize;
import Quiz from '../models/Quiz.js';
const QuizModel = Quiz(sequelize, db.Sequelize.DataTypes);

const updateQuiz = async ({ title, published, quizId, remove }) => {
    if (remove) {
        return QuizModel.destroy({ where: { id: quizId } }).then(
            function (model) {
                Promise.resolve(model);
            },
        );
    }
    return QuizModel.update({ title, published }, { where: { id: quizId } });
};

export default async function (req, res) {
    const { title, published, remove } = req.body;
    const quizId = req.params.id;
    updateQuiz({ title, published, remove, quizId }).then(() => {
        res.json({ msg: 'De quiz is succes geupdatet!' });
    });
}
