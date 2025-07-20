/**
 * @module notesRoutes
 * @description Defines the routes for handling note-related operations.
 * @requires express
 *
 * @summary This module sets up the routing for note endpoints, connecting them to the appropriate controller functions.
 *          It uses the Express Router to define routes for fetching, creating, updating, and deleting notes.
 *          The base path for these routes is defined in the main server file (server.js).
 *
 * @example
 * // Example of how these routes might be used in server.js:
 * // app.use('/api/notes', notesRoutes);
 */
import express from "express";
import {
  createNote,
  deleteNote,
  getAllNotes,
  updateNote,
  getNoteById,
} from "../controllers/notesController.js";

const router = express.Router();

// The prefix for these methods is in the server.js
router.get("/", getAllNotes);

router.get("/:id", getNoteById);

router.post("/", createNote);

router.put("/:id", updateNote);

router.delete("/:id", deleteNote);

export default router;
