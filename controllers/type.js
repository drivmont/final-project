const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;


const getAll = async (req, res) => {
    //#swagger.tags=['Type']  
    const result = await mongodb.getDatabase().db().collection('type').find().toArray();
    if (result.length === 0){
          res.status(400).json({ message: "Empty collection" });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
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
        name: req.body.name,
        weakness: req.body.weakness,
        strength: req.body.strength
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
        name: req.body.name,
        weakness: req.body.weakness,
        strength: req.body.strength

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
    const typeId = req.params.type;
    const result = await mongodb.getDatabase().db().collection('type').find({ strength: typeId }).toArray();
          res.setHeader('Content-Type', 'application/json');
          res.status(200).json(result);
      };

const getTypeByStrength = async (req, res) => {
    //#swagger.tags=['Type']
    const typeId = req.params.type;
    const result = await mongodb.getDatabase().db().collection('type').find({ weakness: typeId }).toArray();
          res.setHeader('Content-Type', 'application/json');
          res.status(200).json(result);
      };

const getTypeMatch = async (req, res) => {
    //#swagger.tags=['Type']
    const type1 = req.params.type1;
    const type2 = req.params.type2;
    const result1 = await mongodb.getDatabase().db().collection('type').find({ name: type1 }).toArray();
    const result2 = await mongodb.getDatabase().db().collection('type').find({ name: type2 }).toArray();
    if (result1[0]["weakness"] === result2[0]["name"]){
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(type2);
    }
    if (result2[0]["weakness"] === result1[0]["name"]){
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(type1);
    }
    else {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json("tie");
    }
      };

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