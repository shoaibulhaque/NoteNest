import React from "react";
import { Link } from "react-router";
import { formatDate, truncateContent } from "../lib/utils";

const NoteCard = ({ note, onDelete }) => {
  const handleEdit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Navigate to edit page
    window.location.href = `/note/${note._id}`;
  };

  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this note?")) {
      onDelete(note._id);
    }
  };

  return (
    <div className="card bg-slate-800/60 backdrop-blur-sm shadow-2xl border border-slate-700/50 hover:border-purple-500/50 hover:shadow-purple-500/10 transition-all duration-300 hover:scale-105">
      <div className="card-body p-6">
        <h2 className="card-title text-lg font-semibold line-clamp-2 text-white mb-3">
          {note.title}
        </h2>
        <p className="text-slate-300 text-sm line-clamp-3 mb-4">
          {truncateContent(note.content)}
        </p>
        <div className="card-actions justify-between items-center mt-auto">
          <div className="text-xs text-slate-400">
            {formatDate(note.createdAt)}
          </div>
          <div className="flex gap-2">
            {/* Edit Button */}
            <button
              onClick={handleEdit}
              className="btn btn-xs bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border-blue-500/30 text-blue-300 hover:from-blue-500/40 hover:to-cyan-500/40 hover:border-blue-400/50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              Edit
            </button>

            {/* Delete Button */}
            <button
              onClick={handleDelete}
              className="btn btn-xs bg-gradient-to-r from-red-500/20 to-pink-500/20 border-red-500/30 text-red-300 hover:from-red-500/40 hover:to-pink-500/40 hover:border-red-400/50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
