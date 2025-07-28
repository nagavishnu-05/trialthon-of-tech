import React from "react";
import vcetLogo from "./assets/VCET Logo.jpg";
import cseLogo from "./assets/CSE LOGO.jpg";
import { useNavigate } from "react-router-dom";
//import { authenticateUser } from "./auth/authHelpers";

import { useEffect } from "react";

const Login = () => {
  useEffect(() => {
    document.title = "Trialthon of Tech | Login";
  }, []);
  const navigate = useNavigate();
  const [error, setError] = React.useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rollNo: username, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        if (data.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/studentView");
        }
      } else {
        setError("Invalid username or password");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Server error. Please try again later.");
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-start min-h-screen overflow-hidden bg-gradient-to-b from-white via-white to-blue-100">
      {/* Cloud shapes */}
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
            className="px-5 py-2 font-semibold text-blue-700 transition border border-blue-200 shadow rounded-xl bg-white/70 hover:bg-blue-100 backdrop-blur-md"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </button>
        </div>
      </header>

      <div className="z-10 flex justify-center w-full mt-8 mb-4">
        <div className="px-8 py-4 font-sans text-xl font-semibold text-center shadow-lg glassmorphism rounded-xl md:text-2xl text-slate-700">
          Department of Computer Science and Engineering
        </div>
      </div>

      <div className="z-10 flex justify-center w-full pb-16">
        <div className="w-full max-w-md p-8 shadow-xl bg-white/90 rounded-2xl glassmorphism">
          <h2 className="mb-6 text-2xl font-bold text-center text-slate-800">
            Trialthon of Tech : Team Login
          </h2>
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label className="block mb-1 font-semibold text-slate-700">
                Team Leader Roll No.
              </label>
              <input
                name="username"
                type="text"
                placeholder="Enter your roll number"
                className="w-full px-4 py-2 border rounded-lg border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
                autoComplete="username"
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold text-slate-700">
                Password
              </label>
              <input
                name="password"
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 border rounded-lg border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
                autoComplete="current-password"
              />
            </div>
            {error && (
              <div className="font-semibold text-center text-red-600">
                {error}
              </div>
            )}
            <button
              type="submit"
              className="w-full py-3 mt-4 text-lg font-bold text-white transition bg-blue-500 rounded-lg shadow hover:bg-blue-600"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
