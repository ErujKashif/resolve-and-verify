import React, { useState } from 'react';
import api from '../../services/api';

const PenaltyModal = ({ complaint, onClose, onPenaltyRecorded }) => {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const num = parseFloat(amount);
    if (isNaN(num) || num <= 0) {
      setError('Please enter a valid positive amount');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await api(`/complaints/${complaint._id}/penalty`, {
        method: 'POST',
        body: JSON.stringify({ amount: num }),
      });
      onPenaltyRecorded();
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to record penalty');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h3 style={styles.title}>Record Penalty</h3>
        <p style={styles.address}>{complaint.address}</p>
        {error && <div style={styles.error}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div style={styles.field}>
            <label style={styles.label}>Penalty Amount (USD)</label>
            <input
              type="number"
              min="1"
              step="1"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="e.g., 5000"
              style={styles.input}
              required
            />
          </div>
          <div style={styles.actions}>
            <button type="button" onClick={onClose} style={styles.cancelBtn}>Cancel</button>
            <button type="submit" style={styles.submitBtn} disabled={loading}>
              {loading ? 'Recording...' : 'Record Penalty'}
            </button>
          </div>
        </form>
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
    maxWidth: '400px',
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
  input: {
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
  submitBtn: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#e67e22',
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

export default PenaltyModal;