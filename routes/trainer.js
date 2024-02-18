const express = require ('express');
const router = express.Router();
const passport = require('passport');

const trainerController = require('../controllers/trainer');
const validation = require('../middleware/validate');

const { isAuthenticated } = require("../middleware/authenticate");


router.get('/login', passport.authenticate('github'), (req, res) => {});

router.get('/logout', function(req, res, next) {
    req.logout(function(err){
        if (err) { return next(err); }
        res.redirect('/');
    });
});

router.get('/', trainerController.getAll);

router.get('/:id', trainerController.getSingle);

router.post('/', isAuthenticated,validation.saveTrainer, trainerController.createTrainer);

router.put('/:id', isAuthenticated,validation.saveTrainer, trainerController.updateTrainer);

router.delete('/:id', isAuthenticated,trainerController.deleteTrainer);


module.exports = router;