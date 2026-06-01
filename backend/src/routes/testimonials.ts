import { Router, Request, Response } from "express";
import Testimonial from "../models/Testimonial";

const router = Router();

// GET all testimonials
router.get("/", async (_req: Request, res: Response) => {
  try {
    const testimonials = await Testimonial.find({ isActive: true }).sort({ order: 1, createdAt: -1 });
    res.json({ success: true, data: testimonials });
  } catch (err) {
    res.status(500).json({ success: false, error: "Failed to fetch testimonials" });
  }
});

// POST create testimonial
router.post("/", async (req: Request, res: Response) => {
  try {
    const testimonial = new Testimonial(req.body);
    await testimonial.save();
    res.status(201).json({ success: true, data: testimonial });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to create testimonial";
    res.status(400).json({ success: false, error: message });
  }
});

// PUT update testimonial
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!testimonial) {
      return res.status(404).json({ success: false, error: "Testimonial not found" });
    }
    return res.json({ success: true, data: testimonial });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to update testimonial";
    return res.status(400).json({ success: false, error: message });
  }
});

// DELETE testimonial
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );
    if (!testimonial) {
      return res.status(404).json({ success: false, error: "Testimonial not found" });
    }
    return res.json({ success: true, message: "Testimonial removed" });
  } catch (err) {
    return res.status(500).json({ success: false, error: "Failed to delete testimonial" });
  }
});

export default router;
