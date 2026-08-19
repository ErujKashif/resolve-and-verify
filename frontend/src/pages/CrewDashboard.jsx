import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/common/Navbar';
import RouteList from '../components/crew/RouteList';
import ResolveModal from '../components/crew/ResolveModal';
import api from '../services/api';

const CrewDashboard = () => {
  const { user } = useAuth();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [showResolveModal, setShowResolveModal] = useState(false);

  useEffect(() => {
    fetchAssigned();
  }, []);

  const fetchAssigned = async () => {
    try {
      setLoading(true);
      const data = await api('/complaints/assigned');
      setComplaints(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleResolveClick = (complaint) => {
    setSelectedComplaint(complaint);
    setShowResolveModal(true);
  };

  const handleResolved = () => {
    fetchAssigned();
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        <h1 style={styles.pageTitle}>Crew Dashboard</h1>
        <p style={styles.welcome}>Welcome, {user?.email}</p>
        <p style={styles.subtitle}>Your assigned complaints – please resolve them after cleanup.</p>
        <RouteList complaints={complaints} onResolve={handleResolveClick} />

        {showResolveModal && selectedComplaint && (
          <ResolveModal
            complaint={selectedComplaint}
            onClose={() => setShowResolveModal(false)}
            onResolved={handleResolved}
          />
        )}
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
    marginBottom: '0.5rem',
  },
  subtitle: {
    color: '#7f8c8d',
    marginBottom: '2rem',
  },
};

export default CrewDashboard;