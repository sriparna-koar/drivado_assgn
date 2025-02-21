const Company = require('../models/Company');
const User = require('../models/User');
// exports.createCompany = async (req, res) => {
//   try {
//     const { name, parentCompanyId } = req.body;
//     const company = new Company({ name, parentCompanyId });
//     await company.save();
//     res.status(201).json({ companyId: company._id, hierarchyLevel: company.hierarchyLevel });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };
exports.createCompany = async (req, res) => {
    try {
      const { name, parentCompanyId } = req.body;
      
      const companyData = { name };
      if (parentCompanyId) {
        const parentCompany = await Company.findById(parentCompanyId);
        if (!parentCompany) {
          return res.status(400).json({ error: 'Parent company not found' });
        }
        companyData.parentCompanyId = parentCompanyId;
      }
  
      const company = new Company(companyData);
      await company.save();
      
      res.status(201).json(company);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
// exports.getCompany = async (req, res) => {
//   try {
//     const company = await Company.findById(req.params.companyId)
//       .populate('parentCompanyId')
//       .populate('users');
//     res.status(200).json(company);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };
exports.getCompany = async (req, res) => {
    try {
      const company = await Company.findById(req.params.companyId).populate('parentCompanyId');
  
      if (!company) {
        return res.status(404).json({ error: 'Company not found' });
      }
  
      // Fetch users belonging to this company
      const users = await User.find({ companyId: company._id });
  
      res.status(200).json({ ...company.toObject(), users });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  exports.getAllCompanies = async (req, res) => {
    try {
      const companies = await Company.find({});
      res.status(200).json(companies);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };