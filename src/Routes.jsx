import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import AuthenticationScreen from "pages/authentication-screen";
import Dashboard from "pages/dashboard";
import NoteGenerationInterface from "pages/note-generation-interface";
import NoteEditor from "pages/note-editor";
import StudyLibrary from "pages/study-library";
import SettingsPreferences from "pages/settings-preferences";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/authentication-screen" element={<AuthenticationScreen />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/note-generation-interface" element={<NoteGenerationInterface />} />
        <Route path="/note-editor" element={<NoteEditor />} />
        <Route path="/study-library" element={<StudyLibrary />} />
        <Route path="/settings-preferences" element={<SettingsPreferences />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;