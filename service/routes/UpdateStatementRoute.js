import db from '../database/db.js';
const sequelize = db.sequelize;
import Statement from '../models/Statement.js';
const StatementModel = Statement(sequelize, db.Sequelize.DataTypes);
import PartyStatement from '../models/Party_Statement.js';
const PartyStatementModel = PartyStatement(sequelize, db.Sequelize.DataTypes);

const updateStatement = async ({
    title,
    description,
    quizId,
    statementId,
    remove,
}) => {
    if (remove) {
        PartyStatementModel.destroy({ where: { statement_id: statementId } });
        return StatementModel.destroy({ where: { id: statementId } }).then(
            function (model) {
                Promise.resolve(model);
            },
        );
    }
    return StatementModel.update(
        { title, description, quiz_id: quizId },
        { where: { id: statementId } },
    );
};

export default async function (req, res) {
    const { title, description, quizId, statementId, remove } = req.body;
    updateStatement({
        title,
        description,
        quizId,
        statementId,
        remove,
    }).then(() => {
        res.json({ msg: 'Statement updated successfully' });
    });
}
