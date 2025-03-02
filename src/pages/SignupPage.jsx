import React from "react";
import { useNavigate } from "react-router-dom";
import SignupForm from "../components/SignupForm";
import backgroundImage from "../assets/hero-bg.jpg";

const SignupPage = () => {
  const navigate = useNavigate();

  return (
    <div
      className="relative flex items-center justify-center min-h-screen bg-cover bg-center px-4"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      {/* Signup Container */}
      <div className="relative flex w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Left Side - Banner */}
        <div
          className="w-1/2 flex flex-col items-center justify-center p-10 text-white"
          style={{
            background: "linear-gradient(to right, rgba(59, 130, 246, 0.8), rgba(147, 51, 234, 0.8))",
          }}
        >
          <h2 className="text-4xl font-bold text-center">Join <span className="text-yellow-300">Vaidya</span></h2>
          <p className="mt-4 text-lg text-center">
            Create an account and experience seamless appointment management with us!
          </p>
        </div>

        {/* Right Side - Signup Form */}
        <div className="w-1/2 flex flex-col justify-center p-8">
          <SignupForm />

          {/* Login Redirect */}
          <div className="mt-4 text-center">
            <p className="text-gray-700">
              Already have an account?{" "}
              <button
                onClick={() => navigate("/login")}
                className="text-blue-600 hover:text-blue-800 font-semibold transition duration-200"
              >
                Login here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
