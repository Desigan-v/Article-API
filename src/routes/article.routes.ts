import { Router } from 'express';
import { Article } from '../models/Articles';
import { upload } from '../config/mutler';

const router = Router();

// POST /articles - Create a new article
router.post('/articles', upload.single('articleFile'), async (req, res) => {
  try {
    const { authorName, article, description } = req.body;
    const articleFile = req.file?.path;  // Get uploaded file path

    const newArticle = await Article.create({
      authorName,
      article,
      description,
      articleFile,  // Store the file path in the database
    });

    res.status(201).json(newArticle);
  } catch (error) {
    res.status(500).json({ message: 'Error creating article', error });
  }
});

// GET /articles - Get all articles
router.get('/articles', async (req, res) => {
  try {
    const articles = await Article.findAll();
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching articles', error });
  }
});

// GET /articles/:id - Get a single article by ID
router.get('/articles/:id', async (req, res) => {
  try {
    const article = await Article.findByPk(req.params.id);

    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    res.status(200).json(article);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching article', error });
  }
});

// GET /articles/author/:authorName - Get articles by authorName
router.get('/articles/author/:authorName', async (req, res) => {
  try {
    const articles = await Article.findAll({
      where: { authorName: req.params.authorName },
    });

    if (!articles.length) {
      return res.status(404).json({ message: 'No articles found for this author' });
    }

    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching articles', error });
  }
});

// GET /articles/article/:article - Get articles by article name
router.get('/articles/article/:article', async (req, res) => {
    try {
      const articleName = decodeURIComponent(req.params.article);  // Decode URL-encoded article name
      const articles = await Article.findAll({
        where: { article: articleName },
      });
  
      if (!articles.length) {
        return res.status(404).json({ message: 'No articles found with this name' });
      }
  
      res.status(200).json(articles);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching articles', error });
    }
  });

// PUT /articles/:id - Update an article by ID
router.put('/articles/:id', upload.single('articleFile'), async (req, res) => {
  try {
    const { authorName, article, description } = req.body;
    const articleFile = req.file?.path;  // Get uploaded file path if provided

    const existingArticle = await Article.findByPk(req.params.id);

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

    await existingArticle.save();
    res.status(200).json(existingArticle);
  } catch (error) {
    res.status(500).json({ message: 'Error updating article', error });
  }
});

// DELETE /articles/:id - Delete an article by ID
router.delete('/articles/:id', async (req, res) => {
  try {
    const article = await Article.findByPk(req.params.id);

    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    await article.destroy();
    res.status(200).json({ message: 'Article deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting article', error });
  }
});

export default router;
