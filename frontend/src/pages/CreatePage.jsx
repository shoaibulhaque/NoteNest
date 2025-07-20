import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import RateLimitedUI from "../components/RateLimitedUI";
import api from "../lib/axios";
import toast from "react-hot-toast";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [rateLimited, setRateLimited] = useState(false);

  const navigate = useNavigate();

  // You can implement these functions
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      await api.post("/notes", {
        title: title,
        content: content,
      });
      toast.success("Note created succesfully!");
      navigate("/notes");
    } catch (error) {
      console.log("Error creating note", error);
      if (error.response && error.response.status === 429) {
        setRateLimited(true);
      } else {
        toast.error("Failed to create note!");
      }
    } finally {
      setLoading(false);
    }
  };

  // const handleSaveDraft = () => {
  //   // TODO: Implement draft saving logic
  //   console.log("Save draft:", { title, content });
  // };

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
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 lg:mb-12">
            <div>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-2">
                Create New Note
              </h1>
              <p className="text-slate-300 text-lg">
                Start writing your thoughts and ideas
              </p>
            </div>
            <Link
              to="/notes"
              className="btn btn-outline border-slate-600 text-slate-300 hover:bg-slate-800 hover:border-slate-500 hover:text-white btn-lg gap-2 mt-4 md:mt-0"
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
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Notes
            </Link>
          </div>

          {/* Create Note Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="card bg-slate-800/60 backdrop-blur-md shadow-2xl border border-slate-700/50">
              <div className="card-body p-8">
                {/* Title Input */}
                <div className="form-control mb-6">
                  <label className="label">
                    <span className="label-text text-slate-300 text-lg font-medium">
                      Note Title
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter a catchy title for your note..."
                    className="input input-lg bg-slate-900/60 border-slate-600 text-white placeholder-slate-400 focus:border-purple-500 focus:bg-slate-900/80 transition-all duration-200"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>

                {/* Content Textarea */}
                <div className="form-control mb-6">
                  <label className="label">
                    <span className="label-text text-slate-300 text-lg font-medium">
                      Note Content
                    </span>
                  </label>
                  <textarea
                    placeholder="Write your thoughts, ideas, or anything you want to remember..."
                    className="textarea textarea-lg bg-slate-900/60 border-slate-600 text-white placeholder-slate-400 focus:border-purple-500 focus:bg-slate-900/80 transition-all duration-200 min-h-[300px] resize-none"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                  ></textarea>
                </div>

                {/* Character Count */}
                <div className="flex justify-between items-center mb-6">
                  <div className="text-sm text-slate-400">
                    Characters:{" "}
                    <span className="text-purple-300">{content.length}</span>
                  </div>
                  <div className="text-sm text-slate-400">
                    Words:{" "}
                    <span className="text-purple-300">
                      {content.trim() ? content.trim().split(/\s+/).length : 0}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-end">
                  {/* Save as Draft Button */}
                  {/* <button
                  type="button"
                  onClick={handleSaveDraft}
                  className="btn btn-outline border-slate-600 text-slate-300 hover:bg-slate-700 hover:border-slate-500 btn-lg gap-2"
                  disabled={loading}
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
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
                    />
                  </svg>
                  Save as Draft
                </button> */}

                  {/* Publish Button */}
                  <button
                    type="submit"
                    className="btn bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 border-none btn-lg gap-2 shadow-lg"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="loading loading-spinner loading-sm"></span>
                        Creating...
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
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                          />
                        </svg>
                        Create Note
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form>

          {/* Tips Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="card bg-slate-800/40 backdrop-blur-sm shadow-xl border border-slate-700/30">
              <div className="card-body text-center p-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-500/30">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-blue-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Be Creative
                </h3>
                <p className="text-slate-400 text-sm">
                  Let your ideas flow freely. There's no wrong way to take
                  notes.
                </p>
              </div>
            </div>

            <div className="card bg-slate-800/40 backdrop-blur-sm shadow-xl border border-slate-700/30">
              <div className="card-body text-center p-6">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-purple-500/30">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-purple-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Auto Save
                </h3>
                <p className="text-slate-400 text-sm">
                  Your work is automatically saved as you type. Never lose your
                  thoughts.
                </p>
              </div>
            </div>

            <div className="card bg-slate-800/40 backdrop-blur-sm shadow-xl border border-slate-700/30">
              <div className="card-body text-center p-6">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-500/20 to-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-pink-500/30">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-pink-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Searchable
                </h3>
                <p className="text-slate-400 text-sm">
                  All your notes are fully searchable. Find anything in seconds.
                </p>
              </div>
            </div>
          </div>
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

export default CreatePage;
