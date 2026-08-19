import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const { sendOTP, login } = useAuth();
    const navigate = useNavigate();

    const handleSendOTP = async (e) => {
        e.preventDefault();
        if (!email) {
            setError('Please enter your email');
            return;
        }
        setLoading(true);
        setError('');
        setMessage('');
        try {
            await sendOTP(email);
            setMessage('✅ OTP sent! Check your email or terminal.');
            setStep(2);
        } catch (err) {
            setError(err.message || 'Failed to send OTP');
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOTP = async (e) => {
  e.preventDefault();
  if (!otp || otp.length !== 6) {
    setError('Please enter a valid 6-digit OTP');
    return;
  }

  setLoading(true);
  setError('');
  setMessage('');

  try {
    const response = await login(email, otp);
    setMessage('Login successful!');
    const userRole = response.user?.role;
    const roleRoutes = {
      admin: '/admin',
      officer: '/officer',
      crew: '/crew',
      citizen: '/citizen',
    };
    navigate(roleRoutes[userRole] || '/citizen');
  } catch (err) {
    setError(err.message || 'Invalid OTP. Please try again.');
  } finally {
    setLoading(false);
  }
};

    return (
        <div style={styles.container}>
            <div style={styles.heroSection}>
                <div style={styles.heroOverlay} />
                <div style={styles.card}>
                    <div style={styles.brandHeader}>
                        <span style={styles.logoIcon}>🌿</span>
                        <h1 style={styles.title}>Resolve & Verify</h1>
                        <p style={styles.subtitle}>CDA Citizen Feedback System</p>
                        <p style={styles.slogan}>"Clean Islamabad – Our Shared Responsibility"</p>
                    </div>

                    {error && <div style={styles.error}>{error}</div>}
                    {message && <div style={styles.success}>{message}</div>}

                    {step === 1 ? (
                        <form onSubmit={handleSendOTP}>
                            <div style={styles.inputGroup}>
                                <label style={styles.label}>Email Address</label>
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    style={styles.input}
                                    disabled={loading}
                                    required
                                />
                            </div>
                            <button type="submit" style={styles.button} disabled={loading}>
                                {loading ? 'Sending...' : 'Send OTP'}
                            </button>
                        </form>
                    ) : (
                        <form onSubmit={handleVerifyOTP}>
                            <div style={styles.inputGroup}>
                                <label style={styles.label}>Enter OTP</label>
                                <p style={styles.helperText}>
                                    Check your email or terminal for the 6‑digit code
                                </p>
                                <input
                                    type="text"
                                    placeholder="Enter 6-digit OTP"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    style={styles.input}
                                    maxLength="6"
                                    disabled={loading}
                                    required
                                />
                            </div>
                            <button type="submit" style={styles.button} disabled={loading}>
                                {loading ? 'Verifying...' : 'Verify OTP'}
                            </button>
                            <button
                                type="button"
                                onClick={() => setStep(1)}
                                style={styles.linkButton}
                                disabled={loading}
                            >
                                ← Back to email
                            </button>
                        </form>
                    )}

                    <div style={styles.footer}>
                        <p style={styles.footerText}>
                            🌱 Together for a Cleaner Islamabad
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: "url('/images/margalla.jpg') no-repeat center center fixed", backgroundSize: 'cover',
        padding: '20px',
    },
    heroSection: {
        position: 'relative',
        width: '100%',
        maxWidth: '450px',
    },
    heroOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(27, 94, 32, 0.1)',
        borderRadius: '20px',
        zIndex: 0,
    },
    card: {
        position: 'relative',
        zIndex: 1,
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        padding: '2.5rem',
        borderRadius: '20px',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
    },
    brandHeader: {
        textAlign: 'center',
        marginBottom: '2rem',
    },
    logoIcon: {
        fontSize: '3rem',
        display: 'block',
        marginBottom: '0.5rem',
    },
    title: {
        margin: '0 0 4px 0',
        color: '#1b5e20',
        fontSize: '2rem',
        fontWeight: '700',
    },
    subtitle: {
        margin: '0 0 4px 0',
        color: '#555',
        fontSize: '0.9rem',
    },
    slogan: {
        margin: '8px 0 0 0',
        color: '#2e7d32',
        fontSize: '0.85rem',
        fontWeight: '600',
        fontStyle: 'italic',
        background: 'rgba(46, 125, 50, 0.08)',
        padding: '6px 16px',
        borderRadius: '20px',
        display: 'inline-block',
    },
    inputGroup: {
        marginBottom: '20px',
    },
    label: {
        display: 'block',
        marginBottom: '8px',
        color: '#34495e',
        fontWeight: '600',
        fontSize: '0.9rem',
    },
    input: {
        width: '100%',
        padding: '12px 16px',
        border: '2px solid #e0e0e0',
        borderRadius: '10px',
        fontSize: '1rem',
        boxSizing: 'border-box',
        transition: 'border-color 0.3s',
        background: 'white',
    },
    button: {
        width: '100%',
        padding: '14px',
        background: 'linear-gradient(135deg, #2e7d32, #1b5e20)',
        color: 'white',
        border: 'none',
        borderRadius: '10px',
        fontSize: '1rem',
        fontWeight: '700',
        cursor: 'pointer',
        transition: 'all 0.3s',
    },
    linkButton: {
        width: '100%',
        padding: '10px',
        background: 'transparent',
        color: '#2e7d32',
        border: 'none',
        fontSize: '0.9rem',
        cursor: 'pointer',
        marginTop: '10px',
        fontWeight: '500',
    },
    error: {
        padding: '12px',
        backgroundColor: '#ffebee',
        color: '#c62828',
        borderRadius: '10px',
        marginBottom: '20px',
        fontSize: '0.9rem',
        border: '1px solid #ef9a9a',
    },
    success: {
        padding: '12px',
        backgroundColor: '#e8f5e9',
        color: '#1b5e20',
        borderRadius: '10px',
        marginBottom: '20px',
        fontSize: '0.9rem',
        border: '1px solid #a5d6a7',
    },
    helperText: {
        margin: '0 0 10px 0',
        color: '#7f8c8d',
        fontSize: '0.85rem',
    },
    footer: {
        marginTop: '2rem',
        textAlign: 'center',
    },
    footerText: {
        margin: 0,
        color: '#888',
        fontSize: '0.8rem',
    },
};

export default Login;