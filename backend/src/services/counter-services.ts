import type { Request, Response } from "express";
import {
  CounterModel,
  deleteProjectById,
  getProjectByUserId,
  updateProjectCountById,
} from "../db/schemas/counter-schemas.ts";
import { Types } from "mongoose";

export const getProjects = async (req: Request, res: Response) => {
  try {
    if (!req.user!.id) {
      throw new Error("no id, please login");
    }
    const projects = await getProjectByUserId(req.user!.id);
    res.json({ projects });
  } catch (err) {
    console.error("THE REAL DATABASE ERROR:", err);
    throw new Error("Error while saving project");
  }
};

export const createProject = async (req: Request, res: Response) => {
  try {
    const { name, rowGoal, stitchGoal } = req.body;
    if (!name) {
      return res.status(400).send("Project name is required");
    }
    const project = await CounterModel.create({
      userId: new Types.ObjectId(req.user!.id),
      name,
      rowGoal: rowGoal ?? 50,
      stitchGoal: stitchGoal ?? 200,
    });
    res.status(201).json({ project });
  } catch (err) {
    console.error("THE REAL DATABASE ERROR:", err);
    throw new Error("Error while saving project");
  }
};
export const deleteProject = async (req: Request, res: Response) => {
  if (!req.user!.id) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  if (!req.params!.id) {
    return res.status(400).json({ error: "Missing Project Id" });
  }
  const id = req.params.id as string;
  const deleted = await deleteProjectById(id, req.user!.id);
  if (!deleted) return res.status(404).json({ error: "Project not found" });

  res.status(200).json({ message: "Deleted" });
};
export const updateProjectCount = async (req: Request, res: Response) => {
  try {
    if (!req.user!.id) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    if (!req.params!.id) {
      return res.status(400).json({ error: "Missing Project Id" });
    }
    const id = req.params.id as string;
    const { row, stitch } = req.body;
    const project = await updateProjectCountById(id, req.user!.id, {
      row,
      stitch,
    });
    if (!project) return res.status(404).json({ error: "Project not found" });
    res.status(200).json({ project });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update project" });
  }
};
