import React, { useState } from 'react';
import api from '../../services/api';

const ResolveModal = ({ complaint, onClose, onResolved }) => {
  const [afterPhoto, setAfterPhoto] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setAfterPhoto(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleResolve = async () => {
    if (!afterPhoto) {
      setError('Please capture an "after" photo');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await api(`/complaints/${complaint._id}/resolve`, {
        method: 'PUT',
        body: JSON.stringify({ afterPhoto }),
      });
      onResolved();
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to resolve');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h3 style={styles.title}>Resolve Complaint</h3>
        <p style={styles.address}>{complaint.address}</p>
        {error && <div style={styles.error}>{error}</div>}
        <div style={styles.field}>
          <label style={styles.label}>After Photo (must be taken now)</label>
          <input
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handlePhotoUpload}
            style={styles.fileInput}
            required
          />
          {afterPhoto && (
            <div style={styles.photoPreview}>
              <img src={afterPhoto} alt="After" style={styles.previewImg} />
            </div>
          )}
        </div>
        <div style={styles.actions}>
          <button onClick={onClose} style={styles.cancelBtn}>Cancel</button>
          <button onClick={handleResolve} style={styles.resolveBtn} disabled={loading}>
            {loading ? 'Submitting...' : 'Confirm Resolved'}
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
  fileInput: {
    display: 'block',
    marginTop: '0.5rem',
  },
  photoPreview: {
    marginTop: '0.5rem',
  },
  previewImg: {
    maxWidth: '100%',
    maxHeight: '200px',
    borderRadius: '4px',
    border: '1px solid #ddd',
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
  resolveBtn: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#2ecc71',
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

export default ResolveModal;