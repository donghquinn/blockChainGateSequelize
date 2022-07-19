import { config } from 'dotenv';
config();

import { Sequelize } from 'sequelize';



// connect to the Database
// export const initSequelize = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, {
//   host: process.env.HOST,
//   port: Number(process.env.PORT),
//   dialect: 'mariadb',
//   logging: console.log
// });

export const initSequelize = new Sequelize('test', 'root', 'samquinn123!', {
  host: '141.164.56.120',
  port: 3306,
  dialect: 'mariadb',
  logging: console.log
});
