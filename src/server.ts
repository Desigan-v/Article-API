import express from 'express';
import cors from 'cors';
import { sequelize } from './config/database';
import articleRoutes from './routes/article.routes';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS
const corsOptions = {
  origin: 'http://localhost:3001',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
};

app.use(cors(corsOptions));  // Use CORS middleware

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (uploaded articles)
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
app.use(articleRoutes);

// Sync database and start server
sequelize.sync({ alter: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error starting the server: ', error);
  });
