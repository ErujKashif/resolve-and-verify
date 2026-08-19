import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/common/Navbar';
import api from '../services/api';

const ComplaintDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchComplaint();
  }, [id]);

  const fetchComplaint = async () => {
    try {
      setLoading(true);
      const data = await api(`/complaints/${id}`);
      setComplaint(data);
    } catch (err) {
      setError(err.message || 'Failed to load complaint');
    } finally {
      setLoading(false);
    }
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
      padding: '4px 16px',
      borderRadius: '20px',
      fontSize: '14px',
      fontWeight: '600',
      display: 'inline-block',
    };
  };

  const getTimelineItems = () => {
    const items = [];

    // Created
    items.push({
      label: 'Complaint Created',
      date: complaint.createdAt,
      icon: '📝',
      active: true,
    });

    // Assigned
    if (complaint.assignedTo) {
      items.push({
        label: `Assigned to ${complaint.assignedTo.email}`,
        date: complaint.assignedAt || complaint.createdAt,
        icon: '👤',
        active: true,
      });
    }

    // Resolved
    if (complaint.resolvedAt) {
      items.push({
        label: 'Resolved by Crew',
        date: complaint.resolvedAt,
        icon: '✅',
        active: true,
      });
    }

    // Verified / Escalated
    if (complaint.verifiedByCitizen === true) {
      items.push({
        label: 'Citizen Verified – Resolved ✅',
        date: complaint.updatedAt,
        icon: '👍',
        active: true,
      });
    } else if (complaint.verifiedByCitizen === false) {
      items.push({
        label: 'Citizen Says NO – Escalated ⚠️',
        date: complaint.escalatedAt || complaint.updatedAt,
        icon: '🚨',
        active: true,
      });
    }

    // Penalty
    if (complaint.penaltyAmount > 0) {
      items.push({
        label: `Penalty Recorded: Rs. ${complaint.penaltyAmount}`,
        date: complaint.updatedAt,
        icon: '💰',
        active: true,
      });
    }

    // Closed
    if (complaint.status === 'Closed') {
      items.push({
        label: 'Complaint Closed',
        date: complaint.updatedAt,
        icon: '🔒',
        active: true,
      });
    }

    return items;
  };

  if (loading) return <div className="loading">Loading complaint details...</div>;
  if (error) return <div className="loading" style={{ color: '#c62828' }}>{error}</div>;
  if (!complaint) return <div className="loading">Complaint not found</div>;

  const timelineItems = getTimelineItems();

  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        <button onClick={() => navigate(-1)} style={styles.backBtn}>
          ← Back
        </button>

        <div style={styles.header}>
          <div>
            <h1 style={styles.title}>Complaint Details</h1>
            <p style={styles.subtitle}>
              ID: <strong>{complaint._id}</strong>
            </p>
          </div>
          <span style={getStatusBadge(complaint.status)}>{complaint.status}</span>
        </div>

        <div style={styles.grid}>
          {/* Left Column – Details */}
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>📋 Complaint Information</h3>
            <div style={styles.infoRow}>
              <span style={styles.label}>Address</span>
              <span style={styles.value}>{complaint.address}</span>
            </div>
            <div style={styles.infoRow}>
              <span style={styles.label}>Location</span>
              <span style={styles.value}>
                {complaint.location?.coordinates?.[1]}, {complaint.location?.coordinates?.[0]}
              </span>
            </div>
            <div style={styles.infoRow}>
              <span style={styles.label}>Citizen</span>
              <span style={styles.value}>{complaint.citizen?.email}</span>
            </div>
            <div style={styles.infoRow}>
              <span style={styles.label}>Assigned To</span>
              <span style={styles.value}>{complaint.assignedTo?.email || 'Not assigned'}</span>
            </div>
            <div style={styles.infoRow}>
              <span style={styles.label}>Penalty Amount</span>
              <span style={styles.value}>
                {complaint.penaltyAmount > 0 ? `Rs. ${complaint.penaltyAmount}` : 'None'}
              </span>
            </div>
          </div>

          {/* Right Column – Photos */}
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>📸 Photos</h3>
            <div style={styles.photoGrid}>
              <div>
                <p style={styles.photoLabel}>Before</p>
                {complaint.beforePhoto ? (
                  <img
                    src={complaint.beforePhoto}
                    alt="Before"
                    style={styles.photo}
                    onError={(e) => e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100%25" height="200"%3E%3Crect width="100%25" height="200" fill="%23eee"/%3E%3Ctext x="50%25" y="110" text-anchor="middle" fill="%23999" font-size="14"%3ENo Image%3C/text%3E%3C/svg%3E'}
                  />
                ) : (
                  <div style={styles.noPhoto}>No before photo</div>
                )}
              </div>
              <div>
                <p style={styles.photoLabel}>After</p>
                {complaint.afterPhoto ? (
                  <img
                    src={complaint.afterPhoto}
                    alt="After"
                    style={styles.photo}
                    onError={(e) => e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100%25" height="200"%3E%3Crect width="100%25" height="200" fill="%23eee"/%3E%3Ctext x="50%25" y="110" text-anchor="middle" fill="%23999" font-size="14"%3ENo Image%3C/text%3E%3C/svg%3E'}
                  />
                ) : (
                  <div style={styles.noPhoto}>No after photo</div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>⏱️ Timeline</h3>
          <div style={styles.timeline}>
            {timelineItems.map((item, index) => (
              <div key={index} style={styles.timelineItem}>
                <div style={styles.timelineIcon}>{item.icon}</div>
                <div style={styles.timelineContent}>
                  <p style={styles.timelineLabel}>{item.label}</p>
                  <p style={styles.timelineDate}>
                    {new Date(item.date).toLocaleString()}
                  </p>
                </div>
                {index < timelineItems.length - 1 && <div style={styles.timelineLine} />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

const styles = {
  backBtn: {
    background: 'transparent',
    border: 'none',
    color: '#2e7d32',
    fontSize: '1rem',
    cursor: 'pointer',
    padding: '0.5rem 0',
    fontWeight: '500',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
    flexWrap: 'wrap',
    gap: '1rem',
  },
  title: {
    margin: 0,
    color: '#1b5e20',
  },
  subtitle: {
    margin: '4px 0 0 0',
    color: '#666',
    fontSize: '0.9rem',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1.5rem',
    marginBottom: '1.5rem',
  },
  card: {
    background: 'white',
    padding: '1.5rem',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
  },
  cardTitle: {
    margin: '0 0 1rem 0',
    color: '#2c3e50',
  },
  infoRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0.6rem 0',
    borderBottom: '1px solid #f0f0f0',
  },
  label: {
    fontWeight: '600',
    color: '#555',
  },
  value: {
    color: '#2c3e50',
  },
  photoGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem',
  },
  photoLabel: {
    fontWeight: '600',
    margin: '0 0 8px 0',
    fontSize: '0.9rem',
    color: '#555',
  },
  photo: {
    width: '100%',
    maxHeight: '200px',
    objectFit: 'cover',
    borderRadius: '8px',
    border: '2px solid #e0e0e0',
  },
  noPhoto: {
    height: '150px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#f0f0f0',
    borderRadius: '8px',
    color: '#999',
  },
  timeline: {
    position: 'relative',
    paddingLeft: '2rem',
  },
  timelineItem: {
    position: 'relative',
    paddingBottom: '1.5rem',
  },
  timelineIcon: {
    position: 'absolute',
    left: '-1.8rem',
    fontSize: '1.2rem',
    background: 'white',
    padding: '2px',
  },
  timelineContent: {
    paddingLeft: '0.5rem',
  },
  timelineLabel: {
    margin: 0,
    fontWeight: '500',
    color: '#2c3e50',
  },
  timelineDate: {
    margin: '4px 0 0 0',
    fontSize: '0.8rem',
    color: '#999',
  },
  timelineLine: {
    position: 'absolute',
    left: '-1.2rem',
    top: '1.8rem',
    bottom: '0.5rem',
    width: '2px',
    background: '#e0e0e0',
  },
};

export default ComplaintDetails;