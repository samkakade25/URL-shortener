import mongoose from "mongoose";
import ShortUrl from "./models/ShortUrl.js";
import dotenv from "dotenv";
import express from "express";
import router from "./routes/shortUrl.js";
import { requestCounter } from "./routes/shortUrl.js";

import cors from "cors";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(requestCounter);

mongoose.connect(process.env.MONGODB_URI, {});

app.use("/api", router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
