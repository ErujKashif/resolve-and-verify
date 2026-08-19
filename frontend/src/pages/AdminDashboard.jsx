import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/common/Navbar';
import DashboardStats from '../components/admin/DashboardStats';
import AssignModal from '../components/admin/AssignModal';
import api from '../services/api';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [stats, setStats] = useState({ total: 0, open: 0, assigned: 0, resolved: 0, closed: 0, escalated: 0 });

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      setLoading(true);
      const data = await api('/complaints/all');
      setComplaints(data);
      // Calculate stats
      const s = {
        total: data.length,
        open: data.filter(c => c.status === 'Open').length,
        assigned: data.filter(c => c.status === 'Assigned').length,
        resolved: data.filter(c => c.status === 'Resolved').length,
        closed: data.filter(c => c.status === 'Closed').length,
        escalated: data.filter(c => c.status === 'Escalated').length,
      };
      setStats(s);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAssignClick = (complaint) => {
    setSelectedComplaint(complaint);
    setShowAssignModal(true);
  };

  const handleAssignComplete = () => {
    fetchComplaints();
  };

  if (loading) return <div className="loading">Loading dashboard...</div>;

  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        <h1 style={styles.pageTitle}>Admin Dashboard</h1>
        <p style={styles.welcome}>Welcome, {user?.email}</p>
        <DashboardStats stats={stats} />

        <h2 style={styles.sectionTitle}>All Complaints</h2>
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Address</th>
                <th>Status</th>
                <th>Assigned To</th>
                <th>Citizen</th>
                <th>Created</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {complaints.map((c) => (
                <tr key={c._id}>
                  <td>{c._id.slice(-6)}</td>
                  <td>{c.address}</td>
                  <td><span style={getStatusBadge(c.status)}>{c.status}</span></td>
                  <td>{c.assignedTo?.email || '—'}</td>
                  <td>{c.citizen?.email}</td>
                  <td>{new Date(c.createdAt).toLocaleDateString()}</td>
                  <td>
                    {c.status === 'Open' && (
                      <button onClick={() => handleAssignClick(c)} style={styles.assignBtn}>
                        Assign
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showAssignModal && selectedComplaint && (
          <AssignModal
            complaint={selectedComplaint}
            onClose={() => setShowAssignModal(false)}
            onAssigned={handleAssignComplete}
          />
        )}
      </div>
    </>
  );
};

const getStatusBadge = (status) => {
  const colors = {
    Open: '#2196f3',
    Assigned: '#ff9800',
    Resolved: '#4caf50',
    Closed: '#9e9e9e',
    Escalated: '#f44336',
  };
  return {
    backgroundColor: colors[status] || '#e0e0e0',
    color: 'white',
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: 'bold',
    display: 'inline-block',
  };
};

const styles = {
  pageTitle: {
    margin: '1rem 0 0.5rem 0',
    color: '#2c3e50',
  },
  welcome: {
    color: '#7f8c8d',
    marginBottom: '2rem',
  },
  sectionTitle: {
    margin: '2rem 0 1rem 0',
    color: '#2c3e50',
  },
  tableWrapper: {
    overflowX: 'auto',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    padding: '1rem',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '14px',
  },
  assignBtn: {
    padding: '6px 12px',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default AdminDashboard;