import React from 'react';
import vcetLogo from './assets/VCET Logo.jpg';
import cseLogo from './assets/CSE LOGO.jpg';
import { useNavigate } from 'react-router-dom';
import { authenticateUser } from './auth/authHelpers';

import { useEffect } from 'react';

const Login = () => {
  useEffect(() => {
    document.title = 'Trialthon of Tech | Login';
  }, []);
  const navigate = useNavigate();
  const [error, setError] = React.useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    const result = authenticateUser(username, password);
    if (result?.role === 'student') {
      navigate('/studentview');
    } else if (result?.role === 'admin') {
      navigate('/admin');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-white to-blue-100 relative flex flex-col items-center justify-start overflow-hidden">
      {/* Cloud shapes */}
      <div
        className="absolute top-10 left-[10vw] w-[400px] h-[120px] bg-white opacity-70 rounded-full blur-2xl z-0"
        style={{ boxShadow: '100px 40px 0 20px #fff, 300px 60px 0 40px #e0e7ef' }}
      ></div>
      <div
        className="absolute top-32 right-[10vw] w-[300px] h-[100px] bg-white opacity-70 rounded-full blur-2xl z-0"
        style={{ boxShadow: '80px 30px 0 10px #fff, 200px 50px 0 30px #e0e7ef' }}
      ></div>

      <header className="w-full max-w-7xl flex items-center justify-between px-8 pt-12 pb-4 relative z-10">
        <div className="flex items-center gap-4">
          <button
            className="px-5 py-2 rounded-xl font-semibold bg-white/70 text-green-700 shadow hover:bg-green-100 transition border border-green-200 backdrop-blur-md mr-2"
            onClick={() => navigate('/')}
          >
            &larr; Back
          </button>
          <img src={vcetLogo} alt="VCET Logo" className="h-20 w-auto object-contain" />
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-wide font-sans whitespace-nowrap">
            Velammal College of Engineering and Technology
          </h1>
          <img src={cseLogo} alt="CSE Logo" className="h-20 w-auto object-contain" />
        </div>
        <div className="flex justify-end items-center mr-8">
          <button
            className="px-5 py-2 rounded-xl font-semibold bg-white/70 text-blue-700 shadow hover:bg-blue-100 transition border border-blue-200 backdrop-blur-md"
            onClick={() => navigate('/signup')}
          >
            Sign Up
          </button>
        </div>
      </header>

      <div className="mt-8 mb-4 w-full flex justify-center z-10">
        <div className="glassmorphism px-8 py-4 rounded-xl shadow-lg text-xl md:text-2xl font-semibold text-slate-700 text-center font-sans">
          Department of Computer Science and Engineering
        </div>
      </div>

      <div className="w-full flex justify-center z-10 pb-16">
        <div className="w-full max-w-md bg-white/90 rounded-2xl shadow-xl p-8 glassmorphism">
          <h2 className="text-2xl font-bold text-center text-slate-800 mb-6">Trialthon of Tech : Team Login</h2>
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Team Leader Roll No.</label>
              <input name="username" type="text" placeholder="Enter your roll number" className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-300" autoComplete="username" />
            </div>
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Password</label>
              <input name="password" type="password" placeholder="Enter your password" className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-300" autoComplete="current-password" />
            </div>
            {error && <div className="text-red-600 text-center font-semibold">{error}</div>}
            <button type="submit" className="w-full mt-4 py-3 rounded-lg bg-blue-500 text-white font-bold text-lg shadow hover:bg-blue-600 transition">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login; 