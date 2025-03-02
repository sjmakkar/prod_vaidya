import { useState } from "react";

const ForgotPassword = ({ onBack }) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async () => {
    if (!email) {
      alert("Please enter your email.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:8080/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("Failed to send reset link");
      }

      setMessage("A reset link has been sent to your email.");
    } catch (error) {
      console.error("Error:", error);
      setMessage("Failed to send reset link. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="bg-white rounded-lg  p-6 w-full max-w-lg flex flex-col justify-between h-[450px]">
        <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">
          Reset Your Password
        </h2>
        <p className="text-gray-600 text-sm text-center mb-4">
          Enter your email to receive a password reset link.
        </p>

        <div className="flex flex-col flex-grow justify-center space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="mt-1 p-3 block w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button
            onClick={handleForgotPassword}
            className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 transition"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>

          {message && <p className="text-green-500 text-sm text-center">{message}</p>}

          <button
            onClick={onBack}
            className="text-gray-600 text-sm hover:underline text-center"
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
