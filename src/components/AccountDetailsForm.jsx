import React, { useState } from "react";
import { Link } from "react-router-dom";

const AccountDetailsForm = ({ formData, handleInputChange, prevStep, handleSubmit }) => {
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const handleCheckboxChange = (e) => {
    setAgreeToTerms(e.target.checked);
  };

  return (
    <div className="flex flex-col w-full max-w-md mx-auto space-y-6">
      {/* Password Field */}
      <div className="flex flex-col">
        <label htmlFor="password" className="text-lg font-semibold text-gray-700">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleInputChange}
          className="mt-2 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          placeholder="Enter your password"
        />
      </div>

      {/* Terms and Conditions */}
      <div className="flex items-center">
        <input
          id="terms"
          name="terms"
          type="checkbox"
          checked={agreeToTerms}
          onChange={handleCheckboxChange}
          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <label htmlFor="terms" className="ml-2 text-gray-700">
          I agree to the{" "}
          <Link to="/terms" className="text-blue-500 hover:underline">
            Terms and Conditions
          </Link>
        </label>
      </div>

      {/* Redirect to Login */}
      <div>
        <p className="text-gray-600">
          Already a user?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Log in
          </Link>
        </p>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <button
          type="button"
          className="py-2 px-4 bg-gray-300 rounded-lg text-gray-700 hover:bg-gray-400"
          onClick={prevStep}
        >
          Previous
        </button>
        <button
          type="button"
          className={`py-2 px-4 rounded-lg text-white ${
            agreeToTerms ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
          }`}
          onClick={handleSubmit}
          disabled={!agreeToTerms}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default AccountDetailsForm;
