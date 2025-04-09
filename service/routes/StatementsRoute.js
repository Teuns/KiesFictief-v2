import db from '../database/db.js';
const sequelize = db.sequelize;
import Statement from '../models/Statement.js';
const StatementModel = Statement(sequelize, db.Sequelize.DataTypes);

const getStatements = async () => {
    return await StatementModel.findAll({
        order: [['createdAt', 'DESC']],
    });
};

export default function (req, res) {
    getStatements().then((result) => res.json(result));
}
