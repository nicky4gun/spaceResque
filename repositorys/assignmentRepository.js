const mongoose = require('mongoose');
const Assignment = require('../models/assignment');
const Mission = require('../models/mission');
const Ship = require('../models/ship');

const validateId = (id, name) => {
  if (!mongoose.isValidObjectId(id)) {
    throw new Error(`Ugyldigt ID for ${name}`);
  }
};

const assignShip = async (missionId, shipId) => {
  validateId(missionId, 'mission');
  validateId(shipId, 'rumskib');

  const [mission, ship] = await Promise.all([
    Mission.exists({ _id: missionId }),
    Ship.exists({ _id: shipId })
  ]);

  if (!mission) {
    throw new Error('Missionen blev ikke fundet');
  }

  if (!ship) {
    throw new Error('Rumskibet blev ikke fundet');
  }

  try {
    await Assignment.init();
    return await Assignment.create({ mission: missionId, ship: shipId });
  } catch (error) {
    if (error.code === 11000) {
      if (error.keyPattern && error.keyPattern.mission) {
        throw new Error('Missionen har allerede et rumskib tildelt');
      }

      throw new Error('Rumskibet er allerede tildelt en aktiv mission');
    }

    throw error;
  }
};

const getAssignment = async (missionId) => {
  validateId(missionId, 'mission');

  if (!(await Mission.exists({ _id: missionId }))) {
    throw new Error('Missionen blev ikke fundet');
  }

  return Assignment.findOne({ mission: missionId }).populate('mission ship');
};

const completeAssignment = async (missionId) => {
  validateId(missionId, 'mission');

  const assignment = await Assignment.findOneAndUpdate(
    { mission: missionId, status: 'aktiv' },
    { status: 'færdig' },
    { new: true, runValidators: true }
  ).populate('mission ship');

  if (!assignment) {
    throw new Error('Der blev ikke fundet en aktiv tildeling for missionen');
  }

  return assignment;
};

module.exports = {
  assignShip,
  getAssignment,
  completeAssignment
};
