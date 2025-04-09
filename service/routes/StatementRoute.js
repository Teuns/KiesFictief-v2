import db from '../database/db.js';
const sequelize = db.sequelize;
import Statement from '../models/Statement.js';
const StatementModel = Statement(sequelize, db.Sequelize.DataTypes);

const getStatementById = async (id) => {
    return StatementModel.findOne({
        where: {
            id: id,
        },
    });
};

export default function (req, res) {
    const statementId = req.params.id;
    getStatementById(statementId).then((result) => res.json(result));
}
