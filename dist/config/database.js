"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Articles_1 = require("../models/Articles");
exports.sequelize = new sequelize_typescript_1.Sequelize({
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'desigan',
    password: 'Desigan@1506',
    database: 'artic',
    models: [Articles_1.Article], // Register your models here
});
