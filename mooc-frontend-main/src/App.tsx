import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Layout } from "@/components/layout/Layout";

// Pages
import LandingPage from "@/pages/LandingPage";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";

import LearnerDashboard from "@/pages/learner/LearnerDashboard";
import ResumeRecommender from "@/pages/learner/ResumeRecommender";
import JobDescriptionRecommender from "@/pages/learner/JobDescriptionRecommender";
import BrowseCourses from "@/pages/learner/BrowseCourses";

import AdminDashboard from "@/pages/admin/AdminDashboard";
import Analytics from "@/pages/admin/Analytics";
import ContentAnalytics from "@/pages/admin/ContentAnalytics"
import LearnerIntelligence from "@/pages/admin/LearnerIntelligence";

import NotFound from "@/pages/NotFound";

// Toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();

const App = () => {
  const isLoggedIn = !!localStorage.getItem("accessToken");

  // ✅ Mode switching (learner/admin)
  const mode = localStorage.getItem("mode") || "learner";

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <ToastContainer />

        <BrowserRouter>
          <Routes>

            {/* 🌍 Public Routes */}
            <Route
              path="/"
              element={
                isLoggedIn ? <Navigate to="/dashboard" replace /> : <LandingPage />
              }
            />
            <Route
              path="/login"
              element={
                isLoggedIn ? <Navigate to="/dashboard" replace /> : <Login />
              }
            />
            <Route
              path="/signup"
              element={
                isLoggedIn ? <Navigate to="/dashboard" replace /> : <Signup />
              }
            />

            {/* 🔒 Protected Routes */}
            {!isLoggedIn ? (
              <Route path="*" element={<Navigate to="/login" replace />} />
            ) : (
              <Route element={<Layout />}>

                {/* ✅ Dashboard switches based on mode */}
                <Route
                  path="/dashboard"
                  element={
                    mode === "admin" ? <AdminDashboard /> : <LearnerDashboard />
                  }
                />

                {/* Learner Features */}
                <Route path="/resume" element={<ResumeRecommender />} />
                <Route path="/job-description" element={<JobDescriptionRecommender />} />
                <Route path="/courses" element={<BrowseCourses />} />

                {/* Admin Features (no restriction now) */}
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/analytics" element={<Analytics />} />
                <Route path="/admin/content-analytics" element={<ContentAnalytics />} />
                <Route path="/admin/learner-intelligence" element={<LearnerIntelligence />} />

                {/* Fallback */}
                <Route path="*" element={<NotFound />} />
              </Route>
            )}
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;