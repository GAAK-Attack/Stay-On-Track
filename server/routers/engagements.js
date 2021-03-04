const express = require('express');
const sotController = require('../controllers/sotController');

const router = express.Router();

router.post('/add',
  sotController.addEngagement,
  (req, res) => {
    return res.status(200).json(res.locals.newEngagement);
  }
);

module.exports = router;
