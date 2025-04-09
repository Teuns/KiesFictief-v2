import db from '../database/db.js';
const sequelize = db.sequelize;
import PartyStatement from '../models/Party_Statement.js';
const PartyStatementModel = PartyStatement(sequelize, db.Sequelize.DataTypes);

const getPartyStatementById = async (id) => {
    return PartyStatementModel.findOne({
        where: {
            id: id,
        },
    });
};

const updatePartyStatement = async ({
    id,
    is_neither,
    is_false,
    description,
}) => {
    return PartyStatementModel.update(
        { is_neither: is_neither, is_false: is_false, description },
        { where: { id: id } },
    );
};

export const GetPartyStatement = function (req, res) {
    const partyStatementId = req.params.id;
    getPartyStatementById(partyStatementId).then((result) => res.json(result));
};

export const UpdatePartyStatement = function (req, res) {
    const id = req.params.id;
    const { is_neither, is_false, description } = req.body;
    console.log(id);
    updatePartyStatement({ id, is_neither, is_false, description }).then(() => {
        res.json({ msg: 'Party statement updated successfully! ' });
    });
};
