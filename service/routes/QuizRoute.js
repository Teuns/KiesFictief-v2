import db from '../database/db.js';
const sequelize = db.sequelize;
import Quiz from '../models/Quiz.js';
const QuizModel = Quiz(sequelize, db.Sequelize.DataTypes);
import Statement from '../models/Statement.js';
const StatementModel = Statement(sequelize, db.Sequelize.DataTypes);
import PartyStatement from '../models/Party_Statement.js';
const PartyStatementModel = PartyStatement(sequelize, db.Sequelize.DataTypes);
import Party from '../models/Party.js';
const PartyModel = Party(sequelize, db.Sequelize.DataTypes);

const getQuizById = async (id) => {
    QuizModel.hasMany(StatementModel, { foreignKey: 'quiz_id' });
    StatementModel.belongsTo(QuizModel, { foreignKey: 'quiz_id' });
    StatementModel.hasMany(PartyStatementModel, { foreignKey: 'statement_id' });
    PartyStatementModel.belongsTo(PartyModel, { foreignKey: 'party_id' });
    PartyModel.belongsTo(PartyStatementModel, { foreignKey: 'id' });

    return QuizModel.findOne({
        where: {
            id: id,
        },

        include: [
            {
                model: StatementModel,
                include: [
                    {
                        model: PartyStatementModel,
                        include: [
                            {
                                model: PartyModel,
                                where: { published: true },
                            },
                        ],
                    },
                ],
            },
        ],
    });
};

export default function (req, res) {
    const quizId = req.params.id;
    getQuizById(quizId).then((result) => res.json(result));
}
