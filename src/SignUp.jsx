import React from "react";
import vcetLogo from "./assets/VCET Logo.jpg";
import cseLogo from "./assets/CSE LOGO.jpg";
import { useNavigate } from "react-router-dom";

import { useEffect } from "react";

const SignUp = () => {
  useEffect(() => {
    document.title = "Trialthon of Tech | Sign Up";
  }, []);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const payload = {
      teamName: form[0].value,
      year: form[1].value,
      leaderName: form[2].value,
      rollNo: form[3].value,
      contactNo: form[4].value,
      password: form[5].value,
      language: form[6].value,
      member1Name: form[7].value,
      member1Roll: form[8].value,
      member1Contact: form[9].value,
      member2Name: form[10].value,
      member2Roll: form[11].value,
      member2Contact: form[12].value,
    };

    try {
      const res = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        alert("Team Registered Successfully");
        navigate("/studentView");
      } else {
        alert("Signup failed: " + data.message);
      }
    } catch (err) {
      alert("Server error during signup");
      console.error(err);
    }
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
            className="px-5 py-2 mr-2 font-semibold transition border shadow rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-300 backdrop-blur-md"
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
            className="px-5 py-2 font-semibold text-green-700 transition border border-green-200 shadow rounded-xl bg-white/70 hover:bg-green-100 backdrop-blur-md"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>
      </header>

      <div className="z-10 flex justify-center w-full mt-8 mb-4">
        <div className="px-8 py-4 font-sans text-xl font-semibold text-center shadow-lg glassmorphism rounded-xl md:text-2xl text-slate-700">
          Department of Computer Science and Engineering
        </div>
      </div>

      <div className="z-10 flex justify-center w-full pb-16">
        <div className="w-full max-w-5xl p-8 shadow-xl bg-white/90 rounded-2xl glassmorphism">
          <h2 className="mb-6 text-2xl font-bold text-center text-slate-800">
            Trialthon of Tech : Event Registration
          </h2>
          <form className="grid grid-cols-2 gap-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 col-span-2 gap-6">
              <div>
                <label className="block mb-1 font-semibold text-slate-700">
                  Team Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your team name"
                  className="w-full px-4 py-2 border rounded-lg border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
              <div>
                <label className="block mb-1 font-semibold text-slate-700">
                  Year
                </label>
                <select className="w-full px-4 py-2 border rounded-lg border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-300">
                  <option value="">Select year</option>
                  <option value="II">II</option>
                  <option value="III">III</option>
                </select>
              </div>
            </div>

            <hr className="col-span-2 my-2 border-t-2 border-dashed border-slate-300" />

            <div className="grid grid-cols-2 col-span-2 gap-6">
              <div>
                <label className="block mb-1 font-semibold text-slate-700">
                  Team Leader Name
                </label>
                <input
                  type="text"
                  placeholder="Leader's name"
                  className="w-full px-4 py-2 border rounded-lg border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
              <div>
                <label className="block mb-1 font-semibold text-slate-700">
                  Roll No
                </label>
                <input
                  type="text"
                  placeholder="Leader's roll no"
                  className="w-full px-4 py-2 border rounded-lg border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
              <div>
                <label className="block mb-1 font-semibold text-slate-700">
                  Contact No.
                </label>
                <input
                  type="tel"
                  placeholder="Leader's contact no."
                  className="w-full px-4 py-2 border rounded-lg border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
              <div>
                <label className="block mb-1 font-semibold text-slate-700">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Create a password"
                  className="w-full px-4 py-2 border rounded-lg border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
              <div>
                <label className="block mb-1 font-semibold text-slate-700">
                  Code Language Prefer
                </label>
                <select className="w-full px-4 py-2 border rounded-lg border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-300">
                  <option value="">Select language</option>
                  <option value="C">C</option>
                  <option value="Java">Java</option>
                  <option value="C++">C++</option>
                  <option value="Python">Python</option>
                  <option value="JS">JavaScript</option>
                </select>
              </div>
            </div>

            <hr className="col-span-2 my-2 border-t-2 border-dashed border-slate-300" />

            <div className="grid grid-cols-2 col-span-2 gap-6">
              <div>
                <label className="block mb-1 font-semibold text-slate-700">
                  Member 1 Name{" "}
                  <span className="text-xs text-slate-400">(Optional)</span>
                </label>
                <input
                  type="text"
                  placeholder="Member 1 name"
                  className="w-full px-4 py-2 border rounded-lg border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
              <div>
                <label className="block mb-1 font-semibold text-slate-700">
                  Member 1 Roll No{" "}
                  <span className="text-xs text-slate-400">(Optional)</span>
                </label>
                <input
                  type="text"
                  placeholder="Member 1 roll no"
                  className="w-full px-4 py-2 border rounded-lg border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
              <div>
                <label className="block mb-1 font-semibold text-slate-700">
                  Member 1 Contact{" "}
                  <span className="text-xs text-slate-400">(Optional)</span>
                </label>
                <input
                  type="tel"
                  placeholder="Member 1 contact"
                  className="w-full px-4 py-2 border rounded-lg border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
            </div>

            <hr className="col-span-2 my-2 border-t-2 border-dashed border-slate-300" />

            <div className="grid grid-cols-2 col-span-2 gap-6">
              <div>
                <label className="block mb-1 font-semibold text-slate-700">
                  Member 2 Name{" "}
                  <span className="text-xs text-slate-400">(Optional)</span>
                </label>
                <input
                  type="text"
                  placeholder="Member 2 name"
                  className="w-full px-4 py-2 border rounded-lg border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
              <div>
                <label className="block mb-1 font-semibold text-slate-700">
                  Member 2 Roll No{" "}
                  <span className="text-xs text-slate-400">(Optional)</span>
                </label>
                <input
                  type="text"
                  placeholder="Member 2 roll no"
                  className="w-full px-4 py-2 border rounded-lg border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
              <div>
                <label className="block mb-1 font-semibold text-slate-700">
                  Member 2 Contact{" "}
                  <span className="text-xs text-slate-400">(Optional)</span>
                </label>
                <input
                  type="tel"
                  placeholder="Member 2 contact"
                  className="w-full px-4 py-2 border rounded-lg border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="col-span-2">
              <button
                type="submit"
                className="w-full py-3 mt-4 text-lg font-bold text-white transition bg-blue-500 rounded-lg shadow hover:bg-blue-600"
              >
                Register Team
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
