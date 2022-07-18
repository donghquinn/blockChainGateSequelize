import { Sequelize } from 'sequelize';
import { config } from 'dotenv';
config();

// connect to the Database
export const initSequelize = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, {
  host: process.env.HOST,
  port: Number(process.env.PORT),
  dialect: 'mariadb',
  logging: console.log
});
