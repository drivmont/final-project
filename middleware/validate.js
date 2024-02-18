const validator = require('../helpers/validate');

const savePokemon = (req, res, next) => {
  const validationRule = {
    color: 'required|string',
    name: 'required|string',
    region: 'required|string',
    size: 'required|string',
    trainer: 'required|string',
    type: 'required|string',
    dexNum: 'required|string'
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
  const validationRule = {
    name: 'required|string',
    weakness: 'required|string',
    strength: 'required|string'
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

}

const saveAttack = (req, res, next) => {
  const validationRule = {
    type: 'required|string',
    name: 'required|string',
    uses: 'required|string',
    power: 'required|string'
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

}

module.exports = {
  savePokemon,
  saveTrainer,
  saveType,
  saveAttack
};