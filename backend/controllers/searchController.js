const Company = require('../models/Company');
const User = require('../models/User');

exports.search = async (req, res) => {
  try {
    const query = req.query.query;
    const companies = await Company.find({ name: new RegExp(query, 'i') }).limit(5);
    const users = await User.find({ $or: [{ name: new RegExp(query, 'i') }, { email: new RegExp(query, 'i') }] }).limit(5);
    res.status(200).json([...companies, ...users]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};