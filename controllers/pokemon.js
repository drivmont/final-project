const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;


const getAll = async (req, res) => {
    //#swagger.tags=['Pokemon']
    const result = await mongodb.getDatabase().db().collection('pokemon').find().toArray();
    if (result.length === 0){
          res.status(400).json({ message: "Empty collection" });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    };

const getSingle = (req, res) => {
    //#swagger.tags=['Pokemon']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid pokemon id to find a pokemon.');
    }
    const pokemonId = new ObjectId(req.params.id);
    const result = mongodb.getDatabase().db().collection('pokemon').find({ _id: pokemonId }).toArray();
    if (result.length === 0){
        res.status(400).json({ message: "Empty collection" });
      }
          res.setHeader('Content-Type', 'application/json');
          res.status(200).json(result[0]);
      };

const createPokemon = async (req, res) => {
    //#swagger.tags=['Pokemon']
    const pokemon = {
        color: req.body.color,
        name: req.body.name,
        region: req.body.region,
        size: req.body.size,
        trainer: req.body.trainer,
        type: req.body.type,
        dexNum: req.body.dexNum
        
    };
    const response = await mongodb.getDatabase().db().collection('pokemon').insertOne(pokemon);
    if (response.acknowledged > 0) {
        res.status(204).send();        
    }
    else {
        res.status(500).json(response.error || 'Some error occurred while updating the pokemon.');
    }
};

const updatePokemon = async (req, res) => {
    //#swagger.tags=['Pokemon']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid pokemon id to find a pokemon.');
    }
    const pokemonId = new ObjectId(req.params.id);
    const pokemon = {
        color: req.body.color,
        name: req.body.name,
        region: req.body.region,
        size: req.body.size,
        trainer: req.body.trainer,
        type: req.body.type,
        dexNum: req.body.dexNum
    };
    const response = await mongodb.getDatabase().db().collection('pokemon').replaceOne({ _id: pokemonId}, pokemon);
    if (response.modifiedCount > 0) {
        res.status(204).send();        
    }
    else {
        res.status(500).json(response.error || 'Some error occurred while updating the pokemon.');
    }
};

const deletePokemon = async (req, res) => {
    //#swagger.tags=['Pokemon']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid pokemon id to find a pokemon.');
    }
    const pokemonId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('pokemon').deleteOne({ _id: pokemonId});
    if (response.deletedCount > 0) {
        res.status(204).send();        
    }
    else {
        res.status(500).json(response.error || 'Some error occurred while updating the pokemon.');
    }
};

const getPokemonByTrainer = async (req, res) => {
    //#swagger.tags=['Pokemon']
    const trainerId = req.params.trainerCode;
    const result = await mongodb.getDatabase().db().collection('pokemon').find({ trainer: trainerId }).toArray();
          res.setHeader('Content-Type', 'application/json');
          res.status(200).json(result);
      };

const getDexEntry = async (req, res) => {
    //#swagger.tags=['Pokemon']
    const dex = req.params.dexNum;
    const result = await mongodb.getDatabase().db().collection('pokemon').find({ dexNum: dex }).toArray();
          res.setHeader('Content-Type', 'application/json');
          res.status(200).json(result);
      };

const getPokemonByType = async (req, res) => {
    //#swagger.tags=['Pokemon']
    const typeId = req.params.type;
    const result = await mongodb.getDatabase().db().collection('pokemon').find({ type: typeId }).toArray();
          res.setHeader('Content-Type', 'application/json');
          res.status(200).json(result);
      };

module.exports = {
    getAll,
    getSingle,
    createPokemon,
    updatePokemon,
    deletePokemon,
    getPokemonByTrainer,
    getPokemonByType,
    getDexEntry
}