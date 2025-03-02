import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthProvider';

const CreateSlotForm = ({ closeForm, fetchSlots }) => {
  const { user , token  } = useContext(AuthContext); // Access user context
  const [formData, setFormData] = useState({
    startTime: '',
    endTime: '',
    slotRange: '',
    date: '',
  });
  const [loading, setLoading] = useState(false);

  // Handle input changes 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle creating new slots
  const handleCreateSlots = async () => {
    if (!user) {
      alert('User not authenticated');
      return;
    }

    const payload = {
      ...formData,
      userId: user.userId, // Use the userId from AuthContext
    };

    setLoading(true);
    try {
      await axios.post('https://slot-production.up.railway.app/api/slots/create', payload,{
        headers : {
          Authorization: `Bearer ${token}`,

        }
      });
      alert('Slot created successfully!');
      
      fetchSlots(); // Fetch updated slots
      closeForm(); // Close the form
    } catch (error) {
      console.error('Error creating slots:', error);
      alert('Error creating slots. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="w-full max-w-md bg-white shadow p-6 rounded-md">
        <h3 className="text-lg font-bold mb-4">Create Slots</h3>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Start Time</label>
          <input
            type="time"
            name="startTime"
            value={formData.startTime}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">End Time</label>
          <input
            type="time"
            name="endTime"
            value={formData.endTime}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Slot Range</label>
          <select
            name="slotRange"
            value={formData.slotRange}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="">Select Range</option>
            <option value="10 minutes">10 minutes</option>
            <option value="15 minutes">15 minutes</option>
            <option value="30 minutes">30 minutes</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="flex justify-end">
          <button
            className={`bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={handleCreateSlots}
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
          <button
            className="bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-md ml-2 hover:bg-gray-400"
            onClick={closeForm}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateSlotForm;
