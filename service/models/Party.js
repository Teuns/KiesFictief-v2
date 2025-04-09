export default function (sequelize, DataTypes) {
    return sequelize.define('party', {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },

        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },

        logo: {
            type: DataTypes.STRING(1000),
            allowNull: true,
        },

        published: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
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
}
