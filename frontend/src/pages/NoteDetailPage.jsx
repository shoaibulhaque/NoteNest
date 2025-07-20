import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import RateLimitedUI from "../components/RateLimitedUI";
import { formatDate } from "../lib/utils";
import api from "../lib/axios.js";
import toast from "react-hot-toast";

const NoteDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedContent, setEditedContent] = useState("");
  const [saving, setSaving] = useState(false);
  const [rateLimited, setRateLimited] = useState(false);

  // Fetch note data
  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
        setEditedTitle(res.data.title);
        setEditedContent(res.data.content);
        setRateLimited(false);
      } catch (error) {
        console.error("Error fetching note:", error);
        if (error.response && error.response.status === 429) {
          setRateLimited(true);
        } else {
          toast.error("Failed to load note");
          navigate("/notes");
        }
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchNote();
    }
  }, [id, navigate]);

  // Sync edited values when note changes
  useEffect(() => {
    if (note && !isEditing) {
      setEditedTitle(note.title);
      setEditedContent(note.content);
    }
  }, [note, isEditing]);

  // Handle note deletion
  const handleDelete = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete this note? This action cannot be undone."
      )
    ) {
      try {
        await api.delete(`/notes/${id}`);
        toast.success("Note deleted successfully");
        navigate("/notes");
      } catch (error) {
        console.error("Error deleting note:", error);
        if (error.response && error.response.status === 429) {
          setRateLimited(true);
        } else {
          toast.error("Failed to delete note");
        }
      }
    }
  };

  // Handle save changes
  const handleSave = async () => {
    if (!editedTitle.trim() || !editedContent.trim()) {
      toast.error("Title and content cannot be empty");
      return;
    }

    setSaving(true);
    try {
      const res = await api.put(`/notes/${id}`, {
        title: editedTitle,
        content: editedContent,
      });

      console.log("API Response:", res.data);
      console.log("Current note state:", note);

      // Update the local note state by merging with existing data
      const updatedNote = {
        ...note, // Keep existing data (like createdAt, _id, etc.)
        ...res.data, // Merge with updated data from response
        title: editedTitle, // Ensure we use the current edited values
        content: editedContent,
        updatedAt: res.data.updatedAt || new Date().toISOString(), // Ensure updatedAt is set
      };

      console.log("Updated note:", updatedNote);

      setNote(updatedNote);
      setIsEditing(false);
      toast.success("Note updated successfully");
    } catch (error) {
      console.error("Error updating note:", error);
      if (error.response && error.response.status === 429) {
        setRateLimited(true);
      } else {
        toast.error("Failed to update note");
      }
    } finally {
      setSaving(false);
    }
  };

  // Handle cancel editing
  const handleCancelEdit = () => {
    setEditedTitle(note.title);
    setEditedContent(note.content);
    setIsEditing(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-purple-400"></span>
      </div>
    );
  }

  if (!note) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Note not found</h2>
          <Link
            to="/notes"
            className="btn bg-gradient-to-r from-purple-500 to-pink-500 text-white"
          >
            Back to Notes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {rateLimited && <RateLimitedUI />}

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-slate-900/40 to-slate-900"></div>
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-4000"></div>

        <Navbar />

        <div className="container mx-auto px-4 lg:px-8 xl:px-12 py-8 relative z-10 max-w-5xl">
          {/* Header Section with Delete Button */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 lg:mb-12">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <Link
                  to="/notes"
                  className="btn btn-outline border-slate-600 text-slate-300 hover:bg-slate-800 hover:border-slate-500 hover:text-white btn-sm gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                  Back to Notes
                </Link>

                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="btn btn-outline border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white btn-sm gap-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
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
                    Edit Note
                  </button>
                )}
              </div>

              <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-2">
                {isEditing ? "Edit Note" : "Note Details"}
              </h1>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-slate-400">
                <span>Created: {formatDate(note.createdAt)}</span>
                {note.updatedAt !== note.createdAt && (
                  <>
                    <span className="hidden sm:inline">•</span>
                    <span>Updated: {formatDate(note.updatedAt)}</span>
                  </>
                )}
              </div>
            </div>

            {/* Delete Button */}
            <button
              onClick={handleDelete}
              className="btn bg-gradient-to-r from-red-500 to-pink-500 text-white hover:from-red-600 hover:to-pink-600 border-none gap-2 mt-4 md:mt-0 shadow-lg btn-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
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
              Delete Note
            </button>
          </div>

          {/* Note Content */}
          <div className="card bg-slate-800/60 backdrop-blur-md shadow-2xl border border-slate-700/50 mb-8">
            <div className="card-body p-8">
              {isEditing ? (
                <>
                  {/* Edit Mode */}
                  <div className="form-control mb-6">
                    <label className="label">
                      <span className="label-text text-slate-300 text-lg font-medium">
                        Note Title
                      </span>
                    </label>
                    <input
                      type="text"
                      className="input input-lg bg-slate-900/60 border-slate-600 text-white placeholder-slate-400 focus:border-purple-500 focus:bg-slate-900/80 transition-all duration-200"
                      value={editedTitle}
                      onChange={(e) => setEditedTitle(e.target.value)}
                      placeholder="Enter note title..."
                    />
                  </div>

                  <div className="form-control mb-6">
                    <label className="label">
                      <span className="label-text text-slate-300 text-lg font-medium">
                        Note Content
                      </span>
                    </label>
                    <textarea
                      className="textarea textarea-lg bg-slate-900/60 border-slate-600 text-white placeholder-slate-400 focus:border-purple-500 focus:bg-slate-900/80 transition-all duration-200 min-h-[400px] resize-none"
                      value={editedContent}
                      onChange={(e) => setEditedContent(e.target.value)}
                      placeholder="Write your note content..."
                    ></textarea>
                  </div>

                  {/* Character Count */}
                  <div className="flex justify-between items-center mb-6">
                    <div className="text-sm text-slate-400">
                      Characters:{" "}
                      <span className="text-purple-300">
                        {editedContent.length}
                      </span>
                    </div>
                    <div className="text-sm text-slate-400">
                      Words:{" "}
                      <span className="text-purple-300">
                        {editedContent.trim()
                          ? editedContent.trim().split(/\s+/).length
                          : 0}
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* View Mode */}
                  <h2 className="text-2xl lg:text-3xl font-bold text-white mb-6">
                    {note.title}
                  </h2>
                  <div className="prose prose-invert prose-slate max-w-none">
                    <div className="text-slate-300 text-lg leading-relaxed whitespace-pre-wrap">
                      {note.content}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Save Changes Button (only in edit mode) */}
          {isEditing && (
            <div className="flex flex-col sm:flex-row gap-4 justify-end">
              <button
                onClick={handleCancelEdit}
                className="btn btn-outline border-slate-600 text-slate-300 hover:bg-slate-700 hover:border-slate-500 btn-lg gap-2"
                disabled={saving}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                Cancel
              </button>

              <button
                onClick={handleSave}
                className="btn bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 border-none btn-lg gap-2 shadow-lg"
                disabled={saving}
              >
                {saving ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Saving...
                  </>
                ) : (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Save Changes
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Custom CSS for animations */}
        <style jsx>{`
          @keyframes blob {
            0% {
              transform: translate(0px, 0px) scale(1);
            }
            33% {
              transform: translate(30px, -50px) scale(1.1);
            }
            66% {
              transform: translate(-20px, 20px) scale(0.9);
            }
            100% {
              transform: translate(0px, 0px) scale(1);
            }
          }
          .animate-blob {
            animation: blob 7s infinite;
          }
          .animation-delay-2000 {
            animation-delay: 2s;
          }
          .animation-delay-4000 {
            animation-delay: 4s;
          }
        `}</style>
      </div>
    </>
  );
};

export default NoteDetailPage;
