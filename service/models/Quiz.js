export default function (sequelize, DataTypes) {
    return sequelize.define('quiz', {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        published: {
            type: DataTypes.INTEGER,
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
    });
}
