import { Router } from "express";
import ShortUrl from "../models/ShortUrl.js";
import { nanoid } from "nanoid";
import dotenv from "dotenv";

dotenv.config();

const router = Router();

// Create a short URL (anonymous)
router.post("/shorten", async (req, res) => {
  try {
    const { originalUrl } = req.body;
    const shortCode = nanoid(7);
    const shortUrl = new ShortUrl({ originalUrl, shortCode });
    await shortUrl.save();
    res.json({ shortUrl: `${process.env.BASE_URL}/${shortCode}` });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Redirect to original URL
router.get("/:shortCode", async (req, res) => {
  try {
    const { shortCode } = req.params;
    const shortUrl = await ShortUrl.findOne({ shortCode });
    if (!shortUrl) {
      return res.status(404).json({ error: "URL not found" });
    }
    res.redirect(shortUrl.originalUrl);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
