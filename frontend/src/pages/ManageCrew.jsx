import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/common/Navbar';
import api from '../services/api';

const ManageCrew = () => {
  const { user } = useAuth();
  const [crews, setCrews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ email: '', name: '', zone: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchCrews();
  }, []);

  const fetchCrews = async () => {
    try {
      setLoading(true);
      const data = await api('/users/crews');
      setCrews(data);
    } catch (err) {
      setError('Failed to load crew list');
    } finally {
      setLoading(false);
    }
  };

  const handleAddCrew = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await api('/users/crew', {
        method: 'POST',
        body: JSON.stringify(formData),
      });
      setSuccess('Crew member added successfully!');
      setFormData({ email: '', name: '', zone: '' });
      setShowForm(false);
      fetchCrews();
    } catch (err) {
      setError(err.message || 'Failed to add crew member');
    }
  };

  const handleDeleteCrew = async (crewId) => {
    if (!window.confirm('Are you sure you want to delete this crew member?')) return;
    try {
      await api(`/users/crew/${crewId}`, { method: 'DELETE' });
      setSuccess('Crew member deleted successfully');
      fetchCrews();
    } catch (err) {
      setError(err.message || 'Failed to delete crew member');
    }
  };

  if (loading) return <div className="loading">Loading crew members...</div>;

  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        <div style={styles.header}>
          <h1 style={styles.pageTitle}>Manage Crew Members</h1>
          <button onClick={() => setShowForm(!showForm)} className="btn-primary">
            {showForm ? '✕ Close Form' : '+ Add New Crew'}
          </button>
        </div>

        {error && <div style={styles.error}>{error}</div>}
        {success && <div style={styles.success}>{success}</div>}

        {showForm && (
          <form onSubmit={handleAddCrew} style={styles.form}>
            <div style={styles.formRow}>
              <input
                type="email"
                placeholder="Email *"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                style={styles.input}
                required
              />
              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                style={styles.input}
              />
              <input
                type="text"
                placeholder="Zone (e.g., F-11)"
                value={formData.zone}
                onChange={(e) => setFormData({ ...formData, zone: e.target.value })}
                style={styles.input}
              />
              <button type="submit" style={styles.submitBtn}>Add Crew</button>
            </div>
          </form>
        )}

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Email</th>
                <th>Name</th>
                <th>Zone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {crews.length === 0 ? (
                <tr><td colSpan="4" style={styles.empty}>No crew members found</td></tr>
              ) : (
                crews.map((crew) => (
                  <tr key={crew._id}>
                    <td>{crew.email}</td>
                    <td>{crew.name || '—'}</td>
                    <td>{crew.zone || '—'}</td>
                    <td>
                      <button
                        onClick={() => handleDeleteCrew(crew._id)}
                        className="btn-danger"
                        style={styles.deleteBtn}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
    flexWrap: 'wrap',
    gap: '1rem',
  },
  pageTitle: {
    margin: 0,
    color: '#1b5e20',
  },
  form: {
    background: 'white',
    padding: '1.5rem',
    borderRadius: '12px',
    marginBottom: '2rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
  },
  formRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr auto',
    gap: '1rem',
    alignItems: 'end',
  },
  input: {
    padding: '10px 14px',
    border: '2px solid #e0e0e0',
    borderRadius: '8px',
    fontSize: '0.95rem',
    width: '100%',
  },
  submitBtn: {
    padding: '10px 24px',
    background: 'linear-gradient(135deg, #2e7d32, #1b5e20)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontWeight: '600',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  },
  deleteBtn: {
    padding: '4px 12px',
    fontSize: '0.8rem',
  },
  empty: {
    textAlign: 'center',
    color: '#999',
    padding: '2rem',
  },
  error: {
    padding: '12px',
    backgroundColor: '#ffebee',
    color: '#c62828',
    borderRadius: '8px',
    marginBottom: '1rem',
  },
  success: {
    padding: '12px',
    backgroundColor: '#e8f5e9',
    color: '#1b5e20',
    borderRadius: '8px',
    marginBottom: '1rem',
  },
};

export default ManageCrew;