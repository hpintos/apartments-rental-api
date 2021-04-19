const express = require('express');
const router = express.Router();
const Role = require('../utils/roles');
const authorize = require('../utils/authorize');

const apartmentsController = require('../controllers/apartments.controller');

router.get('/:id', authorize(), apartmentsController.get);
router.get('/', authorize(), apartmentsController.getAll);
router.put('/update/:id', authorize(Role.Admin, Role.Realtor), apartmentsController.update);
router.delete('/delete/:id', authorize(Role.Admin, Role.Realtor), apartmentsController.remove);
router.post('/', authorize(Role.Admin, Role.Realtor), apartmentsController.save);

module.exports = router;
