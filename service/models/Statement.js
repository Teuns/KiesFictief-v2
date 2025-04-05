module.exports = function (sequelize, DataTypes) {
    return sequelize.define('statement', {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },

        description: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
            charset: 'utf8mb4',
        },

        quiz_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'quizzes',
                key: 'id',
            },
        },

        party_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'parties',
                key: 'id',
            },
        },

        createdAt: {
            type: DataTypes.DATE,
            defaultValue: sequelize.fn('NOW'),
        },

        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: sequelize.fn('NOW'),
        },
    });
};
