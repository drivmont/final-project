const express = require ('express');
const router = express.Router();

const trainerController = require('../controllers/trainer');
const validation = require('../middleware/validate');

const { isAuthenticated } = require("../middleware/authenticate");

router.get('/', trainerController.getAll);

router.get('/:id', trainerController.getSingle);

router.post('/', isAuthenticated,validation.saveTrainer, trainerController.createTrainer);

router.put('/:id', isAuthenticated,validation.saveTrainer, trainerController.updateTrainer);

router.delete('/:id', isAuthenticated,trainerController.deleteTrainer);

router.get('/login', trainerController.trainerLogin);

router.get('/logout', trainerController.trainerLogout);

module.exports = router;