const Sequelize = require('sequelize');
require('dotenv').config(); 


const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.DATABASE_URL) {
    sequelize = new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres',
        protocol: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    });
} else {
    sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
    });
}


// const sequelize = new Sequelize(
//   process.env.DB_NAME,
//   process.env.DB_USER, 
//   process.env.DB_PASSWORD, 
//   {
//     host: process.env.DB_HOST, 
//     dialect: process.env.DB_DIALECT, 
//   }
// );


module.exports = sequelize;
