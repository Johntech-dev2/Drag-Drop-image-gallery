import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../Service/firebaseConfig'

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    // Check if the provided email and password match the specific user's credentials
    if (email === 'user@example.com' && password === '1Password') {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Handle successful login
          alert('User logged in:', userCredential.user);
        })
        .catch((error) => {
          // Handle login error
          console.error('Login failed:', error);
        });
    } else {
      console.error('Invalid email or password');
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <input
          type='email'
          placeholder='Email address'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type='password'
          placeholder='Enter password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type='submit'>Login</button>
      </form>
    </div>
  );
}

export default Login;
