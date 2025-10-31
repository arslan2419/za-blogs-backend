const express = require('express');
const router = express.Router();
const { createData } = require('../controllers/dataController');

router.post('/', createData);

module.exports = router;
