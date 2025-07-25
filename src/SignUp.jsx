import React from 'react';
import vcetLogo from './assets/VCET Logo.jpg';
import cseLogo from './assets/CSE LOGO.jpg';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-white to-blue-100 relative flex flex-col items-center justify-start overflow-hidden">
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
            className="px-5 py-2 rounded-xl font-semibold bg-slate-100 text-slate-700 shadow hover:bg-slate-200 transition border border-slate-300 backdrop-blur-md mr-2"
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
            className="px-5 py-2 rounded-xl font-semibold bg-white/70 text-green-700 shadow hover:bg-green-100 transition border border-green-200 backdrop-blur-md"
            onClick={() => navigate('/login')}
          >
            Login
          </button>
        </div>
      </header>

      <div className="mt-8 mb-4 w-full flex justify-center z-10">
        <div className="glassmorphism px-8 py-4 rounded-xl shadow-lg text-xl md:text-2xl font-semibold text-slate-700 text-center font-sans">
          Department of Computer Science and Engineering
        </div>
      </div>

      <div className="w-full flex justify-center z-10 pb-16">
        <div className="w-full max-w-5xl bg-white/90 rounded-2xl shadow-xl p-8 glassmorphism">
          <h2 className="text-2xl font-bold text-center text-slate-800 mb-6">Trialthon of Tech : Event Registration</h2>
          <form className="grid grid-cols-2 gap-6">
            <div className="col-span-2 grid grid-cols-2 gap-6">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Team Name</label>
                <input type="text" placeholder="Enter your team name" className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-300" />
              </div>
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Year</label>
                <select className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-300">
                  <option value="">Select year</option>
                  <option value="II">II</option>
                  <option value="III">III</option>
                </select>
              </div>
            </div>

            <hr className="col-span-2 border-t-2 border-dashed border-slate-300 my-2" />

            <div className="col-span-2 grid grid-cols-2 gap-6">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Team Leader Name</label>
                <input type="text" placeholder="Leader's name" className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-300" />
              </div>
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Roll No</label>
                <input type="text" placeholder="Leader's roll no" className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-300" />
              </div>
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Contact No.</label>
                <input type="tel" placeholder="Leader's contact no." className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-300" />
              </div>
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Password</label>
                <input type="password" placeholder="Create a password" className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-300" />
              </div>
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Code Language Prefer</label>
                <select className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-300">
                  <option value="">Select language</option>
                  <option value="C">C</option>
                  <option value="Java">Java</option>
                  <option value="C++">C++</option>
                  <option value="Python">Python</option>
                  <option value="JS">JavaScript</option>
                </select>
              </div>
            </div>

            <hr className="col-span-2 border-t-2 border-dashed border-slate-300 my-2" />

            <div className="col-span-2 grid grid-cols-2 gap-6">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Member 1 Name <span className="text-xs text-slate-400">(Optional)</span></label>
                <input type="text" placeholder="Member 1 name" className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-300" />
              </div>
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Member 1 Roll No <span className="text-xs text-slate-400">(Optional)</span></label>
                <input type="text" placeholder="Member 1 roll no" className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-300" />
              </div>
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Member 1 Contact <span className="text-xs text-slate-400">(Optional)</span></label>
                <input type="tel" placeholder="Member 1 contact" className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-300" />
              </div>
            </div>

            <hr className="col-span-2 border-t-2 border-dashed border-slate-300 my-2" />

            <div className="col-span-2 grid grid-cols-2 gap-6">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Member 2 Name <span className="text-xs text-slate-400">(Optional)</span></label>
                <input type="text" placeholder="Member 2 name" className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-300" />
              </div>
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Member 2 Roll No <span className="text-xs text-slate-400">(Optional)</span></label>
                <input type="text" placeholder="Member 2 roll no" className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-300" />
              </div>
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Member 2 Contact <span className="text-xs text-slate-400">(Optional)</span></label>
                <input type="tel" placeholder="Member 2 contact" className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-300" />
              </div>
            </div>

            {/* Submit Button */}
            <div className="col-span-2">
              <button type="submit" className="w-full mt-4 py-3 rounded-lg bg-blue-500 text-white font-bold text-lg shadow hover:bg-blue-600 transition">Register Team</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
