console.log('🚀 Starting server...');

const express = require('express');
console.log('✅ Express loaded');

const mongoose = require('mongoose');
console.log('✅ Mongoose loaded');

const cors = require('cors');
console.log('✅ CORS loaded');

require('dotenv').config();
console.log('✅ Dotenv loaded');

const app = express();
console.log('✅ Express app created');

// Middleware
app.use(cors());
app.use(express.json());
console.log('✅ Middleware configured');

// Routes
console.log('🔗 Loading routes...');
app.use('/api/auth', require('./routes/auth'));
console.log('✅ Auth routes loaded');
app.use('/api/items', require('./routes/items'));
console.log('✅ Items routes loaded');

// Simple test route
app.get('/', (req, res) => {
  console.log('📥 Root route accessed');
  res.json({ message: 'ICT Inventory System Backend is running!' });
});

// Connect to MongoDB
console.log('🔌 Connecting to MongoDB...');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ict_inventory')
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => {
    console.log('❌ MongoDB connection error:', err);
    process.exit(1);
  });

const PORT = process.env.PORT || 5000;
console.log(`🚀 Starting server on port ${PORT}...`);

app.listen(PORT, () => {
  console.log(`🎉 Server successfully running on port ${PORT}`);
  console.log(`🌐 Visit: http://localhost:${PORT}`);
});

console.log('📝 Server setup complete');
