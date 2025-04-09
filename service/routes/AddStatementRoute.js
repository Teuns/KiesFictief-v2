import db from '../database/db.js';
const sequelize = db.sequelize;
import Statement from '../models/Statement.js';
const StatementModel = Statement(sequelize, db.Sequelize.DataTypes);
import Party from '../models/Party.js';
const PartyModel = Party(sequelize, db.Sequelize.DataTypes);
import PartyStatement from '../models/Party_Statement.js';
const PartyStatementModel = PartyStatement(sequelize, db.Sequelize.DataTypes);

const createStatement = async ({ title, description, quizId, partyId }) => {
    return await StatementModel.create({
        title,
        description,
        quiz_id: quizId,
        party_id: partyId,
    })
        .then(async function (model) {
            let done;
            // After creating the statement, add it to all parties
            await PartyModel.findAll().then(function (party_model) {
                party_model.forEach((party) => {
                    PartyStatementModel.findOrCreate({
                        where: {
                            statement_id: model.id,
                            party_id: party.id,
                            is_false: party.id !== parseInt(partyId),
                        },
                    });
                });
            });
            done = true;
            if (done) return Promise.resolve(model);
        })
        .catch(function (err) {
            console.log('err ' + err);
            return Promise.reject(err);
        });
};

export default async function (req, res) {
    const { title, description, quizId, partyId } = req.body;
    createStatement({ title, description, quizId, partyId }).then(() => {
        res.json({ msg: 'De stelling is succesvol aangemaakt!' });
    });
}
