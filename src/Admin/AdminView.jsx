import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import vcetLogo from '../assets/VCET Logo.jpg';
import cseLogo from '../assets/CSE LOGO.jpg';
import AdminSidebar from "../components/AdminSidebar";

const AdminView = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState('results');

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex flex-col items-center">
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
            onClick={() => navigate('/')}
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
      <div className="flex flex-row w-full max-w-7xl mx-auto z-10 pb-16 mt-0 min-h-[70vh]">
        <div className="flex-shrink-0">
          <AdminSidebar selected={selected} onSelect={setSelected} />
        </div>
        <div className="flex-1 bg-white/90 rounded-2xl shadow-xl p-10 ml-8 glassmorphism min-h-[500px] flex flex-col justify-start">
          {selected === 'results' ? (
            <div>
              <h2 className="text-2xl font-extrabold text-blue-900 mb-6 flex items-center gap-3">
                <span className="inline-block bg-blue-100 text-blue-700 rounded-full px-3 py-1 text-lg font-semibold">Total Team Results</span>
              </h2>
              {/* You can copy the All Team Activity table here or import as a separate component */}
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
              <h2 className="text-2xl font-extrabold text-green-900 mb-6 flex items-center gap-3">
                <span className="inline-block bg-green-100 text-green-700 rounded-full px-3 py-1 text-lg font-semibold">Enter Marks</span>
              </h2>
              {/* Mark entry in table format for multiple teams */}
              <form className="overflow-x-auto" onSubmit={e => e.preventDefault()}>
                <table className="min-w-full table-auto border-collapse rounded-xl overflow-hidden shadow-lg bg-white">
                  <thead className="bg-green-100">
                    <tr>
                      <th className="px-4 py-4 text-left text-lg font-extrabold text-green-900 uppercase align-middle">Team Name</th>
                      <th className="px-4 py-4 text-center text-lg font-extrabold text-green-900 uppercase">Design</th>
                      <th className="px-4 py-4 text-center text-lg font-extrabold text-green-900 uppercase">Aptitude</th>
                      <th className="px-4 py-4 text-center text-lg font-extrabold text-green-900 uppercase">Coding</th>
                      <th className="px-4 py-4 text-center text-lg font-extrabold text-green-900 uppercase">Non Tech</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
  'Alpha Coders',
  'Tech Titans',
  'Debuggers',
  'Code Ninjas',
  'Byte Masters',
  'Quantum Crew',
  'Script Squad',
  'Logic Lords',
  'Syntax Savages',
  'Pixel Pioneers',
].map((team, idx) => (
  <tr key={team}>
    <td className="px-4 py-3 font-semibold text-slate-800 text-lg">{team}</td>
    <td className="px-4 py-3 text-center">
      <input type="number" name={`design_${idx}`} min="0" max="50" className="w-24 rounded border px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-200 text-lg text-center" placeholder="0-50" />
    </td>
    <td className="px-4 py-3 text-center">
      <input type="number" name={`aptitude_${idx}`} min="0" max="20" className="w-24 rounded border px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-200 text-lg text-center" placeholder="0-20" />
    </td>
    <td className="px-4 py-3 text-center">
      <input type="number" name={`coding_${idx}`} min="0" max="20" className="w-24 rounded border px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-200 text-lg text-center" placeholder="0-20" />
    </td>
    <td className="px-4 py-3 text-center">
      <input type="number" name={`nontech_${idx}`} min="0" max="10" className="w-24 rounded border px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-200 text-lg text-center" placeholder="0-10" />
    </td>
  </tr>
))}
                  </tbody>
                </table>
                <div className="flex justify-end mt-6">
                  <button type="submit" className="px-8 py-3 bg-green-600 text-white font-bold rounded-xl shadow hover:bg-green-700 transition text-lg">Submit Marks</button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminView;
