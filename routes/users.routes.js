const express = require('express');
const router = express.Router();
const Role = require('../utils/roles');
const authorize = require('../utils/authorize');

const usersController = require('../controllers/users.controller');

router.post('/signup', usersController.signup);
router.post('/authenticate', usersController.authenticate);
router.post('/', authorize(Role.Admin), usersController.save);
router.get('/', authorize(Role.Admin), usersController.getAll);

module.exports = router;
