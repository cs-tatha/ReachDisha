require('dotenv').config();
const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const questionRoutes = require('./routes/questionRoutes');
const assessmentRoutes = require('./routes/assessmentRoutes');
const errorHandler = require('./middleware/errorHandler');
const { sendError } = require('./utils/response');

const app = express();

// 1. Cross-Origin Resource Sharing (CORS) Middleware
app.use(
  cors({
    origin: true, // Allow frontend requests (localhost:5173, etc.)
    credentials: true,
  })
);

// 2. Body Parser Middleware (with generous limit for base64 avatars)
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// 3. Health Check Route
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'online',
    service: 'Psychometric Testing Backend API',
    database: 'MySQL via Prisma ORM',
    timestamp: new Date().toISOString(),
  });
});

// 4. Mount API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/assessment', assessmentRoutes);

// 5. 404 Fallback for Undefined Endpoints
app.use((req, res) => {
  return sendError(res, 404, `Endpoint not found: ${req.method} ${req.originalUrl}`);
});

// 6. Centralized Error Handling Middleware
app.use(errorHandler);

module.exports = app;
