import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import ForgotPassword from "./ForgotPassword";

const LoginForm = () => {
  const [userEmail, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userEmail || !password) {
      alert("Please enter both email and password.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("https://userauth-production-61c5.up.railway.app/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userEmail, password }),
      });

      if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

      const data = await response.json();
      const { token, fullName, userId ,roleId} = data;
      login({ fullName, userId, userEmail, roleId }, token);

      setEmail("");
      setPassword("");

      window.location = "/";
    } catch (error) {
      console.error("Error:", error);
      setError("Incorrect email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="bg-white rounded-lg  p-6 w-full max-w-lg flex flex-col justify-between h-[450px]">
        {showForgotPassword ? (
          <ForgotPassword onBack={() => setShowForgotPassword(false)} />
        ) : (
          <>
            <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">
              Login to <span className="text-blue-600">Vaidya</span>
            </h2>
            {error && <div className="text-red-500 text-sm text-center mb-3">{error}</div>}

            <form onSubmit={handleSubmit} className="flex flex-col flex-grow justify-center space-y-4">
              <div>
                <label htmlFor="userEmail" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  id="userEmail"
                  type="email"
                  value={userEmail}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 p-3 block w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 p-3 block w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your password"
                />
              </div>

              <div className="flex justify-between items-center">
                <label className="flex items-center text-sm text-gray-700">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                    className="mr-2"
                  />
                  Remember Me
                </label>
                <button
                  type="button"
                  className="text-blue-600 text-sm hover:underline"
                  onClick={() => setShowForgotPassword(true)}
                >
                  Forgot Password?
                </button>
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 transition"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Log In"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginForm;
