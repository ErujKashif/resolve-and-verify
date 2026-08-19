import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/common/Navbar';
import EscalatedList from '../components/officer/EscalatedList';
import PenaltyModal from '../components/officer/PenaltyModal';
import api from '../services/api';

const OfficerDashboard = () => {
  const { user } = useAuth();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [showPenaltyModal, setShowPenaltyModal] = useState(false);

  useEffect(() => {
    fetchEscalated();
  }, []);

  const fetchEscalated = async () => {
    try {
      setLoading(true);
      const data = await api('/complaints/escalated');
      setComplaints(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handlePenaltyClick = (complaint) => {
    setSelectedComplaint(complaint);
    setShowPenaltyModal(true);
  };

  const handlePenaltyRecorded = () => {
    fetchEscalated();
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        <h1 style={styles.pageTitle}>Officer Dashboard</h1>
        <p style={styles.welcome}>Welcome, {user?.email}</p>
        <p style={styles.subtitle}>Review escalated complaints and record penalties against contractors.</p>
        <EscalatedList complaints={complaints} onPenalty={handlePenaltyClick} />

        {showPenaltyModal && selectedComplaint && (
          <PenaltyModal
            complaint={selectedComplaint}
            onClose={() => setShowPenaltyModal(false)}
            onPenaltyRecorded={handlePenaltyRecorded}
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

export default OfficerDashboard;