const Mission = require('../models/mission');
const assignmentRepository = require('./assignmentRepository');

const getAllMissions = () => Mission.find();

const getMission = (missionId) => Mission.findById(missionId);

const createMission = (missionData) => Mission.create(missionData);

const assignShip = (missionId, shipId) =>
  assignmentRepository.assignShip(missionId, shipId);

const getAssignment = (missionId) =>
  assignmentRepository.getAssignment(missionId);

const completeMission = async (missionId) => {
  await assignmentRepository.completeAssignment(missionId);

  return Mission.findByIdAndUpdate(
    missionId,
    { status: 'færdig' },
    { new: true, runValidators: true }
  );
};

module.exports = {
  getAllMissions,
  getMission,
  createMission,
  assignShip,
  getAssignment,
  completeMission
};
