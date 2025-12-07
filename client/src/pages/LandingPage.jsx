import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../api/apiHandler.js";
import { Navigate, useNavigate } from "react-router";

const LandingPage = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState("login"); // 'login' | 'register'
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&])[a-zA-Z0-9@#$%&]+$/;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (mode === "register" && name === "password") {
      if (!value) {
        setPasswordCheck("");
      } else if (!passwordRegex.test(value)) {
        setPasswordCheck(
          "Password must contain at least one uppercase letter, one lowercase letter, and one special character (@, #, $, %, &)."
        );
      } else {
        setPasswordCheck("");
      }
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.email || !form.password) {
      setError("Please fill in all required fields.");
      return;
    }

    if (mode === "register") {
      if (!form.confirmPassword) {
        setError("Please confirm your password.");
        return;
      }
      if (form.password !== form.confirmPassword) {
        setError("Passwords don't match.");
        return;
      }
    }
    const endpoint = `/user/${mode}`;
    try {
      const res = await api.post(endpoint, form);
      setForm({ email: "", password: "", confirmPassword: "" });
      console.log(res);
      navigate("/");
    } catch (error) {
      console.log(error);
      alert(`${mode} failed`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <motion.div
        layout
        transition={{ duration: 0.3, type: "spring", stiffness: 100 }}
        className="w-full max-w-md bg-white rounded-lg shadow-md p-8 overflow-hidden"
      >
        <div className="flex justify-center mb-6">
          <button
            onClick={() => setMode("login")}
            className={`px-4 py-2 rounded-tl-md rounded-bl-md focus:outline-none transition-colors duration-300 ${
              mode === "login"
                ? "bg-sky-100 text-sky-700"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setMode("register")}
            className={`px-4 py-2 rounded-tr-md rounded-br-md focus:outline-none transition-colors duration-300 ${
              mode === "register"
                ? "bg-sky-100 text-sky-700"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            Register
          </button>
        </div>

        <div className="h-10 mb-4 relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.h2
              key={mode} // if key changes, react treats this as a new component
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="text-center text-2xl font-semibold text-gray-800 absolute w-full"
            >
              {mode === "login" ? "Welcome back" : "Create your account"}
            </motion.h2>
          </AnimatePresence>
        </div>

        <form onSubmit={onSubmit} className="space-y-5">
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-sky-200 transition-all"
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="relative z-10">
            <label className="block font-semibold text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-sky-200 transition-all"
              placeholder="Enter password"
              required
            />
            <AnimatePresence>
              {passwordCheck && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute mt-1 w-full px-2 py-1 bg-red-300 border-2 border-red-300 rounded-md shadow-lg text-xs z-20"
                >
                  {passwordCheck}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <AnimatePresence>
            {mode === "register" && (
              <motion.div
                key="confirm-password-field"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="pt-1 pb-1">
                  <label className="block font-semibold text-gray-700 mb-1">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-sky-200 transition-all"
                    placeholder="Confirm password"
                    required
                  />
                  {error && (
                    <div className="absolute px-2 py-1 bg-red-300 border-2 border-red-300 rounded-md shadow-lg text-xs z-20">
                      {error}
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            type="submit"
            className="w-full py-2 rounded text-white bg-sky-400 hover:bg-sky-500 focus:outline-none transition duration-300 relative h-10"
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={mode}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                {mode === "login" ? "Sign In" : "Register"}
              </motion.span>
            </AnimatePresence>
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default LandingPage;
