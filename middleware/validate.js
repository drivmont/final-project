const validator = require('../helpers/validate');

const savePokemon = (req, res, next) => {
  const validationRule = {
    color: 'required|string',
    name: 'required|string',
    region: 'required|string',
    size: 'required|string',
    strength: 'required|string',
    type: 'required|string',
    weakness: 'required|string'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

const saveTrainer = (req, res, next) => {
    const validationRule = {
      badges: 'required|string',
      code: 'required|string',
      name: 'required|string',
      region: 'required|string'
    };
    validator(req.body, validationRule, {}, (err, status) => {
      if (!status) {
        res.status(412).send({
          success: false,
          message: 'Validation failed',
          data: err
        });
      } else {
        next();
      }
    });
  };

const saveType = (req, res, next) => {

}

const saveAttack = (req, res, next) => {

}

module.exports = {
  savePokemon,
  saveTrainer,
  saveType,
  saveAttack
};