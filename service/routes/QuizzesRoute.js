import db from '../database/db.js';
const sequelize = db.sequelize;
import Quiz from '../models/Quiz.js';
const QuizModel = Quiz(sequelize, db.Sequelize.DataTypes);
import Statement from '../models/Statement.js';
const StatementModel = Statement(sequelize, db.Sequelize.DataTypes);

const getQuizzes = async () => {
    QuizModel.hasMany(StatementModel, { foreignKey: 'quiz_id' });

    return await QuizModel.findAll({
        order: [['createdAt', 'DESC']],
        include: [
            {
                model: StatementModel,
            },
        ],
    });
};

export default function (req, res) {
    getQuizzes().then((result) => res.json(result));
}
