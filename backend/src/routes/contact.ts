import { Router, Request, Response } from "express";
import Contact from "../models/Contact";
import { sendContactEmail } from "../utils/mailer";

const router = Router();

// POST submit contact form
router.post("/", async (req: Request, res: Response) => {
  try {
    const { name, email, phone, company, description } = req.body;

    if (!name || !email || !description) {
      return res.status(400).json({
        success: false,
        error: "Name, email, and project description are required.",
      });
    }

    const contact = new Contact({ name, email, phone, company, description });
    await contact.save();

    // Send email notification (non-blocking)
    sendContactEmail({ name, email, phone, company, description }).catch((err) => {
      console.error("Email send failed (non-fatal):", err);
    });

    return res.status(201).json({
      success: true,
      message: "Your message has been received! We'll get back to you within 24 hours.",
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to submit contact form";
    return res.status(500).json({ success: false, error: message });
  }
});

// GET all contacts (admin)
router.get("/", async (req: Request, res: Response) => {
  try {
    const { status } = req.query;
    const filter: Record<string, unknown> = {};
    if (status) filter.status = status;

    const contacts = await Contact.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, data: contacts });
  } catch (err) {
    res.status(500).json({ success: false, error: "Failed to fetch contacts" });
  }
});

// PATCH update contact status
router.patch("/:id/status", async (req: Request, res: Response) => {
  try {
    const { status } = req.body;
    if (!["new", "in_progress", "done"].includes(status)) {
      return res.status(400).json({ success: false, error: "Invalid status" });
    }

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!contact) {
      return res.status(404).json({ success: false, error: "Contact not found" });
    }
    return res.json({ success: true, data: contact });
  } catch (err) {
    return res.status(500).json({ success: false, error: "Failed to update status" });
  }
});

// DELETE contact
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Contact deleted" });
  } catch (err) {
    res.status(500).json({ success: false, error: "Failed to delete contact" });
  }
});

export default router;
