import db from '../database/db.js';
const sequelize = db.sequelize;
import Party from '../models/Party.js';
const PartyModel = Party(sequelize, db.Sequelize.DataTypes);
import Statement from '../models/Statement.js';
const StatementModel = Statement(sequelize, db.Sequelize.DataTypes);
import PartyStatement from '../models/Party_Statement.js';
const PartyStatementModel = PartyStatement(sequelize, db.Sequelize.DataTypes);

const addParty = async ({ title, description, logo }) => {
    return await PartyModel.create({
        title,
        description,
        logo,
    })
        .then(function (model) {
            return Promise.resolve(model);
        })
        .catch(function (err) {
            console.log('err ' + err);
            return Promise.reject(err);
        });
};

export default async function (req, res) {
    const { title, description, logo } = req.body;
    addParty({ title, description, logo })
        .then(async (model) => {
            let done;
            // Add all statements to the new created party and make them false (disagreeing)
            await StatementModel.findAll().then(function (statement_model) {
                statement_model.forEach((statement) => {
                    PartyStatementModel.findOrCreate({
                        where: {
                            statement_id: statement.id,
                            party_id: model.id,
                            is_false: 1,
                        },
                    });
                });
            });
            done = true;
            if (done) res.json({ msg: 'De partij is succesvol aangemaakt!' });
        })
        .catch(function (e) {
            res.status(401).json({ msg: e.message });
        });
}
