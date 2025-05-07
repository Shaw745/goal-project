const Goal = require("../models/goal");

const createGoal = async (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return res.status(400).json({
      message: "Please provide all required fields!",
    });
  }
  try {
    const goal = await Goal.create(req.body);
    return res.status(201).json({
      success: true,
      goal,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: error.message,
    });
  }
};

const getAllGoals = async (req, res) => {
  const goals = await Goal.find().sort("-createdAt");
  res.status(200).json({
    success: true,
    num: goals.length,
    goals,
  });
};

const getOngoingGoals = async (req, res) => {
  const goals = await Goal.find({ progress: { $lt: 100 } }).sort("-createdAt");
  res.status(200).json({
    success: true,
    num: goals.length,
    goals,
  });
};

const getCompletedGoals = async (req, res) => {
  const goals = await Goal.find({ progress: { $eq: 100 } }).sort("-createdAt");
  res.status(200).json({
    success: true,
    num: goals.length,
    goals,
  });
};

const getSingleGoal = async (req, res) => {
  const { goalid } = req.params;
  const goal = await Goal.findById(goalid);
  res.status(200).json({
    success: true,
    goal,
  });
};
const updateGoal = async (req, res) => {
  const {goalid} = req.params;
  try {
    const goal = await Goal.findByIdAndUpdate(goalid , req.body, {
      runValidators: true,
      new: true,
    });
    return res.status(200).json({ success: true, goal });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: error.message,
    });
  }
};

const deleteGoal = async (req, res) => {
  const { goalid } = req.params;
  await Goal.findByIdAndDelete(goalid);
  res.status(200).json({
    success: true,
    message: "Goal deleted successfully!",
  });
};

module.exports = {
  createGoal,
  getAllGoals,
  getOngoingGoals,
  getCompletedGoals,
  getSingleGoal,
  updateGoal,
  deleteGoal,
};
