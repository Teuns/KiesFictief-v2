export default function (sequelize, DataTypes) {
    return sequelize.define(
        'party_statement',
        {
            party_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'parties',
                    key: 'id',
                },
            },

            statement_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'statements',
                    key: 'id',
                },
            },

            is_neither: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
            },

            is_false: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
            },

            description: {
                type: DataTypes.TEXT,
                allowNull: true,
            },

            createdAt: {
                type: DataTypes.DATE,
                defaultValue: sequelize.fn('NOW'),
            },

            updatedAt: {
                type: DataTypes.DATE,
                defaultValue: sequelize.fn('NOW'),
            },
        },
        {
            indexes: [
                {
                    unique: true,
                    fields: ['party_id', 'statement_id'],
                },
            ],
        },
    );
}
