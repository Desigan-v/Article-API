import { Sequelize } from 'sequelize-typescript';
import { Article } from '../models/Articles';

export const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'desigan',
  password: 'Desigan@1506',
  database: 'artic',
  models: [Article],  // Register your models here
});
