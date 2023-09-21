import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../Service/firebaseConfig';

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
          history.push('/Dragdrop')
        })
        .catch((error) => {
          // Handle login error
          console.error('Login failed:', error);
        });
    } else {
      console.error('Invalid email or password');
    }
  };
  const navigate = useNavigate();

  function handleClick() {
    if (email === 'user@example.com' && password === '1Password') {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Handle successful login
          alert('User logged in:', userCredential.user);
          navigate('/Dragdrop')
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
    <div className='flex justify-center items-center h-screen bg-purple-700' >
      <div className='w-96 p-6 shadow-lg bg-white rounded-md'>
        <form onSubmit={handleLogin}>
          <h1 className='text-center text-lg'>Login</h1>
          <label className='block text-base mb-2'>Email Address</label>
          <input
            type='email'
            placeholder='Email address'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className='border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-purple-600 rounded-lg' />
          <label className='block text-base mt-8'>Password</label>
          <input
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className='border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-purple-600 rounded-lg mt-5'
          />
          <button type='submit' onClick={handleClick} onSubmit={handleLogin} className='border w-50% text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-purple-600 rounded-lg mt-5 justify-center items-center ml-[40%]' >Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login