const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;


const getAll = (req, res) => {
    //#swagger.tags=['Type']  
      const result = mongodb.getDatabase().db().collection('type').find();
      result.toArray().then((err, type) => {
        if (err) {
            res.status(400).json({ message: err });
          }
          res.setHeader('Content-Type', 'application/json');
          res.status(200).json(type);
      });
};

const getSingle = (req, res) => {
    //#swagger.tags=['Type']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid type id to find a type.');
    }
    const typeId = new ObjectId(req.params.id);
    const result = mongodb.getDatabase().db().collection('type').find({ _id: typeId });
    result.toArray().then((err, type) => {
        if (err) {
            res.status(400).json({ message: err });
          }
          res.setHeader('Content-Type', 'application/json');
          res.status(200).json(type[0]);
      });
};

const createType = async (req, res) => {
    //#swagger.tags=['Type']
    const type = {
        color: req.body.color,
        name: req.body.name,
        region: req.body.region,
        size: req.body.size,
        strength: req.body.strength,
        type: req.body.type,
        weakness: req.body.weakness
        
    };
    const response = await mongodb.getDatabase().db().collection('type').insertOne(type);
    if (response.acknowledged > 0) {
        res.status(204).send();        
    }
    else {
        res.status(500).json(response.error || 'Some error occurred while updating the type.');
    }
};

const updateType = async (req, res) => {
    //#swagger.tags=['Type']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid type id to find a type.');
    }
    const typeId = new ObjectId(req.params.id);
    const type = {
        color: req.body.color,
        name: req.body.name,
        region: req.body.region,
        size: req.body.size,
        strength: req.body.strength,
        type: req.body.type,
        weakness: req.body.weakness
    };
    const response = await mongodb.getDatabase().db().collection('type').replaceOne({ _id: typeId}, type);
    if (response.modifiedCount > 0) {
        res.status(204).send();        
    }
    else {
        res.status(500).json(response.error || 'Some error occurred while updating the type.');
    }
};

const deleteType = async (req, res) => {
    //#swagger.tags=['Type']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid type id to find a type.');
    }
    const typeId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('type').deleteOne({ _id: typeId});
    if (response.deletedCount > 0) {
        res.status(204).send();        
    }
    else {
        res.status(500).json(response.error || 'Some error occurred while updating the type.');
    }
};

const getTypeByWeakness = async (req, res) => {
    //#swagger.tags=['Type']
}

const getTypeByStrength = async (req, res) => {
    //#swagger.tags=['Type']
}

const getTypeMatch = async (req, res) => {
    //#swagger.tags=['Type']
}

module.exports = {
    getAll,
    getSingle,
    createType,
    updateType,
    deleteType,
    getTypeByWeakness,
    getTypeByStrength,
    getTypeMatch
}