// fCkGdpGdzaZPsaXn
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const companyRoutes = require('./routes/companyRoutes');
const userRoutes = require('./routes/userRoutes');
const searchRoutes = require('./routes/searchRoutes');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api', companyRoutes);
app.use('/api', userRoutes);
app.use('/api', searchRoutes);
app.use('/api', companyRoutes);
// MongoDB Connection
mongoose.connect('mongodb+srv://koarsk03:fCkGdpGdzaZPsaXn@cluster0.lhsf7.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));