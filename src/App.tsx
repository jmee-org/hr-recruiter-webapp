import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import JobDetail from "./components/JobDetail";
import CandidateDetail from "./components/CandidateDetail";
import ProgressDetail from "./components/ProgressDetail";
import JobCreation from "./components/JobCreation";
import SearchComponent from "./components/SearchComponent";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/jobs/:jobId" element={<JobDetail />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/candidates/:candidateId" element={<CandidateDetail />} />
        {/* <Route path="/progress/:progressId" element={<ProgressDetail />} /> */}
        <Route path="/create-job" element={<JobCreation />} />
        <Route path="/search" element={<SearchComponent />} />
      </Routes>
    </Router>
  );
}

export default App;
