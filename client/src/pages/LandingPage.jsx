import React, { useState } from 'react'

const LandingPage = () => {
  const [mode, setMode] = useState('signin') // 'signin' | 'signup'
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [passwordCheck, setPasswordCheck] = useState('')


  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&])[a-zA-Z0-9@#$%&]+$/;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (name === 'password') {
      if (!value) {
        setPasswordCheck('');
      } else if (!passwordRegex.test(value)) {
        setPasswordCheck('Password must contain at least one uppercase letter, one lowercase letter, and one special character (@, #, $, %, &).');
      } else {
        setPasswordCheck('');
      }
    }
  }

  const onSubmit = (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!form.email || !form.password) {
      setError('Please fill in all required fields.')
      return
    }

    if (mode === 'signup') {
      if (!form.confirmPassword) {
        setError('Please confirm your password.')
        return
      }
      if (form.password !== form.confirmPassword) {
        setError("Passwords don't match.")
        return
      }
    }

    // Placeholder: here you'd call your auth API
    setSuccess(mode === 'signin' ? 'Signed in (demo)' : 'Account created (demo)')
    // reset form (keeps mode)
    setForm({ email: '', password: '', confirmPassword: '' })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <div className="flex justify-center mb-6">
          <button
            onClick={() => setMode('signin')}
            className={`px-4 py-2 rounded-tl-md rounded-bl-md focus:outline-none ${mode === 'signin' ? 'bg-sky-100 text-sky-700' : 'text-gray-600 hover:bg-gray-50'}`}>
            Sign In
          </button>
          <button
            onClick={() => setMode('signup')}
            className={`px-4 py-2 rounded-tr-md rounded-br-md focus:outline-none ${mode === 'signup' ? 'bg-sky-100 text-sky-700' : 'text-gray-600 hover:bg-gray-50'}`}>
            Sign Up
          </button>
        </div>

        <h2 className="text-center text-2xl font-semibold mb-4 text-gray-800">{mode === 'signin' ? 'Welcome back' : 'Create your account'}</h2>

        {error && <div className="text-sm text-red-600 mb-3">{error}</div>}
        {success && <div className="text-sm text-green-600 mb-3">{success}</div>}

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-sky-200"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-sky-200"
              placeholder="Enter password"
              required
            />
            {passwordCheck && (
              <div className="text-xs text-red-600 mt-1">{passwordCheck}</div>
            )}
          </div>

          {mode === 'signup' && (
            <div>
              <label className="block text-sm text-gray-700 mb-1">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-sky-200"
                placeholder="Confirm password"
                required
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full py-2 rounded text-white bg-sky-400 hover:bg-sky-500 focus:outline-none transition"
          >
            {mode === 'signin' ? 'Sign In' : 'Sign Up'}
          </button>
        </form>

        <p className="text-center text-xs text-gray-500 mt-4">This is a minimal demo form — integrate with your auth backend to enable real sign in / sign up.</p>
      </div>
    </div>
  )
}

export default LandingPage