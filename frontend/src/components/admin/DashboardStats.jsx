import React from 'react';

const DashboardStats = ({ stats }) => {
  const statItems = [
    { label: 'Total', value: stats.total, color: '#3498db' },
    { label: 'Open', value: stats.open, color: '#2196f3' },
    { label: 'Assigned', value: stats.assigned, color: '#ff9800' },
    { label: 'Resolved', value: stats.resolved, color: '#4caf50' },
    { label: 'Closed', value: stats.closed, color: '#9e9e9e' },
    { label: 'Escalated', value: stats.escalated, color: '#f44336' },
  ];

  return (
    <div style={styles.grid}>
      {statItems.map((item) => (
        <div key={item.label} style={{ ...styles.card, borderTop: `4px solid ${item.color}` }}>
          <h4 style={styles.label}>{item.label}</h4>
          <p style={styles.value}>{item.value}</p>
        </div>
      ))}
    </div>
  );
};

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '1rem',
    marginBottom: '2rem',
  },
  card: {
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    textAlign: 'center',
  },
  label: {
    margin: '0 0 0.5rem 0',
    color: '#7f8c8d',
    fontSize: '0.9rem',
  },
  value: {
    margin: 0,
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#2c3e50',
  },
};

export default DashboardStats;