import { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";

const router = Router();

router.post("/login", (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, error: "Email and password are required." });
  }

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (email !== adminEmail || password !== adminPassword) {
    return res.status(401).json({ success: false, error: "Invalid credentials." });
  }

  const secret = process.env.JWT_SECRET || "fallback_secret";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const token = jwt.sign({ email, role: "admin" }, secret, { expiresIn: "7d" } as any);

  return res.json({ success: true, token });
});

export default router;
