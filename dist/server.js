"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// server.js or app.js
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors")); // Import CORS middleware
const database_1 = require("./config/database"); // Import the sequelize connection
const article_routes_1 = __importDefault(require("./routes/article.routes"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Enable CORS
const corsOptions = {
    origin: 'http://localhost:3001', // Replace with your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
};
app.use((0, cors_1.default)(corsOptions)); // Use CORS middleware
// Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Serve static files (uploaded articles)
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, '../uploads')));
// Routes
app.use(article_routes_1.default);
// Sync database and start server
database_1.sequelize.sync({ alter: true }) // Ensure DB is in sync with models
    .then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
    .catch((error) => {
    console.error('Error starting the server: ', error);
});
