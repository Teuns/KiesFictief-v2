import db from '../database/db.js';
const sequelize = db.sequelize;
import Party from '../models/Party.js';
const PartyModel = Party(sequelize, db.Sequelize.DataTypes);

const getParties = async () => {
    return await PartyModel.findAll({
        order: [['id', 'ASC']],
    });
};

export default function (req, res) {
    getParties().then((result) => res.json(result));
}
