const mongoose = require('mongoose');

const { MONGO_DB_URL = 'mongodb://localhost:27017/calories' } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
};

(async () => {
  try {
    await mongoose.connect(MONGO_DB_URL, options);
    console.info('Database connected');
  } catch (error) {
    console.error('Database not connected');
  }
})();
