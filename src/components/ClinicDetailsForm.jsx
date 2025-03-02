import React from 'react';

const ClinicDetailsForm = ({ formData, handleInputChange, nextStep, prevStep }) => {
  return (
    <div className="space-y-6 w-full max-w-lg mx-auto">
      {/* Clinic Name */}
      <div className="flex flex-col">
        <label htmlFor="clinic-name" className="text-lg font-semibold text-gray-700">Clinic Name</label>
        <input
          id="clinic-name"
          name="clinicName"
          type="text"
          value={formData.clinicName}
          onChange={handleInputChange}
          className="mt-2 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          placeholder="e.g., Health Clinic"
        />
      </div>

      {/* Opening Time */}
      <div className="flex flex-col">
        <label htmlFor="opening-time" className="text-lg font-semibold text-gray-700">Opening Time</label>
        <input
          id="opening-time"
          name="openingTime"
          type="time"
          value={formData.openingTime}
          onChange={handleInputChange}
          className="mt-2 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
        />
      </div>

      {/* Closing Time */}
      <div className="flex flex-col">
        <label htmlFor="closing-time" className="text-lg font-semibold text-gray-700">Closing Time</label>
        <input
          id="closing-time"
          name="closingTime"
          type="time"
          value={formData.closingTime}
          onChange={handleInputChange}
          className="mt-2 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
        />
      </div>

      {/* Address */}
      <div className="flex flex-col">
        <label htmlFor="address" className="text-lg font-semibold text-gray-700">Address</label>
        <input
          id="address"
          name="address"
          type="text"
          value={formData.address}
          onChange={handleInputChange}
          className="mt-2 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          placeholder="e.g., 123 Main St"
        />
      </div>

      <div className="flex justify-between mt-8">
        <button
          type="button"
          className="py-2 px-4 bg-gray-300 rounded-lg text-gray-700 hover:bg-gray-400"
          onClick={prevStep}
        >
          Previous
        </button>
        <button
          type="button"
          className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          onClick={nextStep}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ClinicDetailsForm;
