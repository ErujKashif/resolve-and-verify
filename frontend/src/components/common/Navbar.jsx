import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout();
      navigate('/login');
    }
  };

  const getDashboardLink = () => {
    if (!user) return '/login';
    switch (user.role) {
      case 'admin': return '/admin';
      case 'officer': return '/officer';
      case 'crew': return '/crew';
      case 'citizen': return '/citizen';
      default: return '/';
    }
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        <Link to={getDashboardLink()} style={styles.brand}>
          <span style={styles.logoIcon}>🌿</span>
          <span>Resolve & Verify</span>
          <span style={styles.tagline}>CDA Islamabad</span>
        </Link>
        <div style={styles.right}>
          {user && (
            <>
              <span style={styles.userEmail}>{user.email}</span>
              <span style={styles.roleBadge}>{user.role}</span>
              <button onClick={handleLogout} style={styles.logoutBtn}>
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    background: 'linear-gradient(135deg, #1b5e20 0%, #2e7d32 50%, #388e3c 100%)',
    color: 'white',
    padding: '0.8rem 0',
    boxShadow: '0 4px 20px rgba(27, 94, 32, 0.3)',
    position: 'sticky',
    top: 0,
    zIndex: 999,
  },
  container: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '0 30px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  brand: {
    color: 'white',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '1.4rem',
    fontWeight: '700',
  },
  logoIcon: {
    fontSize: '1.8rem',
  },
  tagline: {
    fontSize: '0.7rem',
    fontWeight: '400',
    opacity: 0.8,
    background: 'rgba(255,255,255,0.15)',
    padding: '2px 10px',
    borderRadius: '12px',
    marginLeft: '4px',
  },
  right: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    flexWrap: 'wrap',
  },
  userEmail: {
    opacity: 0.9,
    fontSize: '0.9rem',
  },
  roleBadge: {
    background: 'rgba(255,255,255,0.2)',
    padding: '4px 14px',
    borderRadius: '20px',
    fontSize: '0.75rem',
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  logoutBtn: {
    background: 'rgba(255,255,255,0.15)',
    color: 'white',
    border: '1px solid rgba(255,255,255,0.3)',
    padding: '6px 18px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '0.85rem',
    fontWeight: '500',
    transition: 'all 0.3s',
  },
};

export default Navbar;