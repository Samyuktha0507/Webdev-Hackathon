import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx'; // Import the useAuth hook
import styles from './LoginPage.module.css';
import { FiUser, FiLock, FiArrowLeft } from 'react-icons/fi';

const LoginPage = () => {
  const { role } = useParams();
  const navigate = useNavigate();
  const { login } = useAuth(); // Get the login function from our context

  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState(''); // State to hold the username input

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username) {
      alert('Please enter a username.');
      return;
    }
    
    // Use the login function to store the user's name globally
    login({ name: username });

    // Redirect based on the role
    if (role === 'vendor') {
      navigate('/products');
    } else if (role === 'producer') {
      navigate('/dashboard');
    } else {
      navigate('/');
    }
  };

  const pageTitle = isLogin ? 'Login' : 'Sign Up';
  const roleTitle = role === 'vendor' ? 'Vendor' : 'Producer';

  return (
    <div className={styles.pageContainer}>
      <Link to="/" className={styles.backToHome}>
        <FiArrowLeft /> Back to Home
      </Link>
      <div className={styles.loginCard}>
        <div className={styles.cardHeader}>
          <h2>{roleTitle} {pageTitle}</h2>
          <p>Welcome! Please enter your details.</p>
        </div>
        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <div className={styles.inputGroup}>
            <FiUser />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <FiLock />
            <input type="password" placeholder="Password" required />
          </div>
          {!isLogin && (
            <div className={styles.inputGroup}>
              <FiLock />
              <input type="password" placeholder="Confirm Password" required />
            </div>
          )}
          <button type="submit" className={styles.submitBtn}>{pageTitle}</button>
        </form>
        <div className={styles.toggleText}>
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button onClick={() => setIsLogin(!isLogin)} className={styles.toggleBtn}>
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
