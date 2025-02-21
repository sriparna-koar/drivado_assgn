const User = require('../models/User');
const Company = require('../models/Company');
// exports.createUser = async (req, res) => {
//   try {
//     const { name, email, companyId } = req.body;
//     const user = new User({ name, email, companyId });
//     await user.save();
//     res.status(201).json({ userId: user._id, companyId: user.companyId, role: user.role });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };
exports.createUser = async (req, res) => {
    try {
      const { name, email, companyId ,role } = req.body;
  
      // Validate companyId exists
      const company = await Company.findById(companyId);
      if (!company) {
        return res.status(400).json({ error: 'Company not found' });
      }
  
      const user = new User({ name, email, companyId, role });
      await user.save();
      
      res.status(201).json({ 
        userId: user._id, 
        name: user.name,
        email: user.email,
        companyId: user.companyId, 
        role: user.role 
      });
    } catch (err) {
      if (err.code === 11000) {
        res.status(400).json({ error: 'Email already exists' });
      } else {
        res.status(500).json({ error: err.message });
      }
    }
  };
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate('companyId');
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};