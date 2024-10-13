import express from "express";
import {
  getAllSchedules,
  createSchedule,
  updateSchedule,
  getScheduleById,
  deleteSchedule,
} from "../controllers/schedule.controller.js"; // Adjust the path as necessary

const router = express.Router();

// Define routes
router.get("/", getAllSchedules); // GET /api/schedules
router.post("/", createSchedule); // POST /api/schedules
router.put("/:id", updateSchedule); // PUT /api/schedules/:id
router.get("/:id", getScheduleById); // GET /api/schedules/:id
router.delete("/:id", deleteSchedule); // DELETE /api/schedules/:id

export default router;