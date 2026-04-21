import { authenticateToken } from "../middleware/auth-token.ts";
import {
  getProjects,
  createProject,
  updateProjectCount,
  deleteProject,
} from "../services/counter-services.ts";
import { Router } from "express";

const router = Router();
router.get("/api/counter", authenticateToken, getProjects);
router.post("/api/counter", authenticateToken, createProject);
router.patch("/api/counter/:id/count", authenticateToken, updateProjectCount);
router.delete("/api/counter/:id", authenticateToken, deleteProject);

export default router;
