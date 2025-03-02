import React from "react";

const PersonalDetailsForm = ({ formData, handleInputChange, nextStep }) => {
  return (
    <div className="space-y-6">
      {/* Full Name */}
      <div>
        <label className="block text-lg font-semibold text-gray-700">Full Name</label>
        <input
          name="fullName"
          type="text"
          value={formData.fullName}
          onChange={handleInputChange}
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          placeholder="John Doe"
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-lg font-semibold text-gray-700">Email</label>
        <input
          name="userEmail"
          type="email"
          value={formData.userEmail}
          onChange={handleInputChange}
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          placeholder="john.doe@example.com"
        />
      </div>

      {/* Phone Number */}
      <div>
        <label className="block text-lg font-semibold text-gray-700">Phone Number</label>
        <input
          name="phoneNumber"
          type="tel"
          value={formData.phoneNumber}
          onChange={handleInputChange}
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          placeholder="9876543210"
        />
      </div>

      {/* Aadhar Card */}
      <div>
        <label className="block text-lg font-semibold text-gray-700">Aadhar Card</label>
        <input
          name="aadharNo"
          type="text"
          value={formData.aadharNo}
          onChange={handleInputChange}
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          placeholder="1234-5678-9012"
        />
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-end mt-6">
        <button
          type="button"
          className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all"
          onClick={nextStep}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PersonalDetailsForm;
