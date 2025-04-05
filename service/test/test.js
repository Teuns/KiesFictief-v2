const request = require('supertest');
const app = require('../app');
const FormData = require('form-data');
const db = require('../database/db'),
    sequelize = db.sequelize,
    Sequelize = db.Sequelize;

const UserModel = sequelize.import('../models/User');
const PermissionModel = sequelize.import('../models/Permission');
const RoleModel = sequelize.import('../models/Role');
const RolePermissionModel = sequelize.import('../models/Role_Permission');
const UserRoleModel = sequelize.import('../models/User_Role');
const PartyModel = sequelize.import('../models/Party');
const QuizModel = sequelize.import('../models/Quiz');
const StatementModel = sequelize.import('../models/Statement');

describe('Test Route with Token', function () {
    this.timeout(0);

    var token = '';

    before((done) => {
        app.on('serverStarted', () => {
            console.log('Database successfully migrated!');
            done();
        });
    });

    it('should be able to register a test account', function (done) {
        request(app)
            .post('/api/user/register')
            .send({
                name: 'test',
                email: 'test@test.test',
                password: 'test1234',
            })
            .expect(200)
            .end(function (err, res) {
                if (err) done(err);
                done();
            });
    });

    it('should be able to log in with the test account', function (done) {
        request(app)
            .post('/api/user/login')
            .send({ email: 'test@test.test', password: 'test1234' })
            .set('Accept', 'application/json')
            .expect(200)
            .end(function (err, res) {
                if (err) done(err);
                console.log(res);
                let result = JSON.parse(res.text);
                token = result.token;
                done();
            });
    });

    it('should not be able to consume the route /api/protected since no token was sent', function (done) {
        request(app).get('/api/protected').expect(401, done);
    });

    it('should be able to consume the route /api/protected since token valid was sent', function (done) {
        request(app)
            .get('/api/protected')
            .set('Authorization', 'Bearer ' + token)
            .expect(200, done);
    });

    it('should be able to add a test party', function (done) {
        request(app)
            .post('/api/quiz/add-party')
            .set('Authorization', 'Bearer ' + token)
            .send({ title: 'Lorem ipsum', token: token })
            .end(function (err, res) {
                if (err) done(err);
                done();
            });
    });

    it('should be able to add a statement to the test party created earlier', function (done) {
        request(app)
            .post('/api/quiz/add-statement')
            .set('Authorization', 'Bearer ' + token)
            .send({
                title: 'Lorem ipsum',
                description:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque in mattis urna. Maecenas ornare congue sem sed iaculis.',
                partyId: 1,
                token: token,
            })
            .expect(200)
            .end(function (err, res) {
                if (err) done(err);
                done();
            });
    });

    it('should be able to update the profile', function (done) {
        const formdata = new FormData();
        formdata.append('name', 'test1');
        formdata.append('email', 'test@test.nl');

        console.log('boundary: ' + formdata.getBoundary());

        request(app)
            .post('/api/user/update')
            .set('Authorization', 'Bearer ' + token)
            .set(
                'Content-Type',
                'multipart/form-data; boundary=' + formdata.getBoundary()
            )
            .send(formdata.getBuffer())
            .expect(200)
            .end(function (err, res) {
                if (err) done(err);
                done();
            });
    });

    it('should be able to retreive the user info', function (done) {
        request(app)
            .post('/api/user/info')
            .set('Authorization', 'Bearer ' + token)
            .send({ token: token })
            .expect(200)
            .end(function (err, res) {
                if (err) done(err);
                done();
            });
    });

    it('should not be able to add a test party', function (done) {
        RolePermissionModel.destroy({
            where: {
                id: 1,
            },
        });

        request(app)
            .post('/api/quiz/add-party')
            .set('Authorization', 'Bearer ' + token)
            .send({ title: 'Lorem ipsum', token: token })
            .expect(403)
            .end(function (err, res) {
                if (err) done(err);
                done();
            });
    });

    it('should not be able to add a test party without the Bearer token', function (done) {
        request(app)
            .post('/api/quiz/add-party')
            .send({ title: 'Lorem ipsum', token: token })
            .expect(401)
            .end(function (err, res) {
                done();
            });
    });

    it('should not be able to add a statement to test party created earlier without the Bearer token', function (done) {
        request(app)
            .post('/api/thread/post/1/0')
            .send({
                title: 'Lorem ipsum',
                description:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque in mattis urna. Maecenas ornare congue sem sed iaculis.',
                partyId: 1,
                token: token,
            })
            .expect(401)
            .end(function (err, res) {
                done();
            });
    });

    it('should not be able to consume the route /api/admin/users since the user is not an admin', function (done) {
        request(app)
            .get('/api/admin/users')
            .set('Authorization', 'Bearer ' + token)
            .expect(403, done);
    });

    it('should not be able to update the permissions of a role because the user is not an admin', function (done) {
        request(app)
            .post('/api/admin/role/update/1')
            .set('Authorization', 'Bearer ' + token)
            .send({
                name: 'user',
                description: '',
                permissions: [1, 2, 3, 4],
                token: token,
            })
            .expect(401)
            .end(function (err, res) {
                done();
            });
    });

    it('should not be able to update the profile of an user the user is not an admin', function (done) {
        request(app)
            .post('/api/admin/user/update/1')
            .set('Authorization', 'Bearer ' + token)
            .send({
                name: 'user',
                email: 'test@test.nl',
                password: 'yolo',
                token: token,
            })
            .expect(401)
            .end(function (err, res) {
                done();
            });
    });
});
