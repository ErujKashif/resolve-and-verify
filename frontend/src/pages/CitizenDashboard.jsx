import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/common/Navbar';
import ComplaintForm from '../components/citizen/ComplaintForm';
import ComplaintList from '../components/citizen/ComplaintList';
import api from '../services/api';

const CitizenDashboard = () => {
  const { user } = useAuth();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyComplaints();
  }, []);

  const fetchMyComplaints = async () => {
    try {
      setLoading(true);
      const data = await api('/complaints/my');
      setComplaints(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (complaintId, resolved) => {
    try {
      await api(`/complaints/${complaintId}/verify`, {
        method: 'PUT',
        body: JSON.stringify({ resolved }),
      });
      fetchMyComplaints();
    } catch (error) {
      alert('Verification failed: ' + error.message);
    }
  };

  const handleComplaintCreated = () => {
    fetchMyComplaints();
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        <h1 style={styles.pageTitle}>Citizen Dashboard</h1>
        <p style={styles.welcome}>Welcome, {user?.email}</p>
        <div style={styles.grid}>
          <div style={styles.left}>
            <ComplaintForm onComplaintCreated={handleComplaintCreated} />
          </div>
          <div style={styles.right}>
            <h3 style={styles.listTitle}>Your Complaints</h3>
            <ComplaintList complaints={complaints} onVerify={handleVerify} />
          </div>
        </div>
      </div>
    </>
  );
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
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 2fr',
    gap: '2rem',
  },
  listTitle: {
    margin: '0 0 1rem 0',
    color: '#2c3e50',
  },
};

export default CitizenDashboard;