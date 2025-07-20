const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connected');
})
.catch((err) => {
  console.error('MongoDB connection error:', err);
});

// Schema for storing input value
const InputValueSchema = new mongoose.Schema({
  value: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const InputValue = mongoose.model('InputValue', InputValueSchema);

module.exports = {
  InputValue,
};
