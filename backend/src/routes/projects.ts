import { Router, Request, Response } from "express";
import Project from "../models/Project";

const router = Router();

// GET all projects (with optional category filter)
router.get("/", async (req: Request, res: Response) => {
  try {
    const { category, featured } = req.query;
    const filter: Record<string, unknown> = { isActive: true };

    if (category && category !== "All") filter.category = category;
    if (featured === "true") filter.featured = true;

    const projects = await Project.find(filter).sort({ featured: -1, order: 1, createdAt: -1 });
    res.json({ success: true, data: projects });
  } catch (err) {
    res.status(500).json({ success: false, error: "Failed to fetch projects" });
  }
});

// GET single project
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, error: "Project not found" });
    }
    return res.json({ success: true, data: project });
  } catch (err) {
    return res.status(500).json({ success: false, error: "Failed to fetch project" });
  }
});

// POST create project
router.post("/", async (req: Request, res: Response) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json({ success: true, data: project });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to create project";
    res.status(400).json({ success: false, error: message });
  }
});

// PUT update project
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!project) {
      return res.status(404).json({ success: false, error: "Project not found" });
    }
    return res.json({ success: true, data: project });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to update project";
    return res.status(400).json({ success: false, error: message });
  }
});

// DELETE project (soft delete)
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );
    if (!project) {
      return res.status(404).json({ success: false, error: "Project not found" });
    }
    return res.json({ success: true, message: "Project removed" });
  } catch (err) {
    return res.status(500).json({ success: false, error: "Failed to delete project" });
  }
});

export default router;
