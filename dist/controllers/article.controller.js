"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteArticle = exports.updateArticle = exports.getArticleById = exports.getArticles = exports.createArticle = void 0;
const Articles_1 = require("../models/Articles");
const createArticle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { authorName, article, description } = req.body;
        const newArticle = yield Articles_1.Article.create({ authorName, article, description });
        res.status(201).json(newArticle);
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating article', error });
    }
});
exports.createArticle = createArticle;
const getArticles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const articles = yield Articles_1.Article.findAll();
        res.status(200).json(articles);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching articles', error });
    }
});
exports.getArticles = getArticles;
const getArticleById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const article = yield Articles_1.Article.findByPk(id);
        if (article) {
            res.status(200).json(article);
        }
        else {
            res.status(404).json({ message: 'Article not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching article', error });
    }
});
exports.getArticleById = getArticleById;
const updateArticle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { authorName, article, description } = req.body;
        const [updated] = yield Articles_1.Article.update({ authorName, article, description }, { where: { id } });
        if (updated) {
            const updatedArticle = yield Articles_1.Article.findByPk(id);
            res.status(200).json(updatedArticle);
        }
        else {
            res.status(404).json({ message: 'Article not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating article', error });
    }
});
exports.updateArticle = updateArticle;
const deleteArticle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deleted = yield Articles_1.Article.destroy({ where: { id } });
        if (deleted) {
            res.status(204).send();
        }
        else {
            res.status(404).json({ message: 'Article not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting article', error });
    }
});
exports.deleteArticle = deleteArticle;
