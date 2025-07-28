import React, { useEffect, useState } from "react";
import vcetLogo from "../assets/VCET Logo.jpg";
import cseLogo from "../assets/CSE LOGO.jpg";
import { useNavigate } from "react-router-dom";
import StudentSidebar from "../components/StudentSidebar";

const StudentView = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("all");
  const [teamData, setTeamData] = useState([]);

  useEffect(() => {
    document.title = "Trialthon of Tech | Student View";

    fetch("http://localhost:5000/api/teams") // Change if backend is hosted online
      .then((res) => res.json())
      .then((data) => {
        // Calculate total score
        const teamsWithTotal = data.map((team) => ({
          ...team,
          total: team.design + team.aptitude + team.coding + team.nontech,
        }));

        // Sort and assign rank
        const sorted = teamsWithTotal
          .sort((a, b) => b.total - a.total)
          .map((team, index) => ({ ...team, rank: index + 1 }));

        setTeamData(sorted);
      })
      .catch((err) => console.error("Error fetching team data:", err));
  }, []);

  const handleLogout = () => {
    // Implement your logout logic here (e.g., clearing tokens, redirecting)
    navigate("/");
  };

  return (
    <div className="relative flex flex-col items-center justify-start min-h-screen overflow-hidden bg-gradient-to-b from-white via-white to-blue-100">
      <div
        className="absolute top-10 left-[10vw] w-[400px] h-[120px] bg-white opacity-70 rounded-full blur-2xl z-0"
        style={{
          boxShadow: "100px 40px 0 20px #fff, 300px 60px 0 40px #e0e7ef",
        }}
      ></div>
      <div
        className="absolute top-32 right-[10vw] w-[300px] h-[100px] bg-white opacity-70 rounded-full blur-2xl z-0"
        style={{
          boxShadow: "80px 30px 0 10px #fff, 200px 50px 0 30px #e0e7ef",
        }}
      ></div>

      <header className="relative z-10 flex items-center justify-between w-full px-8 pt-12 pb-4 max-w-7xl">
        <div className="flex items-center gap-4">
          <button
            className="px-5 py-2 mr-2 font-semibold text-green-700 transition border border-green-200 shadow rounded-xl bg-white/70 hover:bg-green-100 backdrop-blur-md"
            onClick={() => navigate("/")}
          >
            &larr; Back
          </button>
          <img
            src={vcetLogo}
            alt="VCET Logo"
            className="object-contain w-auto h-20"
          />
          <h1 className="font-sans text-2xl font-bold tracking-wide md:text-3xl text-slate-800 whitespace-nowrap">
            Velammal College of Engineering and Technology
          </h1>
          <img
            src={cseLogo}
            alt="CSE Logo"
            className="object-contain w-auto h-20"
          />
        </div>
        <div className="flex items-center justify-end mr-8">
          <button
            className="px-5 py-2 font-semibold text-red-700 transition border border-red-200 shadow rounded-xl bg-white/70 hover:bg-red-100 backdrop-blur-md"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </header>

      <div className="z-10 flex justify-center w-full mt-8 mb-4">
        <div className="px-8 py-4 font-sans text-xl font-semibold text-center shadow-lg glassmorphism rounded-xl md:text-2xl text-slate-700">
          Department of Computer Science and Engineering
        </div>
      </div>

      {/* Main content for StudentView goes here */}
      <div className="flex flex-row w-full max-w-7xl mx-auto z-10 pb-16 mt-0 min-h-[70vh]">
        <div className="flex-shrink-0">
          <StudentSidebar selected={selected} onSelect={setSelected} />
        </div>
        <div className="flex-1 bg-white/90 rounded-2xl shadow-xl p-10 ml-8 glassmorphism min-h-[500px] flex flex-col justify-start">
          {selected === "all" ? (
            <div>
              <h2 className="flex items-center gap-3 mb-6 text-2xl font-extrabold text-blue-900">
                <span className="inline-block px-3 py-1 text-sm font-semibold text-blue-700 bg-blue-100 rounded-full">
                  All Team Activity
                </span>
              </h2>
              <div className="overflow-x-auto">
                <table className="min-w-full overflow-hidden border-collapse shadow-lg table-auto rounded-xl">
                  <thead className="bg-blue-100">
                    <tr>
                      <th
                        rowSpan="2"
                        className="px-4 py-4 text-lg font-extrabold text-left text-blue-900 uppercase align-middle"
                      >
                        S.NO
                      </th>
                      <th
                        rowSpan="2"
                        className="px-4 py-4 text-lg font-extrabold text-left text-blue-900 uppercase align-middle"
                      >
                        Team Name
                      </th>
                      <th
                        colSpan="5"
                        className="px-4 py-4 text-lg font-extrabold text-center text-blue-900 uppercase"
                      >
                        Points
                      </th>
                      <th
                        rowSpan="2"
                        className="px-4 py-4 text-lg font-extrabold text-left text-blue-900 uppercase align-middle"
                      >
                        Rank
                      </th>
                    </tr>
                    <tr>
                      <th className="px-2 py-3 text-base font-bold text-center text-blue-900 uppercase">
                        Design
                      </th>
                      <th className="px-2 py-3 text-base font-bold text-center text-blue-900 uppercase">
                        Aptitude
                      </th>
                      <th className="px-2 py-3 text-base font-bold text-center text-blue-900 uppercase">
                        Coding
                      </th>
                      <th className="px-2 py-3 text-base font-bold text-center text-blue-900 uppercase">
                        Non Tech
                      </th>
                      <th className="px-2 py-3 text-base font-bold text-center text-blue-900 uppercase">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-blue-50">
                    {teamData.map((row, idx) => (
                      <tr key={row._id} className="transition hover:bg-blue-50">
                        <td className="px-4 py-4 text-lg font-bold text-blue-800">
                          {idx + 1}
                        </td>
                        <td className="px-4 py-4 text-lg font-bold text-slate-700">
                          {row.teamName}
                        </td>
                        <td className="px-2 py-4 text-base font-semibold text-center">
                          {row.design}
                        </td>
                        <td className="px-2 py-4 text-base font-semibold text-center">
                          {row.aptitude}
                        </td>
                        <td className="px-2 py-4 text-base font-semibold text-center">
                          {row.coding}
                        </td>
                        <td className="px-2 py-4 text-base font-semibold text-center">
                          {row.nontech}
                        </td>
                        <td className="px-2 py-4 text-lg font-bold text-center text-blue-900">
                          {row.total}
                        </td>
                        <td className="px-4 py-4 text-lg font-bold text-green-700">
                          {row.rank}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div>
              <h2 className="flex items-center gap-4 mb-8 text-3xl font-extrabold text-green-900">
                <span className="inline-block px-5 py-2 text-xl font-bold text-green-700 bg-green-100 rounded-full shadow">
                  My Team
                </span>
              </h2>
              <div className="mb-6">
                <div className="mb-2 text-2xl font-bold text-green-700">
                  Team Name:{" "}
                  <span className="text-slate-800">My Awesome Team</span>
                </div>
                <div className="flex flex-col gap-1 pl-2">
                  <span className="text-lg font-semibold text-slate-700">
                    Team Leader:{" "}
                    <span className="font-bold text-green-900">John Doe</span>
                  </span>
                  <span className="text-lg text-slate-700">
                    Member 1: <span className="font-semibold">Alice</span>
                  </span>
                  <span className="text-lg text-slate-700">
                    Member 2: <span className="font-semibold">Bob</span>
                  </span>
                </div>
              </div>
              <div className="max-w-2xl p-6 mt-8 shadow bg-green-50 rounded-xl">
                <h3 className="pb-2 mb-6 text-2xl font-bold text-green-800 border-b-2 border-green-200">
                  Round Wise Score
                </h3>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  {/* Column 1: Design and Coding */}
                  <div>
                    <div className="mb-8">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xl font-bold text-blue-900">
                          Design
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 pl-4 mb-1">
                        <span className="text-lg text-slate-700">
                          Total Marks: <span className="font-bold">50</span>
                        </span>
                        <span className="text-lg text-green-700">
                          Your Score: <span className="font-bold">24</span>
                        </span>
                      </div>
                      <hr className="my-3 border-green-200" />
                    </div>
                    <div className="mb-2">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xl font-bold text-blue-900">
                          Coding
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 pl-4 mb-1">
                        <span className="text-lg text-slate-700">
                          Total Marks: <span className="font-bold">50</span>
                        </span>
                        <span className="text-lg text-green-700">
                          Your Score: <span className="font-bold">40</span>
                        </span>
                      </div>
                      <hr className="my-3 border-green-200" />
                    </div>
                  </div>
                  {/* Column 2: Aptitude and Non Tech */}
                  <div>
                    <div className="mb-8">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xl font-bold text-blue-900">
                          Aptitude
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 pl-4 mb-1">
                        <span className="text-lg text-slate-700">
                          Total Marks: <span className="font-bold">50</span>
                        </span>
                        <span className="text-lg text-green-700">
                          Your Score: <span className="font-bold">18</span>
                        </span>
                      </div>
                      <hr className="my-3 border-green-200" />
                    </div>
                    <div className="mb-2">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xl font-bold text-blue-900">
                          Non Tech
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 pl-4 mb-1">
                        <span className="text-lg text-slate-700">
                          Total Marks: <span className="font-bold">50</span>
                        </span>
                        <span className="text-lg text-green-700">
                          Your Score: <span className="font-bold">10</span>
                        </span>
                      </div>
                      <hr className="my-3 border-green-200" />
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
