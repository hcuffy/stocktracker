const express = require('express');
const router = express.Router();
const stocksController = require('../controllers/stocks');

router.get('/', stocksController.updateUser);
router.get('/stock', stocksController.getStock);
router.post('/remove/:id', stocksController.removeStock);
module.exports = router;
