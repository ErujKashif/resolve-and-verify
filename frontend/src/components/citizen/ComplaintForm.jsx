import React, { useState } from 'react';
import api from '../../services/api';

const ComplaintForm = ({ onComplaintCreated }) => {
  const [address, setAddress] = useState('');
  const [location, setLocation] = useState({ coordinates: [0, 0] });
  const [beforePhoto, setBeforePhoto] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Simulate GPS capture (in real app use browser Geolocation API)
  const captureLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocation({
            coordinates: [pos.coords.longitude, pos.coords.latitude],
          });
          setSuccess('Location captured');
        },
        (err) => {
          setError('Unable to get location: ' + err.message);
        }
      );
    } else {
      setError('Geolocation not supported');
    }
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setBeforePhoto(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!address || !beforePhoto) {
      setError('Address and photo are required');
      return;
    }
    if (location.coordinates[0] === 0 && location.coordinates[1] === 0) {
      setError('Please capture your location');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const payload = {
        address,
        location,
        beforePhoto,
      };
      const response = await api('/complaints', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
      setSuccess('Complaint submitted successfully!');
      setAddress('');
      setBeforePhoto('');
      setLocation({ coordinates: [0, 0] });
      if (onComplaintCreated) onComplaintCreated(response.complaint);
    } catch (err) {
      setError(err.message || 'Failed to submit complaint');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.heading}>Submit New Complaint</h3>
      {error && <div style={styles.error}>{error}</div>}
      {success && <div style={styles.success}>{success}</div>}
      <form onSubmit={handleSubmit}>
        <div style={styles.field}>
          <label style={styles.label}>Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="e.g., F-11, Street 14, Islamabad"
            style={styles.input}
            required
          />
        </div>
        <div style={styles.field}>
          <label style={styles.label}>Location</label>
          <div style={styles.locationRow}>
            <button type="button" onClick={captureLocation} style={styles.gpsBtn}>
              📍 Capture GPS
            </button>
            <span style={styles.coords}>
              {location.coordinates[0] !== 0 ? 
                `${location.coordinates[1]}, ${location.coordinates[0]}` : 
                'No location yet'}
            </span>
          </div>
        </div>
        <div style={styles.field}>
          <label style={styles.label}>Before Photo</label>
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            style={styles.fileInput}
            required
          />
          {beforePhoto && (
            <div style={styles.photoPreview}>
              <img src={beforePhoto} alt="Before" style={styles.previewImg} />
            </div>
          )}
        </div>
        <button type="submit" style={styles.submitBtn} disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Complaint'}
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    maxWidth: '600px',
    margin: '0 auto',
  },
  heading: {
    margin: '0 0 1.5rem 0',
    color: '#2c3e50',
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
  locationRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  gpsBtn: {
    padding: '0.5rem 1rem',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  coords: {
    color: '#7f8c8d',
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
  submitBtn: {
    width: '100%',
    padding: '0.75rem',
    backgroundColor: '#2ecc71',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    cursor: 'pointer',
  },
  error: {
    padding: '0.75rem',
    backgroundColor: '#fde8e8',
    color: '#c0392b',
    borderRadius: '4px',
    marginBottom: '1rem',
  },
  success: {
    padding: '0.75rem',
    backgroundColor: '#e8f8e8',
    color: '#27ae60',
    borderRadius: '4px',
    marginBottom: '1rem',
  },
};

export default ComplaintForm;