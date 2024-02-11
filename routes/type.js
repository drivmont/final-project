const express = require ('express');
const router = express.Router();

const typeController = require('../controllers/type');
const validation = require('../middleware/validate');

const { isAuthenticated } = require("../middleware/authenticate");

router.get('/', typeController.getAll);

router.get('/:id', typeController.getSingle);

router.post('/', isAuthenticated,validation.saveType, typeController.createType);

router.put('/:id', isAuthenticated,validation.saveType, typeController.updateType);

router.delete('/:id', isAuthenticated,typeController.deleteType);

router.get('/findByWeakness/:id', typeController.getTypeByWeakness);

router.get('/findByStrength/:id', typeController.getTypeByStrength);

router.get('/findMatch/:type1&:type2', typeController.getTypeMatch);

module.exports = router;