import React, { useState } from 'react';

const EscalatedList = ({ complaints, onPenalty }) => {
  const [expandedId, setExpandedId] = useState(null);

  if (complaints.length === 0) {
    return <p style={styles.empty}>No escalated complaints.</p>;
  }

  return (
    <div style={styles.list}>
      {complaints.map((complaint) => (
        <div key={complaint._id} style={styles.card}>
          <div style={styles.header}>
            <h4 style={styles.address}>{complaint.address}</h4>
            <span style={styles.escalatedBadge}>Escalated</span>
          </div>
          <div style={styles.details}>
            <p><strong>Citizen:</strong> {complaint.citizen?.email}</p>
            <p><strong>Crew:</strong> {complaint.assignedTo?.email || 'N/A'}</p>
            <p><strong>Escalated:</strong> {new Date(complaint.escalatedAt).toLocaleString()}</p>
            {complaint.penaltyAmount > 0 && (
              <p><strong>Penalty:</strong> Rs. {complaint.penaltyAmount}</p>
            )}
          </div>

          {/* Photo Comparison - Click to expand */}
          <button
            onClick={() => setExpandedId(expandedId === complaint._id ? null : complaint._id)}
            style={styles.photoToggle}
          >
            {expandedId === complaint._id ? '📷 Hide Photos' : '📷 View Before/After Photos'}
          </button>

          {expandedId === complaint._id && (
            <div style={styles.photoComparison}>
              <div style={styles.photoBox}>
                <p style={styles.photoLabel}>📸 Before</p>
                {complaint.beforePhoto ? (
                  <img
                    src={complaint.beforePhoto}
                    alt="Before"
                    style={styles.photo}
                    onError={(e) => e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="150"%3E%3Crect width="200" height="150" fill="%23eee"/%3E%3Ctext x="100" y="75" text-anchor="middle" fill="%23999" font-size="14"%3ENo Image%3C/text%3E%3C/svg%3E'}
                  />
                ) : (
                  <div style={styles.noPhoto}>No before photo</div>
                )}
              </div>
              <div style={styles.photoBox}>
                <p style={styles.photoLabel}>📸 After</p>
                {complaint.afterPhoto ? (
                  <img
                    src={complaint.afterPhoto}
                    alt="After"
                    style={styles.photo}
                    onError={(e) => e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="150"%3E%3Crect width="200" height="150" fill="%23eee"/%3E%3Ctext x="100" y="75" text-anchor="middle" fill="%23999" font-size="14"%3ENo Image%3C/text%3E%3C/svg%3E'}
                  />
                ) : (
                  <div style={styles.noPhoto}>No after photo</div>
                )}
              </div>
            </div>
          )}

          {complaint.penaltyAmount === 0 && (
            <button
              onClick={() => onPenalty(complaint)}
              style={styles.penaltyBtn}
            >
              💰 Record Penalty
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

const styles = {
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  card: {
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    border: '1px solid #f0f0f0',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '0.5rem',
  },
  address: {
    margin: 0,
    color: '#2c3e50',
  },
  escalatedBadge: {
    backgroundColor: '#f44336',
    color: 'white',
    padding: '4px 14px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: 'bold',
  },
  details: {
    fontSize: '0.9rem',
    color: '#555',
    marginBottom: '1rem',
  },
  photoToggle: {
    background: '#f0f4f8',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '8px',
    cursor: 'pointer',
    color: '#2c3e50',
    fontWeight: '500',
    fontSize: '0.85rem',
    marginBottom: '0.5rem',
  },
  photoComparison: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem',
    margin: '0.5rem 0 1rem 0',
    padding: '1rem',
    background: '#f8fafc',
    borderRadius: '8px',
  },
  photoBox: {
    textAlign: 'center',
  },
  photoLabel: {
    margin: '0 0 8px 0',
    fontWeight: '600',
    fontSize: '0.85rem',
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
    fontSize: '0.85rem',
  },
  penaltyBtn: {
    padding: '8px 20px',
    backgroundColor: '#e67e22',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
    marginTop: '0.5rem',
    transition: 'all 0.3s',
  },
  empty: {
    textAlign: 'center',
    color: '#7f8c8d',
    padding: '2rem',
  },
};

export default EscalatedList;