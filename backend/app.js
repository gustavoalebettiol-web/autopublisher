const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./database/connection');
const authRoutes = require('./routes/auth');
const postsRoutes = require('./routes/posts');
const whatsappRoutes = require('./routes/whatsapp');
const deepseekRoutes = require('./routes/deepseek');
const scheduler = require('./jobs/scheduler');

dotenv.config();
// Asegurar secret por defecto en desarrollo
process.env.JWT_SECRET = process.env.JWT_SECRET || 'devsecret';

const app = express();
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

// Security middlewares
app.use(helmet());

// CORS: limitar origen permitidos (por defecto al dev server en localhost:3000)
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || 'http://localhost:3000';
app.use(cors({ origin: FRONTEND_ORIGIN }));
app.use(express.json());

// Rate limiter básico
const limiter = rateLimit({ windowMs: 60 * 1000, max: 120 }); // 120 req/min por IP
app.use(limiter);

app.use('/api/auth', authRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/whatsapp', whatsappRoutes);
app.use('/api/deepseek', deepseekRoutes);

// Exportar app y helpers para testing
module.exports = { app, connectDB, scheduler };
