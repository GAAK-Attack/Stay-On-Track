const express = require('express');
const authController = require('../controllers/authController');
const sotController = require('../controllers/sotController');

const router = express.Router();

router.post('/login',
  authController.login,
  sotController.getAllContacts,
  (req, res) => {
    return res.status(200).json(res.locals.response);
  }
);

router.post('/signup',
  sotController.addUser,
  sotController.getAllContacts,
  (req, res) => {
    return res.status(200).json(res.locals.response);
  }
);

module.exports = router;
