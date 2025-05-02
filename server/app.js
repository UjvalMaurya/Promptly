const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const generatorRoutes = require('./routes/generatorRoutes');

dotenv.config();

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/generator', generatorRoutes);

PORT=process.env.PORT||5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
