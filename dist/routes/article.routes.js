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
const express_1 = require("express");
const Articles_1 = require("../models/Articles");
const mutler_1 = require("../config/mutler");
const router = (0, express_1.Router)();
// POST /articles - Create a new article
router.post('/articles', mutler_1.upload.single('articleFile'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { authorName, article, description } = req.body;
        const articleFile = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path; // Get uploaded file path
        const newArticle = yield Articles_1.Article.create({
            authorName,
            article,
            description,
            articleFile, // Store the file path in the database
        });
        res.status(201).json(newArticle);
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating article', error });
    }
}));
// GET /articles - Get all articles
router.get('/articles', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const articles = yield Articles_1.Article.findAll();
        res.status(200).json(articles);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching articles', error });
    }
}));
// GET /articles/:id - Get a single article by ID
router.get('/articles/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const article = yield Articles_1.Article.findByPk(req.params.id);
        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }
        res.status(200).json(article);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching article', error });
    }
}));
// GET /articles/author/:authorName - Get articles by authorName
router.get('/articles/author/:authorName', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const articles = yield Articles_1.Article.findAll({
            where: { authorName: req.params.authorName },
        });
        if (!articles.length) {
            return res.status(404).json({ message: 'No articles found for this author' });
        }
        res.status(200).json(articles);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching articles', error });
    }
}));
// GET /articles/article/:article - Get articles by article name
router.get('/articles/article/:article', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const articleName = decodeURIComponent(req.params.article); // Decode URL-encoded article name
        const articles = yield Articles_1.Article.findAll({
            where: { article: articleName },
        });
        if (!articles.length) {
            return res.status(404).json({ message: 'No articles found with this name' });
        }
        res.status(200).json(articles);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching articles', error });
    }
}));
// PUT /articles/:id - Update an article by ID
router.put('/articles/:id', mutler_1.upload.single('articleFile'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { authorName, article, description } = req.body;
        const articleFile = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path; // Get uploaded file path if provided
        const existingArticle = yield Articles_1.Article.findByPk(req.params.id);
        if (!existingArticle) {
            return res.status(404).json({ message: 'Article not found' });
        }
        // Update only the fields that were provided
        existingArticle.authorName = authorName || existingArticle.authorName;
        existingArticle.article = article || existingArticle.article;
        existingArticle.description = description || existingArticle.description;
        if (articleFile) {
            existingArticle.articleFile = articleFile;
        }
        yield existingArticle.save();
        res.status(200).json(existingArticle);
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating article', error });
    }
}));
// DELETE /articles/:id - Delete an article by ID
router.delete('/articles/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const article = yield Articles_1.Article.findByPk(req.params.id);
        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }
        yield article.destroy();
        res.status(200).json({ message: 'Article deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting article', error });
    }
}));
exports.default = router;
