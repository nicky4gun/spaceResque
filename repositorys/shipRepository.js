const Ship = require('../models/ship');

const getAllShips = () => Ship.find();

const getShip = (shipId) => Ship.findById(shipId);

const createShip = (shipData) => Ship.create(shipData);

module.exports = {
  getAllShips,
  getShip,
  createShip
};
