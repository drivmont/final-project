const router = require('express').Router();
const passport = require('passport');
router.use('/', require('./swagger'));

/***router.get('/', (req, res) => { 
    //#swagger.tags=['Hello World']
    res.send('Hello World');
});***/

router.use('/pokemon', require('./pokemon'));
router.use('/trainer', require('./trainer'));
router.use('/type', require('./type'));
router.use('/attack', require('./attack'));

/***router.get('/login', passport.authenticate('github'), (req, res) => {});

router.get('/logout', function(req, res, next) {
    req.logout(function(err){
        if (err) { return next(err); }
        res.redirect('/');
    });
});***/
module.exports = router;