import React, { useState } from 'react';
import { register } from '../services/auth';

const RegisterPage = ({ onRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(username, password);
      onRegister();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="login-container"> {/* Apply the CSS class */}
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" class="input-field" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" class="input-field" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit" class="register-button">Register</button>
      </form>
    </div>
  );
};


export default RegisterPage;
