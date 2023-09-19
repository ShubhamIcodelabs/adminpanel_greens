import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import css from './Login.module.css';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    // Mock authentication (replace with your logic)
    if (formData.email === 'babli.98@yopmail.com' && formData.password === 'password') {
      setIsLoggedIn(true);
      navigate("/dashboard")
      console.log('go')
    } else {
      setIsLoggedIn(false);
      console.log('error')
    }
  };

  const handleLogout = () => {
    // Log the user out by resetting the isLoggedIn state to false
    setIsLoggedIn(false);
  };
  return (
    <div className={css.loginWrapper}>
      <div className={css.loginBox}>
        <div className={css.loginMain}>
          <h2>Login</h2>
          {isLoggedIn ? (
            <>
              <p>You are logged in!</p>
              {/* <button onClick={handleLogout}>Logout</button> */}
            </>
          ) : (
            <form onSubmit={handleLogin}>
              <div className={css.formGroup}>
                <label>Email</label>
                <div className={css.inputBox}>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className={css.formGroup}>
                <label>Password</label>
                <div className={css.inputBox}>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <button type="submit" className={css.loginButton}>Login</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
