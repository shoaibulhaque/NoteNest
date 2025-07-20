import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDb } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";
import path from "path";

/**
 * @file server.js
 * @description Initializes the primary Express application for the MERN-NoteNest backend.
 *
 * This file is responsible for setting up the Express server instance ("app") which handles
 * the incoming HTTP requests, middleware configurations, and API routing. The modular setup
 * facilitates easy testing, maintenance, and further expansion of the server-side functionalities.
 *
 */
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

// middleware
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://127.0.0.1:5173",
    })
  );
}

// middleware
app.use(express.json()); // This middleware will pass the json bodies
app.use(rateLimiter);

app.use("/api/notes", notesRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

/**
 * What is an Endpoint?
 * An endpoint is a combination of URL and HTTP method that
 * lets a client interact with a specific resource.
 */

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log("Server started on PORT:", PORT);
  });
});
