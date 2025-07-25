import React, { useEffect, useState } from 'react';
import vcetLogo from '../assets/VCET Logo.jpg';
import cseLogo from '../assets/CSE LOGO.jpg';
import { useNavigate } from 'react-router-dom';
import StudentSidebar from '../components/StudentSidebar';

const StudentView = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState('all');

  useEffect(() => {
    document.title = 'Trialthon of Tech | Student View';
  }, []);

  const handleLogout = () => {
    // Implement your logout logic here (e.g., clearing tokens, redirecting)
    navigate('/');
  };

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
            className="px-5 py-2 rounded-xl font-semibold bg-white/70 text-red-700 shadow hover:bg-red-100 transition border border-red-200 backdrop-blur-md"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </header>

      <div className="mt-8 mb-4 w-full flex justify-center z-10">
        <div className="glassmorphism px-8 py-4 rounded-xl shadow-lg text-xl md:text-2xl font-semibold text-slate-700 text-center font-sans">
          Department of Computer Science and Engineering
        </div>
      </div>

      {/* Main content for StudentView goes here */}
      <div className="flex flex-row w-full max-w-7xl mx-auto z-10 pb-16 mt-0 min-h-[70vh]">
        <div className="flex-shrink-0">
          <StudentSidebar selected={selected} onSelect={setSelected} />
        </div>
        <div className="flex-1 bg-white/90 rounded-2xl shadow-xl p-10 ml-8 glassmorphism min-h-[500px] flex flex-col justify-start">
          {selected === 'all' ? (
            <div>
              <h2 className="text-2xl font-extrabold text-blue-900 mb-6 flex items-center gap-3">
                <span className="inline-block bg-blue-100 text-blue-700 rounded-full px-3 py-1 text-sm font-semibold">All Team Activity</span>
              </h2>
              <div className="overflow-x-auto">
                <table className="min-w-full table-auto border-collapse rounded-xl overflow-hidden shadow-lg">
  <thead className="bg-blue-100">
    <tr>
      <th rowSpan="2" className="px-4 py-4 text-left text-lg font-extrabold text-blue-900 uppercase align-middle">S.NO</th>
      <th rowSpan="2" className="px-4 py-4 text-left text-lg font-extrabold text-blue-900 uppercase align-middle">Team Name</th>
      <th colSpan="5" className="px-4 py-4 text-center text-lg font-extrabold text-blue-900 uppercase">Points</th>
      <th rowSpan="2" className="px-4 py-4 text-left text-lg font-extrabold text-blue-900 uppercase align-middle">Rank</th>
    </tr>
    <tr>
      <th className="px-2 py-3 text-center text-base font-bold text-blue-900 uppercase">Design</th>
      <th className="px-2 py-3 text-center text-base font-bold text-blue-900 uppercase">Aptitude</th>
      <th className="px-2 py-3 text-center text-base font-bold text-blue-900 uppercase">Coding</th>
      <th className="px-2 py-3 text-center text-base font-bold text-blue-900 uppercase">Non Tech</th>
      <th className="px-2 py-3 text-center text-base font-bold text-blue-900 uppercase">Total</th>
    </tr>
  </thead>
  <tbody className="bg-white divide-y divide-blue-50">
    {[
      {
        team: 'Alpha Coders',
        design: 24,
        aptitude: 18,
        coding: 40,
        nontech: 10,
        total: 92,
        rank: 1,
      },
      {
        team: 'Tech Titans',
        design: 20,
        aptitude: 22,
        coding: 30,
        nontech: 15,
        total: 87,
        rank: 2,
      },
      {
        team: 'Debuggers',
        design: 18,
        aptitude: 14,
        coding: 35,
        nontech: 18,
        total: 85,
        rank: 3,
      },
    ].map((row, idx) => (
      <tr key={row.team} className="hover:bg-blue-50 transition">
        <td className="px-4 py-4 font-bold text-lg text-blue-800">{idx + 1}</td>
        <td className="px-4 py-4 font-bold text-lg text-slate-700">{row.team}</td>
        <td className="px-2 py-4 text-center text-base font-semibold">{row.design}</td>
        <td className="px-2 py-4 text-center text-base font-semibold">{row.aptitude}</td>
        <td className="px-2 py-4 text-center text-base font-semibold">{row.coding}</td>
        <td className="px-2 py-4 text-center text-base font-semibold">{row.nontech}</td>
        <td className="px-2 py-4 text-center font-bold text-lg text-blue-900">{row.total}</td>
        <td className="px-4 py-4 font-bold text-lg text-green-700">{row.rank}</td>
      </tr>
    ))}
  </tbody>
</table>
              </div>
            </div>
          ) : (
            <div>
              <h2 className="text-3xl font-extrabold text-green-900 mb-8 flex items-center gap-4">
                <span className="inline-block bg-green-100 text-green-700 rounded-full px-5 py-2 text-xl font-bold shadow">My Team</span>
              </h2>
              <div className="mb-6">
                <div className="text-2xl font-bold text-green-700 mb-2">Team Name: <span className="text-slate-800">My Awesome Team</span></div>
                <div className="flex flex-col gap-1 pl-2">
                  <span className="text-lg font-semibold text-slate-700">Team Leader: <span className="text-green-900 font-bold">John Doe</span></span>
                  <span className="text-lg text-slate-700">Member 1: <span className="font-semibold">Alice</span></span>
                  <span className="text-lg text-slate-700">Member 2: <span className="font-semibold">Bob</span></span>
                </div>
              </div>
              <div className="mt-8 max-w-2xl bg-green-50 rounded-xl shadow p-6">
                <h3 className="text-2xl font-bold text-green-800 mb-6 border-b-2 border-green-200 pb-2">Round Wise Score</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Column 1: Design and Coding */}
                  <div>
                    <div className="mb-8">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xl font-bold text-blue-900">Design</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mb-1 pl-4">
                        <span className="text-lg text-slate-700">Total Marks: <span className="font-bold">50</span></span>
                        <span className="text-lg text-green-700">Your Score: <span className="font-bold">24</span></span>
                      </div>
                      <hr className="border-green-200 my-3" />
                    </div>
                    <div className="mb-2">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xl font-bold text-blue-900">Coding</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mb-1 pl-4">
                        <span className="text-lg text-slate-700">Total Marks: <span className="font-bold">50</span></span>
                        <span className="text-lg text-green-700">Your Score: <span className="font-bold">40</span></span>
                      </div>
                      <hr className="border-green-200 my-3" />
                    </div>
                  </div>
                  {/* Column 2: Aptitude and Non Tech */}
                  <div>
                    <div className="mb-8">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xl font-bold text-blue-900">Aptitude</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mb-1 pl-4">
                        <span className="text-lg text-slate-700">Total Marks: <span className="font-bold">50</span></span>
                        <span className="text-lg text-green-700">Your Score: <span className="font-bold">18</span></span>
                      </div>
                      <hr className="border-green-200 my-3" />
                    </div>
                    <div className="mb-2">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xl font-bold text-blue-900">Non Tech</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mb-1 pl-4">
                        <span className="text-lg text-slate-700">Total Marks: <span className="font-bold">50</span></span>
                        <span className="text-lg text-green-700">Your Score: <span className="font-bold">10</span></span>
                      </div>
                      <hr className="border-green-200 my-3" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentView;
