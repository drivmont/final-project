const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;


const getAll = async (req, res) => {
    //#swagger.tags=['Trainer']
    const result = await mongodb.getDatabase().db().collection('trainer').find().toArray();
    if (result.length === 0){
        res.status(400).json({ message: "Empty collection" });
      }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    };


const getSingle = async (req, res) => {
    //#swagger.tags=['Trainer']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid trainer id to find a trainer.');
    }
    const trainerId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('trainer').find({ _id: trainerId });
    result.toArray().then((err, trainer) => {
        if (err) {
            res.status(400).json({ message: err });
          }
          res.setHeader('Content-Type', 'application/json');
          res.status(200).json(trainer[0]);
      });
};

const createTrainer = async (req, res) => {
    //#swagger.tags=['Trainer']
    const trainer = {
        badges: req.body.badges,
        code: req.body.code,
        name: req.body.name,
        region: req.body.region
    };
    const response = await mongodb.getDatabase().db().collection('trainer').insertOne(trainer);
    if (response.acknowledged > 0) {
        res.status(204).send();        
    }
    else {
        res.status(500).json(response.error || 'Some error occurred while updating the trainer.');
    }
};

const updateTrainer = async (req, res) => {
    //#swagger.tags=['Trainer']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid trainer id to find a trainer.');
    }
    const trainerId = new ObjectId(req.params.id);
    const trainer = {
        badges: req.body.badges,
        code: req.body.code,
        name: req.body.name,
        region: req.body.region
    };
    const response = await mongodb.getDatabase().db().collection('trainer').replaceOne({ _id: trainerId}, trainer);
    if (response.modifiedCount > 0) {
        res.status(204).send();        
    }
    else {
        res.status(500).json(response.error || 'Some error occurred while updating the trainer.');
    }
};

const deleteTrainer = async (req, res) => {
    //#swagger.tags=['Trainer']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid trainer id to find a trainer.');
    }
    const trainerId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('trainer').deleteOne({ _id: trainerId});
    if (response.deletedCount > 0) {
        res.status(204).send();        
    }
    else {
        res.status(500).json(response.error || 'Some error occurred while updating the trainer.');
    }
};

module.exports = {
    getAll,
    getSingle,
    createTrainer,
    updateTrainer,
    deleteTrainer
}