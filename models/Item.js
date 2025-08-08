const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Computer', 'Laptop', 'Monitor', 'Printer', 'Router', 'Switch', 'Cable', 'Keyboard', 'Mouse', 'Other']
  },
  brand: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  serialNumber: {
    type: String,
    required: true,
    unique: true
  },
  status: {
    type: String,
    enum: ['Available', 'Assigned', 'Under Repair', 'Damaged', 'Disposed'],
    default: 'Available'
  },
  purchaseDate: {
    type: Date,
    required: true
  },
  purchasePrice: {
    type: Number,
    required: true
  },
  warranty: {
    type: Date
  },
  location: {
    type: String,
    default: 'ICT Store'
  },
  description: {
    type: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Item', itemSchema);
