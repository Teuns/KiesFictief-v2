export const secret =
    '$2y$10$L3ns9tOr6R1kj7xDV.B8PexIQplIX8XeOOOKs3x4aw.ENIRj8nB86%';

export default {
    mysql: {
        database: 'database',
        username: 'username',
        password: 'password',
        dialect: 'mysql',
        dialectOptions: {
            charset: 'utf8mb4',
        },
    },

    mysql_testing: {
        database: 'database',
        username: 'username',
        password: 'password',
        dialect: 'mysql',
    },

    site: 'http://localhost:8080',

    hostname: '0.0.0.0',
    port: 3000,
};
