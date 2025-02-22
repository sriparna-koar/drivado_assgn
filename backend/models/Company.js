
const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
  name: { type: String, required: true },
  parentCompanyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', default: null },
  hierarchyLevel: { type: Number, default: 0 },
});

CompanySchema.pre('save', async function(next) {
  try {
    if (this.parentCompanyId) {
      const parentCompany = await this.constructor.findById(this.parentCompanyId);
      if (!parentCompany) {
        throw new Error('Parent company not found');
      }
      this.hierarchyLevel = parentCompany.hierarchyLevel + 1;
    } else {
      this.hierarchyLevel = 0;
    }
    next();
  } catch (error) {
    next(error);
  }
});
module.exports = mongoose.model('Company', CompanySchema);