const express = require ('express');
const router = express.Router();

const attackController = require('../controllers/attack');
const validation = require('../middleware/validate');

const { isAuthenticated } = require("../middleware/authenticate");

router.get('/', attackController.getAll);

router.get('/:id', attackController.getSingle);

router.post('/', isAuthenticated,validation.saveAttack, attackController.createAttack);

router.put('/:id', isAuthenticated,validation.saveAttack, attackController.updateAttack);

router.delete('/:id', isAuthenticated,attackController.deleteAttack);

router.get('/power/:id', attackController.getAttackPower);

router.get('/uses/:id', attackController.getAttackUses);

module.exports = router;