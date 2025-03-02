// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PrescriptionPage from './pages/PrescriptionPage';
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import AppointmentPage from './pages/AppointmentPage';
import AuthProvider from './context/AuthProvider';
import PrescriptionForm from './forms/PrescriptionForm'; 
import ProtectedRoute from './context/ProtectedRoute';
import AboutUs from './pages/AboutUs';
import PrescriptionCanvas from './forms/PrescriptionCanvas';
import NotFound from './pages/NotFound';
import './App.css';
import Profile from './pages/Profile';
import ChangePassword from './components/ChangePassword';
import UserManagementPage from './pages/UserManagementPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/prescription" element={<PrescriptionPage />} />

          {/* Protected Routes (Authentication Only) */}
          <Route
            path="/appointment"
            element={
              <ProtectedRoute>
                <AppointmentPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/prescribe/:patientId/:slotId"
            element={
              <ProtectedRoute>
                <PrescriptionForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/prescription/view/:prescriptionId"
            element={
              
                <PrescriptionForm viewMode={true} />
              
            }
          />
          <Route
            path="/about"
            element={
              <ProtectedRoute>
                <AboutUs />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reset-password"
            element={
              <ProtectedRoute>
                <ChangePassword />
              </ProtectedRoute>
            }
          />

          {/* Admin-Only Route (Role ID 2) */}
          <Route
            path="/admin-portal"
            element={
              <ProtectedRoute requiredRole={2}>
                <UserManagementPage />
              </ProtectedRoute>
            }
          />

          {/* Catch-All Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;