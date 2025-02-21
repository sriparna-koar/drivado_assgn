const express = require('express');
const companyController = require('../controllers/companyController');

const router = express.Router();

router.post('/companies', companyController.createCompany);
router.get('/companies/:companyId', companyController.getCompany);
router.get('/companies', companyController.getAllCompanies);
module.exports = router;