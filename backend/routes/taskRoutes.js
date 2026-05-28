const express = require("express");
const { body } = require("express-validator");
const {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  toggleTaskStatus,
} = require("../controllers/taskController");
const { protect } = require("../middleware/auth");

const router = express.Router();

// All task routes are protected
router.use(protect);

router
  .route("/")
  .get(getTasks)
  .post(
    [
      body("title")
        .trim()
        .notEmpty()
        .withMessage("Task title is required")
        .isLength({ min: 3 })
        .withMessage("Title must be at least 3 characters")
        .isLength({ max: 100 })
        .withMessage("Title cannot exceed 100 characters"),
      body("description")
        .optional()
        .trim()
        .isLength({ max: 500 })
        .withMessage("Description cannot exceed 500 characters"),
      body("priority")
        .optional()
        .isIn(["low", "medium", "high"])
        .withMessage("Priority must be low, medium, or high"),
      body("dueDate")
        .optional({ nullable: true, checkFalsy: true })
        .isISO8601()
        .withMessage("Invalid date format"),
    ],
    createTask
  );

router
  .route("/:id")
  .get(getTaskById)
  .put(
    [
      body("title")
        .optional()
        .trim()
        .isLength({ min: 3 })
        .withMessage("Title must be at least 3 characters")
        .isLength({ max: 100 })
        .withMessage("Title cannot exceed 100 characters"),
      body("description")
        .optional()
        .trim()
        .isLength({ max: 500 })
        .withMessage("Description cannot exceed 500 characters"),
      body("status")
        .optional()
        .isIn(["pending", "completed"])
        .withMessage("Status must be pending or completed"),
      body("priority")
        .optional()
        .isIn(["low", "medium", "high"])
        .withMessage("Priority must be low, medium, or high"),
    ],
    updateTask
  )
  .delete(deleteTask);

router.patch("/:id/toggle", toggleTaskStatus);

module.exports = router;
