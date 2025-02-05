import { Router } from "express";
import ShortUrl from "../models/ShortUrl.js";
import { nanoid } from "nanoid";
import dotenv from "dotenv";
import client from "prom-client";
import express from "express";

dotenv.config();

const router = Router();

//create a counter metric
const counter = new client.Counter({
  name: "http_requests_total",
  help: "Total number of HTTP requests",
  labelNames: ["method", "route", "status_code"],
});

export function requestCounter(req, res, next) {
  res.on("finish", () => {
    counter.inc({
      method: req.method,
      route: req.path,
      status_code: res.statusCode,
    });
  });
  next();
}

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

router.get("/v1/test", async (req, res) => {
  try {
    res.send("Hello sameer");
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/v1/metrics", async (req, res) => {
  const metrics = await client.register.metrics();
  res.set("Content-Type", client.register.contentType);
  res.end(metrics);
});

export default router;
