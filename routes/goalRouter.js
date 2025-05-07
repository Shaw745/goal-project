const router = require("express").Router();
const {
  createGoal,
  getAllGoals, 
  getOngoingGoals,
  getCompletedGoals,
  getSingleGoal,
  updateGoal,
  deleteGoal, 
} = require("../controllers/goalController");

router.post("/", createGoal); // Create a new goal
router.get("/", getAllGoals); // Get all goals
router.get("/ongoing", getOngoingGoals); // Get ongoing goals
router.get("/completed", getCompletedGoals); // Get completed goals
router.get("/:goalid", getSingleGoal); // Get a single goal by ID
router.patch("/:goalid", updateGoal); // Update a goal by ID (alternative method)
router.delete("/:goalid", deleteGoal); // Delete a goal by ID

module.exports = router;
// Define routes for goal-related operations
