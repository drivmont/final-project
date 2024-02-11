const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = (req, res) => {
    //#swagger.tags=['Attack']  
      const result = mongodb.getDatabase().db().collection('attack').find();
      result.toArray().then((err, attack) => {
        if (err) {
            res.status(400).json({ message: err });
          }
          res.setHeader('Content-Type', 'application/json');
          res.status(200).json(attack);
      });
};

const getSingle = (req, res) => {
    //#swagger.tags=['Attack']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid attack id to find a attack.');
    }
    const attackId = new ObjectId(req.params.id);
    const result = mongodb.getDatabase().db().collection('attack').find({ _id: attackId });
    result.toArray().then((err, attack) => {
        if (err) {
            res.status(400).json({ message: err });
          }
          res.setHeader('Content-Type', 'application/json');
          res.status(200).json(attack[0]);
      });
};

const createAttack = async (req, res) => {
    //#swagger.tags=['Attack']
    const attack = {
        color: req.body.color,
        name: req.body.name,
        region: req.body.region,
        size: req.body.size,
        strength: req.body.strength,
        type: req.body.type,
        weakness: req.body.weakness
        
    };
    const response = await mongodb.getDatabase().db().collection('attack').insertOne(attack);
    if (response.acknowledged > 0) {
        res.status(204).send();        
    }
    else {
        res.status(500).json(response.error || 'Some error occurred while updating the attack.');
    }
};

const updateAttack = async (req, res) => {
    //#swagger.tags=['Attack']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid attack id to find a attack.');
    }
    const attackId = new ObjectId(req.params.id);
    const attack = {
        color: req.body.color,
        name: req.body.name,
        region: req.body.region,
        size: req.body.size,
        strength: req.body.strength,
        type: req.body.type,
        weakness: req.body.weakness
    };
    const response = await mongodb.getDatabase().db().collection('attack').replaceOne({ _id: attackId}, attack);
    if (response.modifiedCount > 0) {
        res.status(204).send();        
    }
    else {
        res.status(500).json(response.error || 'Some error occurred while updating the attack.');
    }
};

const deleteAttack = async (req, res) => {
    //#swagger.tags=['Attack']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid attack id to find a attack.');
    }
    const attackId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('attack').deleteOne({ _id: attackId});
    if (response.deletedCount > 0) {
        res.status(204).send();        
    }
    else {
        res.status(500).json(response.error || 'Some error occurred while updating the attack.');
    }
};


const getAttackPower = async (req, res) => {
    //#swagger.tags=['Attack']
}

const getAttackUses = async (req, res) => {
    //#swagger.tags=['Attack']
}

module.exports = {
    getAll,
    getSingle,
    createAttack,
    updateAttack,
    deleteAttack,
    getAttackUses,
    getAttackPower
}