import React, { useState } from 'react'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] =useState('')
  return (
    <div>
       <form>
        <input type='email' placeholder='email address
        'value={email} 
        onChange={(e) => setEmail(e.target.value)}
        required />
        <input type='password'  placeholder='Enter password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required />
        <button>
            Login
        </button>
       </form>
    </div>
  )
}

export default Login
