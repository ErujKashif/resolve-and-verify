import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import Login from './pages/Login';
import CitizenDashboard from './pages/CitizenDashboard';
import CrewDashboard from './pages/CrewDashboard';
import AdminDashboard from './pages/AdminDashboard';
import OfficerDashboard from './pages/OfficerDashboard';
import ManageCrew from './pages/ManageCrew';
import ComplaintDetails from './pages/ComplaintDetails';   // ✅ added
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route
            path="/citizen"
            element={
              <ProtectedRoute allowedRoles={['citizen']}>
                <CitizenDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/crew"
            element={
              <ProtectedRoute allowedRoles={['crew']}>
                <CrewDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* Manage Crew – Admin only */}
          <Route
            path="/admin/crews"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <ManageCrew />
              </ProtectedRoute>
            }
          />

          {/* Complaint Details – Admin & Officer can view */}
          <Route
            path="/admin/complaint/:id"
            element={
              <ProtectedRoute allowedRoles={['admin', 'officer']}>
                <ComplaintDetails />
              </ProtectedRoute>
            }
          />

          <Route
            path="/officer"
            element={
              <ProtectedRoute allowedRoles={['officer']}>
                <OfficerDashboard />
              </ProtectedRoute>
            }
          />

          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;