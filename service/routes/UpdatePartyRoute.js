import db from '../database/db.js';
const sequelize = db.sequelize;
import Party from '../models/Party_Statement.js';
const PartyModel = Party(sequelize, db.Sequelize.DataTypes);
import Statement from '../models/Statement.js';
const StatementModel = Statement(sequelize, db.Sequelize.DataTypes);
import PartyStatement from '../models/Party_Statement.js';
const PartyStatementModel = PartyStatement(sequelize, db.Sequelize.DataTypes);

const getPartyById = async (id) => {
    StatementModel.hasMany(PartyStatementModel, { foreignKey: 'statement_id' });
    PartyStatementModel.belongsTo(StatementModel, {
        foreignKey: 'statement_id',
    });
    PartyStatementModel.belongsTo(PartyModel, { foreignKey: 'party_id' });
    PartyModel.hasMany(PartyStatementModel, { foreignKey: 'party_id' });

    return PartyModel.findOne({
        where: {
            id,
        },
        include: [
            {
                model: PartyStatementModel,
                include: [StatementModel],
            },
        ],
    });
};

const updateParty = async ({ title, description, partyId, remove }) => {
    if (remove) {
        return PartyModel.destroy({ where: { id: partyId } }).then(
            function (model) {
                Promise.resolve(model);
            },
        );
    }
    return PartyModel.update(
        { title, description },
        { where: { id: partyId } },
    );
};

export default async function (req, res) {
    const { title, description, remove } = req.body;
    const partyId = req.params.id;
    getPartyById(partyId).then(() => {
        updateParty({ title, description, partyId, remove }).then(() => {
            res.json({ msg: 'De partij is met succes geupdatet!' });
        });
    });
}
