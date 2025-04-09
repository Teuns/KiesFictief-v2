import db from '../database/db.js';
const sequelize = db.sequelize;
import Statement from '../models/Statement.js';
const StatementModel = Statement(sequelize, db.Sequelize.DataTypes);
import Party from '../models/Party.js';
const PartyModel = Party(sequelize, db.Sequelize.DataTypes);
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

export default function (req, res) {
    const partyId = req.params.id;
    getPartyById(partyId).then((result) => res.json(result));
}
