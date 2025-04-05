const express = require('express');
const db = require('../../database/db'),
    sequelize = db.sequelize;
const QuizModel = sequelize.import('../../models/Quiz');
const StatementModel = sequelize.import('../../models/Statement');
const PartyModel = sequelize.import('../../models/Party');
const PartyStatementModel = sequelize.import('../../models/Party_Statement');

const router = express.Router();

const secret = '$2y$10$L3ns9tOr6R1kj7xDV.B8PexIQplIX8XeOOOKs3x4aw.ENIRj8nB86%';

const getAuth = function (req, res, next) {
    if (req.query.token) {
        if (req.query.token === secret) next();
        else res.status(403).send({ error: 'Access denied' });
    } else res.status(400).send({ error: 'Invalid token' });
};

const getQuizById = async (id) => {
    QuizModel.hasMany(StatementModel, { foreignKey: 'quiz_id' });
    StatementModel.belongsTo(QuizModel, { foreignKey: 'quiz_id' });
    StatementModel.hasMany(PartyStatementModel, { foreignKey: 'statement_id' });
    PartyStatementModel.belongsTo(PartyModel, { foreignKey: 'party_id' });
    PartyModel.belongsTo(PartyStatementModel, { foreignKey: 'id' });

    return await QuizModel.findOne({
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

const getStatementById = async (id) => {
    return await StatementModel.findOne({
        where: {
            id: id,
        },
    });
};

const getPartyStatementById = async (id) => {
    return await PartyStatementModel.findOne({
        where: {
            id: id,
        },
    });
};

const getPartyById = async (id) => {
    StatementModel.hasMany(PartyStatementModel, { foreignKey: 'statement_id' });
    PartyStatementModel.belongsTo(StatementModel, {
        foreignKey: 'statement_id',
    });
    PartyStatementModel.belongsTo(PartyModel, { foreignKey: 'party_id' });
    PartyModel.hasMany(PartyStatementModel, { foreignKey: 'party_id' });

    return await PartyModel.findOne({
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

const createQuiz = async ({ title }) => {
    return QuizModel.create({ title });
};

const updateQuiz = async ({ title, published, quizId, remove }) => {
    if (remove) {
        return QuizModel.destroy({ where: { id: quizId } }).then(function (
            model
        ) {
            Promise.resolve(model);
        });
    }
    return QuizModel.update({ title, published }, { where: { id: quizId } });
};

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
            }
        );
    }
    return StatementModel.update(
        { title, description, quiz_id: quizId },
        { where: { id: statementId } }
    );
};

const updatePartyStatement = async ({
    id,
    is_neither,
    is_false,
    description,
}) => {
    return PartyStatementModel.update(
        { is_neither: is_neither, is_false: is_false, description },
        { where: { id: id } }
    );
};

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

const updateParty = async ({ title, description, partyId, remove }) => {
    if (remove) {
        return PartyModel.destroy({ where: { id: partyId } }).then(function (
            model
        ) {
            Promise.resolve(model);
        });
    }
    return PartyModel.update(
        { title, description },
        { where: { id: partyId } }
    );
};

const getParties = async () => {
    return await PartyModel.findAll({
        order: [['id', 'ASC']],
    });
};

const getStatements = async () => {
    return await StatementModel.findAll({
        order: [['createdAt', 'DESC']],
    });
};

const getQuizzes = async () => {
    QuizModel.hasMany(StatementModel, { foreignKey: 'quiz_id' });

    return await QuizModel.findAll({
        order: [['createdAt', 'DESC']],
        include: [
            {
                model: StatementModel,
            },
        ],
    });
};

// Get statement
router.get('/statement/:id', function (req, res) {
    const statementId = req.params.id;
    getStatementById(statementId).then((result) => res.json(result));
});

// Create party
router.post('/add-party', getAuth, async function (req, res, next) {
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
});

// Get party statement
router.get('/party-statement/:id', getAuth, function (req, res) {
    const partyStatementId = req.params.id;
    getPartyStatementById(partyStatementId).then((result) => res.json(result));
});

// Update party statement
router.post('/party-statement/:id', getAuth, async function (req, res) {
    const id = req.params.id;
    const { is_neither, is_false, description } = req.body;
    console.log(id);
    updatePartyStatement({ id, is_neither, is_false, description }).then(() => {
        res.json({ msg: 'Party statement updated successfully! ' });
    });
});

// Add statement to quiz
router.post('/add-statement', getAuth, async function (req, res, next) {
    const { title, description, quizId, partyId } = req.body;
    createStatement({ title, description, quizId, partyId }).then(() => {
        res.json({ msg: 'De stelling is succesvol aangemaakt!' });
    });
});

// Update statement
router.post('/update-statement', getAuth, async function (req, res, next) {
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
});

// Create quiz
router.post('/add', getAuth, async function (req, res, next) {
    const { title } = req.body;
    createQuiz({ title })
        .then(() => {
            res.json({ msg: 'De quiz is succesvol aangemaakt!' });
        })
        .catch(function (e) {
            console.log('e: ', e.message);
            res.status(401).json({ msg: e.message });
        });
});

// Update quiz
router.post('/update/:id', getAuth, async function (req, res, next) {
    const { title, published, remove } = req.body;
    const quizId = req.params.id;
    updateQuiz({ title, published, remove, quizId }).then(() => {
        res.json({ msg: 'De quiz is succes geupdatet!' });
    });
});

// Get party
router.get('/party/:id', getAuth, function (req, res) {
    const partyId = req.params.id;
    getPartyById(partyId).then((result) => res.json(result));
});

// Update party
router.post('/update-party/:id', getAuth, async function (req, res, next) {
    const { title, description, remove } = req.body;
    const partyId = req.params.id;
    getPartyById(partyId).then(() => {
        updateParty({ title, description, partyId, remove }).then(() => {
            res.json({ msg: 'De partij is met succes geupdatet!' });
        });
    });
});

// Get parties
router.get('/parties', function (req, res) {
    getParties().then((result) => res.json(result));
});

// Get quizzes
router.get('/quizzes', function (req, res) {
    getQuizzes().then((result) => res.json(result));
});

// Get statements
router.get('/statements', getAuth, function (req, res) {
    getStatements().then((result) => res.json(result));
});

// Get quiz
router.get('/:id', function (req, res) {
    const quizId = req.params.id;
    getQuizById(quizId).then((result) => res.json(result));
});

module.exports = { router };
