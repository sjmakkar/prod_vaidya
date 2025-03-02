import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import backgroundImage from "../assets/hero-bg.jpg";

const ChangePassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      alert("Invalid token");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const payload = {
      token,
      newPassword,
    };

    try {
      const response = await fetch("https://userauth-production-61c5.up.railway.app/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert("Password reset successful");
      } else {
        alert("Failed to reset password");
      }
    } catch (error) {
      console.error("Error resetting password:", error);
    }
  };

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Blur Effect */}
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-md"></div>

      <div className="relative flex flex-col items-center px-6 py-8 w-full sm:max-w-md">
        {/* Updated Vaidya styling */}
        <a href="#" className="flex items-center mb-6 text-3xl font-extrabold text-gray-900 dark:text-white">
          <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text ">
            Vaidya
          </span>
        </a>
        <div className="w-full p-6 bg-white bg-opacity-90 rounded-lg shadow-lg dark:border dark:bg-gray-800 dark:border-gray-700 sm:p-8">
          <h2 className="mb-4 text-2xl font-bold tracking-tight text-gray-900 md:text-3xl dark:text-white">
            Change Password
          </h2>
          <form className="mt-4 space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                New Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirm-password"
                id="confirm-password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full text-white bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-all duration-300"
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ChangePassword;
