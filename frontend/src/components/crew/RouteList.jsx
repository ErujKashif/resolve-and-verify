import React from 'react';

const RouteList = ({ complaints, onResolve }) => {
  if (complaints.length === 0) {
    return <p style={styles.empty}>No assigned complaints.</p>;
  }

  return (
    <div style={styles.list}>
      {complaints.map((complaint) => (
        <div key={complaint._id} style={styles.card}>
          <h4 style={styles.address}>{complaint.address}</h4>
          <p><strong>Citizen:</strong> {complaint.citizen?.email}</p>
          <p><strong>Submitted:</strong> {new Date(complaint.createdAt).toLocaleString()}</p>
          {complaint.status === 'Assigned' && (
            <button
              onClick={() => onResolve(complaint)}
              style={styles.resolveBtn}
            >
              📸 Mark as Resolved
            </button>
          )}
          {complaint.status === 'Resolved' && (
            <span style={{ color: '#4caf50' }}>✅ Resolved (awaiting citizen verification)</span>
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
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  address: {
    margin: '0 0 0.5rem 0',
    color: '#2c3e50',
  },
  resolveBtn: {
    padding: '0.5rem 1rem',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '0.5rem',
  },
  empty: {
    textAlign: 'center',
    color: '#7f8c8d',
    padding: '2rem',
  },
};

export default RouteList;