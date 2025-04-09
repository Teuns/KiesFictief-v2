import express from 'express';
import { getAuth } from '../../helpers/index.js';
import addPartyRoute from '../../routes/AddPartyRoute.js';
import AddQuizRoute from '../../routes/AddQuizRoute.js';
import AddStatementRoute from '../../routes/AddStatementRoute.js';
import PartiesRoute from '../../routes/PartiesRoute.js';
import PartyRoute from '../../routes/PartyRoute.js';
import {
    GetPartyStatement,
    UpdatePartyStatement,
} from '../../routes/PartyStatementRoute.js';
import QuizRoute from '../../routes/QuizRoute.js';
import QuizzesRoute from '../../routes/QuizzesRoute.js';
import StatementRoute from '../../routes/StatementRoute.js';
import StatementsRoute from '../../routes/StatementsRoute.js';
import UpdatePartyRoute from '../../routes/UpdatePartyRoute.js';
import UpdateQuizRoute from '../../routes/UpdateQuizRoute.js';
import UpdateStatementRoute from '../../routes/UpdateStatementRoute.js';

const router = express.Router();

router.get('/quizzes', QuizzesRoute);

router.get('/statement/:id', StatementRoute);

router.get('/statements', getAuth, StatementsRoute);

router.get('/parties', PartiesRoute);

router.get('/party/:id', getAuth, PartyRoute);

router.get('/party-statement/:id', getAuth, GetPartyStatement);

router.get('/:id', QuizRoute);

router.post('/add-party', getAuth, addPartyRoute);

router.post('/add', getAuth, AddQuizRoute);

router.post('/add-statement', getAuth, AddStatementRoute);

router.post('/party-statement/:id', getAuth, UpdatePartyStatement);

router.post('/update-party/:id', getAuth, UpdatePartyRoute);

router.post('/update/:id', getAuth, UpdateQuizRoute);

router.post('/update-statement', getAuth, UpdateStatementRoute);

export default { router };
