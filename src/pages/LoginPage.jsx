import React from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import backgroundImage from "../assets/hero-bg.jpg";

const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <div
      className="relative flex items-center justify-center min-h-screen bg-cover bg-center px-4"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      {/* Login Container (Fixed Height Same as SignupPage) */}
      <div className="relative flex w-full max-w-4xl h-[500px] bg-white shadow-lg rounded-lg overflow-hidden">
        
        {/* Left Side - Banner (Matches SignupPage) */}
        <div
          className="w-1/2 h-full flex flex-col items-center justify-center p-10 text-white"
          style={{
            background: "linear-gradient(to right, rgba(59, 130, 246, 0.8), rgba(147, 51, 234, 0.8))",
          }}
        >
          <h2 className="text-4xl font-bold text-center">Welcome to <span className="text-yellow-300">Vaidya</span></h2>
          <p className="mt-4 text-lg text-center">
            Log in to access your appointments and manage your healthcare seamlessly!
          </p>
        </div>

        {/* Right Side - Login Form (Fixed Height) */}
        <div className="w-1/2 h-full flex flex-col justify-center p-8">
          <LoginForm />

          {/* Signup Redirect */}
          <div className="mt-4 text-center">
            <p className="text-gray-700">
              Don't have an account?{" "}
              <button
                onClick={() => navigate("/signup")}
                className="text-blue-600 hover:text-blue-800 font-semibold transition duration-200"
              >
                Sign up here
              </button>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;
