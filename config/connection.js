let sequelize;

require('dotenv').config();

let config;

if (process.env.DATABASE_URL) {
    config = {
        url: process.env.DATABASE_URL,
        dialect: 'postgres',
        protocol: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    };
} else {
    config = {
        database: process.env.DB_NAME,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
    };
}

module.exports = config;

