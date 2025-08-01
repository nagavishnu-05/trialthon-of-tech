import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import vcetLogo from "../assets/VCET Logo.jpg";
import cseLogo from "../assets/CSE LOGO.jpg";
import AdminSidebar from "../components/AdminSidebar";
import * as XLSX from "xlsx";


const AdminView = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("results");
  const [teams, setTeams] = useState([]);
  const [marks, setMarks] = useState({});

  useEffect(() => {
    fetch("https://trialthon-of-tech-backend.onrender.com/api/teams")
      .then((res) => res.json())
      .then((data) => {
        // Calculate total for each team
        const teamsWithTotal = data.map((team) => ({
          ...team,
          total:
            (team.design || 0) +
            (team.aptitude || 0) +
            (team.coding || 0) +
            (team.nontech || 0),
        }));
        // Sort and assign rank
        const sorted = teamsWithTotal
          .sort((a, b) => b.total - a.total)
          .map((team, index) => ({ ...team, rank: index + 1 }));
        setTeams(sorted);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  const handleSubmitMarks = async () => {
    try {
      for (const team of teams) {
        const teamId = team._id;
        if (marks[teamId]) {
          const updatedMarks = {
            design: marks[teamId].design ?? team.design ?? 0,
            aptitude: marks[teamId].aptitude ?? team.aptitude ?? 0,
            coding: marks[teamId].coding ?? team.coding ?? 0,
            nontech: marks[teamId].nontech ?? team.nontech ?? 0,
          };

          await fetch(
            `https://trialthon-of-tech-backend.onrender.com/api/teams/${teamId}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(updatedMarks),
            }
          );
        }
      }

      // Re-fetch updated data
      const res = await fetch(
        "https://trialthon-of-tech-backend.onrender.com/api/teams"
      );
      const updated = await res.json();
      const teamsWithTotal = updated.map((team) => ({
        ...team,
        total:
          (team.design || 0) +
          (team.aptitude || 0) +
          (team.coding || 0) +
          (team.nontech || 0),
      }));
      const sorted = teamsWithTotal
        .sort((a, b) => b.total - a.total)
        .map((team, index) => ({ ...team, rank: index + 1 }));
      setTeams(sorted);
      setMarks({}); // ✅ Reset marks input
      alert("Marks submitted successfully!");
    } catch (err) {
      console.error("Error submitting marks:", err);
      alert("Failed to submit marks");
    }
  };

   const handleDownloadExcel = () => {
     const dataToExport = teams.map((team) => ({
       "Team Name": team.teamName,
       Year: team.year,
       "Leader Name": team.leaderName,
       "Leader Roll No": team.rollNo,
       "Leader Contact": team.contactNo,
       "Preferred Language": team.language,
       "Member 1 Name": team.member1?.name || "",
       "Member 1 Roll": team.member1?.roll || "",
       "Member 1 Contact": team.member1?.contact || "",
       "Member 2 Name": team.member2?.name || "",
       "Member 2 Roll": team.member2?.roll || "",
       "Member 2 Contact": team.member2?.contact || "",
     }));

     const worksheet = XLSX.utils.json_to_sheet(dataToExport);
     const workbook = XLSX.utils.book_new();
     XLSX.utils.book_append_sheet(workbook, worksheet, "Teams");

     XLSX.writeFile(workbook, "Trialthon_Teams.xlsx");
   };

  
  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
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
            onClick={() => navigate("/")}
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
      <div className="flex flex-row w-full max-w-7xl mx-auto z-10 pb-16 mt-0 min-h-[70vh]">
        <div className="flex-shrink-0">
          <AdminSidebar selected={selected} onSelect={setSelected} />
        </div>
        <div className="flex-1 bg-white/90 rounded-2xl shadow-xl p-10 ml-8 glassmorphism min-h-[500px] flex flex-col justify-start">
          {selected === "results" ? (
            <div>
              <h2 className="flex items-center gap-3 mb-6 text-2xl font-extrabold text-blue-900">
                <span className="inline-block px-3 py-1 text-lg font-semibold text-blue-700 bg-blue-100 rounded-full">
                  Total Team Results
                </span>
              </h2>
              <div className="flex justify-end mb-4">
                <button
                  onClick={handleDownloadExcel}
                  className="flex items-center gap-2 px-5 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  📥 Download Excel
                </button>
              </div>

              {/* You can copy the All Team Activity table here or import as a separate component */}
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
                    {(() => {
                      // Calculate total and rank dynamically for display
                      const teamsWithTotal = teams.map((team) => ({
                        ...team,
                        total:
                          (team.design || 0) +
                          (team.aptitude || 0) +
                          (team.coding || 0) +
                          (team.nontech || 0),
                      }));
                      const sorted = teamsWithTotal
                        .sort((a, b) => b.total - a.total)
                        .map((team, index) => ({ ...team, rank: index + 1 }));
                      return sorted.map((team, idx) => (
                        <tr
                          key={team._id}
                          className="transition hover:bg-blue-50"
                        >
                          <td className="px-4 py-4 text-lg font-bold text-blue-800">
                            {idx + 1}
                          </td>
                          <td className="px-4 py-4 text-lg font-bold text-slate-700">
                            {team.teamName}
                          </td>
                          <td className="px-2 py-4 text-base font-semibold text-center">
                            {team.design || 0}
                          </td>
                          <td className="px-2 py-4 text-base font-semibold text-center">
                            {team.aptitude || 0}
                          </td>
                          <td className="px-2 py-4 text-base font-semibold text-center">
                            {team.coding || 0}
                          </td>
                          <td className="px-2 py-4 text-base font-semibold text-center">
                            {team.nontech || 0}
                          </td>
                          <td className="px-2 py-4 text-lg font-bold text-center text-blue-900">
                            {team.total}
                          </td>
                          <td className="px-4 py-4 text-lg font-bold text-green-700">
                            {team.rank}
                          </td>
                        </tr>
                      ));
                    })()}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div>
              <h2 className="flex items-center gap-3 mb-6 text-2xl font-extrabold text-green-900">
                <span className="inline-block px-3 py-1 text-lg font-semibold text-green-700 bg-green-100 rounded-full">
                  Enter Marks
                </span>
              </h2>
              {/* Mark entry in table format for multiple teams */}
              <form
                className="overflow-x-auto"
                onSubmit={(e) => e.preventDefault()}
              >
                <table className="min-w-full overflow-hidden bg-white border-collapse shadow-lg table-auto rounded-xl">
                  <thead className="bg-green-100">
                    <tr>
                      <th className="px-4 py-4 text-lg font-extrabold text-left text-green-900 uppercase align-middle">
                        Team Name
                      </th>
                      <th className="px-4 py-4 text-lg font-extrabold text-center text-green-900 uppercase">
                        Design
                      </th>
                      <th className="px-4 py-4 text-lg font-extrabold text-center text-green-900 uppercase">
                        Aptitude
                      </th>
                      <th className="px-4 py-4 text-lg font-extrabold text-center text-green-900 uppercase">
                        Coding
                      </th>
                      <th className="px-4 py-4 text-lg font-extrabold text-center text-green-900 uppercase">
                        Non Tech
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {teams.map((team, idx) => (
                      <tr key={team._id}>
                        <td className="px-4 py-3 text-lg font-semibold text-slate-800">
                          {team.teamName}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <input
                            type="number"
                            name={`design_${idx}`}
                            min="0"
                            max="50"
                            className="w-24 px-2 py-1 text-lg text-center border rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
                            placeholder="0-50"
                            defaultValue={team.design || ""}
                            onChange={(e) =>
                              setMarks((prev) => ({
                                ...prev,
                                [team._id]: {
                                  ...prev[team._id],
                                  design: Number(e.target.value),
                                },
                              }))
                            }
                          />
                        </td>
                        <td className="px-4 py-3 text-center">
                          <input
                            type="number"
                            name={`aptitude_${idx}`}
                            min="0"
                            max="20"
                            className="w-24 px-2 py-1 text-lg text-center border rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
                            placeholder="0-20"
                            defaultValue={team.aptitude || ""}
                            onChange={(e) =>
                              setMarks((prev) => ({
                                ...prev,
                                [team._id]: {
                                  ...prev[team._id],
                                  aptitude: Number(e.target.value),
                                },
                              }))
                            }
                          />
                        </td>
                        <td className="px-4 py-3 text-center">
                          <input
                            type="number"
                            name={`coding_${idx}`}
                            min="0"
                            max="20"
                            className="w-24 px-2 py-1 text-lg text-center border rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
                            placeholder="0-20"
                            defaultValue={team.coding || ""}
                            onChange={(e) =>
                              setMarks((prev) => ({
                                ...prev,
                                [team._id]: {
                                  ...prev[team._id],
                                  coding: Number(e.target.value),
                                },
                              }))
                            }
                          />
                        </td>
                        <td className="px-4 py-3 text-center">
                          <input
                            type="number"
                            name={`nontech_${idx}`}
                            min="0"
                            max="10"
                            className="w-24 px-2 py-1 text-lg text-center border rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
                            placeholder="0-10"
                            defaultValue={team.nontech || ""}
                            onChange={(e) =>
                              setMarks((prev) => ({
                                ...prev,
                                [team._id]: {
                                  ...prev[team._id],
                                  nontech: Number(e.target.value),
                                },
                              }))
                            }
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="flex justify-end mt-6">
                  <button
                    type="button"
                    onClick={handleSubmitMarks}
                    className="px-8 py-3 text-lg font-bold text-white transition bg-green-600 shadow rounded-xl hover:bg-green-700"
                  >
                    Submit Marks
                  </button>
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
