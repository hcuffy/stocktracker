const express = require('express');
const router = express.Router();
const stocksController = require('../controllers/stocks');

// router.get('/', (req, res) => {
//   res.render('stocks')
// });

router.get('/stock', stocksController.getStock);
router.get('/', stocksController.updateUser);
router.post('/remove/:id', stocksController.removeStock);
module.exports = router
