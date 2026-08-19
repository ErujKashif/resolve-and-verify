import React from 'react';

const ComplaintList = ({ complaints, onVerify }) => {
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

  if (complaints.length === 0) {
    return <p style={styles.empty}>You haven't submitted any complaints yet.</p>;
  }

  return (
    <div style={styles.list}>
      {complaints.map((complaint) => (
        <div key={complaint._id} style={styles.card}>
          <div style={styles.header}>
            <h4 style={styles.address}>{complaint.address}</h4>
            <span style={getStatusBadge(complaint.status)}>{complaint.status}</span>
          </div>
          <div style={styles.details}>
            <p><strong>ID:</strong> {complaint._id.slice(-6)}</p>
            <p><strong>Submitted:</strong> {new Date(complaint.createdAt).toLocaleString()}</p>
            {complaint.resolvedAt && (
              <p><strong>Resolved:</strong> {new Date(complaint.resolvedAt).toLocaleString()}</p>
            )}
            {complaint.penaltyAmount > 0 && (
              <p><strong>Penalty:</strong> Rs.{complaint.penaltyAmount}</p>
            )}
          </div>

          {/* Show verify buttons only for Resolved complaints that haven't been verified yet */}
          {complaint.status === 'Resolved' && complaint.verifiedByCitizen === null && (
            <div style={styles.actions}>
              <button
                onClick={() => onVerify(complaint._id, true)}
                style={{ ...styles.verifyBtn, backgroundColor: '#2ecc71' }}
              >
                ✅ Yes, Done
              </button>
              <button
                onClick={() => onVerify(complaint._id, false)}
                style={{ ...styles.verifyBtn, backgroundColor: '#e74c3c' }}
              >
                ❌ No, Not Resolved
              </button>
            </div>
          )}

          {/* Show "Verified as resolved" when complaint is Closed and citizen said YES */}
          {complaint.status === 'Closed' && complaint.verifiedByCitizen === true && (
            <p style={styles.verified}>✅ Verified as resolved</p>
          )}

          {/* Show "Escalated – pending officer review" only when status is Escalated */}
          {complaint.status === 'Escalated' && (
            <p style={styles.escalated}>❌ Escalated – pending officer review</p>
          )}

          {/* Show penalty recorded message when complaint is Closed and has a penalty */}
          {complaint.status === 'Closed' && complaint.penaltyAmount > 0 && (
            <p style={styles.penalty}>💰 Penalty recorded: Rs.{complaint.penaltyAmount}</p>
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
  details: {
    fontSize: '0.9rem',
    color: '#555',
    marginBottom: '1rem',
  },
  actions: {
    display: 'flex',
    gap: '0.5rem',
  },
  verifyBtn: {
    padding: '0.5rem 1rem',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.9rem',
  },
  verified: {
    color: '#27ae60',
    fontWeight: 'bold',
    marginTop: '0.5rem',
  },
  escalated: {
    color: '#e74c3c',
    fontWeight: 'bold',
    marginTop: '0.5rem',
  },
  penalty: {
    color: '#e67e22',
    fontWeight: 'bold',
    marginTop: '0.5rem',
  },
  empty: {
    textAlign: 'center',
    color: '#7f8c8d',
    padding: '2rem',
  },
};

export default ComplaintList;