import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    <div>
      <h2>Login</h2>
      {isLoggedIn ? (
        <>
        <p>You are logged in!</p>
        {/* <button onClick={handleLogout}>Logout</button> */}
        </>
      ) : (
        <form onSubmit={handleLogin}>
          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
      )}
    </div>
  );
}

export default Login;
