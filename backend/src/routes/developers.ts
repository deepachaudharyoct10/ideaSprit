import { Router, Request, Response } from "express";
import Developer from "../models/Developer";

const router = Router();

// GET all developers
router.get("/", async (_req: Request, res: Response) => {
  try {
    const developers = await Developer.find({ isActive: true }).sort({ order: 1, createdAt: -1 });
    res.json({ success: true, data: developers });
  } catch (err) {
    res.status(500).json({ success: false, error: "Failed to fetch developers" });
  }
});

// GET single developer
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const developer = await Developer.findById(req.params.id);
    if (!developer) {
      return res.status(404).json({ success: false, error: "Developer not found" });
    }
    return res.json({ success: true, data: developer });
  } catch (err) {
    return res.status(500).json({ success: false, error: "Failed to fetch developer" });
  }
});

// POST create developer
router.post("/", async (req: Request, res: Response) => {
  try {
    const developer = new Developer(req.body);
    await developer.save();
    res.status(201).json({ success: true, data: developer });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to create developer";
    res.status(400).json({ success: false, error: message });
  }
});

// PUT update developer
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const developer = await Developer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!developer) {
      return res.status(404).json({ success: false, error: "Developer not found" });
    }
    return res.json({ success: true, data: developer });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to update developer";
    return res.status(400).json({ success: false, error: message });
  }
});

// DELETE developer
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const developer = await Developer.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );
    if (!developer) {
      return res.status(404).json({ success: false, error: "Developer not found" });
    }
    return res.json({ success: true, message: "Developer removed" });
  } catch (err) {
    return res.status(500).json({ success: false, error: "Failed to delete developer" });
  }
});

export default router;
