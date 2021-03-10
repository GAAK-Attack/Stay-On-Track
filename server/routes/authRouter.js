const express = require('express');
const router = express.Router();

const userController = require('../controller/userController');
////////////// /api/user/
/**
 * Get all cards that are visible to current user
 */
router.get('/cards', userController.getUserCards, (_, res) => {
  res.json(res.locals.cards);
});

/**
 * Get all groups current user is a member of.
 */
router.get('/groups', userController.getGroups, (req, res) => {
  res.json({
    username: req.user.username,
    userGroups: res.locals.userGroups,
  });
});

// router.put('/user')

module.exports = router;
