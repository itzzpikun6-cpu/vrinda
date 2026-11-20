import { Router } from "express";
import ProposalResponse from "../models/ProposalResponse.js";

const router = Router();

router.post("/", async (req, res, next) => {
  try {
    const response = String(req.body?.response || "").toLowerCase();
    const message = typeof req.body?.message === "string" ? req.body.message.trim() : "";

    if (!["yes", "no"].includes(response)) {
      return res.status(400).json({ error: "Response must be 'yes' or 'no'." });
    }
    if (message.length > 500) {
      return res.status(400).json({ error: "Message must be 500 characters or fewer." });
    }

    const saved = await ProposalResponse.create({ response, message });
    return res.status(201).json({
      success: true,
      response: {
        id: saved._id,
        answer: saved.response,
        message: saved.message,
        createdAt: saved.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
});

export default router;
