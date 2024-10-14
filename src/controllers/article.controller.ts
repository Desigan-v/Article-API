import { Request, Response } from 'express';
import { Article } from '../models/Articles';

export const createArticle = async (req: Request, res: Response) => {
  try {
    const { authorName, article, description } = req.body;
    const newArticle = await Article.create({ authorName, article, description });
    res.status(201).json(newArticle);
  } catch (error) {
    res.status(500).json({ message: 'Error creating article', error });
  }
};

export const getArticles = async (req: Request, res: Response) => {
  try {
    const articles = await Article.findAll();
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching articles', error });
  }
};

export const getArticleById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const article = await Article.findByPk(id);
    if (article) {
      res.status(200).json(article);
    } else {
      res.status(404).json({ message: 'Article not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching article', error });
  }
};

export const updateArticle = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { authorName, article, description } = req.body;
    const [updated] = await Article.update({ authorName, article, description }, { where: { id } });
    if (updated) {
      const updatedArticle = await Article.findByPk(id);
      res.status(200).json(updatedArticle);
    } else {
      res.status(404).json({ message: 'Article not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating article', error });
  }
};

export const deleteArticle = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await Article.destroy({ where: { id } });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Article not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting article', error });
  }
};
