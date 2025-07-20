import React from "react";
import { Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import NoteDetailPage from "./pages/NoteDetailPage";
import AllNotesPage from "./pages/AllNotesPage";

const App = () => {
  return (
    <div data-theme="night">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/notes" element={<AllNotesPage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/note/:id" element={<NoteDetailPage />} />
      </Routes>
    </div>
  );
};

export default App;
