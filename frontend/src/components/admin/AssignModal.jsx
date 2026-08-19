import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const AssignModal = ({ complaint, onClose, onAssigned }) => {
  const [crews, setCrews] = useState([]);
  const [selectedCrew, setSelectedCrew] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCrews();
  }, []);

  const fetchCrews = async () => {
    try {
      // Get all users with role 'crew' – we need an endpoint for that.
      // For now, we can assume we have a GET /users?role=crew endpoint.
      // Since we don't have it yet, we'll manually fetch from all complaints? Better: add endpoint.
      // Quick fix: we'll allow admin to enter crew email or use a list.
      // Actually, we can add a /users/crews endpoint in backend. Let's implement it here.
      // For now, we'll use a placeholder.
      const response = await api('/users/crews');
      setCrews(response);
    } catch (err) {
      setError('Failed to load crew list');
      console.error(err);
    }
  };

  const handleAssign = async () => {
    if (!selectedCrew) {
      setError('Please select a crew member');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await api(`/complaints/${complaint._id}/assign`, {
        method: 'PUT',
        body: JSON.stringify({ crewId: selectedCrew }),
      });
      onAssigned();
      onClose();
    } catch (err) {
      setError(err.message || 'Assignment failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h3 style={styles.title}>Assign Complaint</h3>
        <p style={styles.address}>{complaint.address}</p>
        {error && <div style={styles.error}>{error}</div>}
        <div style={styles.field}>
          <label style={styles.label}>Select Crew</label>
          <select
            value={selectedCrew}
            onChange={(e) => setSelectedCrew(e.target.value)}
            style={styles.select}
          >
            <option value="">-- Choose --</option>
            {crews.map((crew) => (
              <option key={crew._id} value={crew._id}>
                {crew.email} ({crew.name || 'Crew'})
              </option>
            ))}
          </select>
        </div>
        <div style={styles.actions}>
          <button onClick={onClose} style={styles.cancelBtn}>Cancel</button>
          <button onClick={handleAssign} style={styles.assignBtn} disabled={loading}>
            {loading ? 'Assigning...' : 'Assign'}
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '8px',
    maxWidth: '500px',
    width: '90%',
  },
  title: {
    margin: '0 0 0.5rem 0',
    color: '#2c3e50',
  },
  address: {
    color: '#7f8c8d',
    marginBottom: '1rem',
  },
  field: {
    marginBottom: '1.5rem',
  },
  label: {
    display: 'block',
    marginBottom: '0.5rem',
    fontWeight: '500',
  },
  select: {
    width: '100%',
    padding: '0.75rem',
    borderRadius: '4px',
    border: '1px solid #ddd',
    fontSize: '1rem',
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '0.5rem',
  },
  cancelBtn: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#95a5a6',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  assignBtn: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  error: {
    padding: '0.75rem',
    backgroundColor: '#fde8e8',
    color: '#c0392b',
    borderRadius: '4px',
    marginBottom: '1rem',
    fontSize: '0.9rem',
  },
};

export default AssignModal;