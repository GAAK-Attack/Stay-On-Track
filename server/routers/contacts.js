const express = require('express');
const sotController = require('../controllers/sotController');

const router = express.Router();

router.post('/add',
  sotController.addContact,
  (req, res) => {
    return res.status(200).json(res.locals.newContact);
  }
);

module.exports = router;
