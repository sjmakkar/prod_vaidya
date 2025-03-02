import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../auth/AuthProvider';
import CreateSlotForm from '../forms/CreateSlotForm'; // Import the form component

const CreateSlots = () => {
  const { user } = useContext(AuthContext);
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');

  // Fetch available slots based on selected date
  const fetchSlots = async () => {
    if (user && selectedDate) {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:8082/api/slots/search?date=${selectedDate}&userId=${user.userId}`
        );
        setSlots(response.data);
      } catch (error) {
        console.error('Error fetching slots:', error);
        alert('Error fetching slots. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchSlots();
  }, [selectedDate, user]);

  const renderSlots = () => {
    if (slots.length === 0) {
      return (
        <div className="flex flex-col items-center">
          <p className="text-gray-600 text-lg">No slots available. Please create new slots.</p>
          <button
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md mt-4 hover:bg-blue-600"
            onClick={() => setShowForm(true)}
          >
            + Create Slots
          </button>
        </div>
      );
    }

    return (
      <div className="flex space-x-4 overflow-x-auto mt-4">
        {slots.map((slot) => (
          <button
            key={slot.slotId}
            className="relative px-4 py-2 text-xs font-bold text-[#131313] transition-all duration-300 border-1 border-[#fff] rounded-xl bg-white shadow-[0_1px_0_1px_#000] overflow-hidden group hover:bg-blue-500 hover:text-white hover:shadow-[0_2px_0_2px_#0d3b66] active:scale-90"
          >
            <span className="absolute top-1/2 left-0 w-[-60px] h-[120%] bg-blue-500 transform -translate-y-1/2 skew-x-30 -translate-x-[150%] transition-transform duration-500 group-hover:translate-x-[150%]"></span>
            {`${slot.startTime}`}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold text-gray-800 mt-4">Manage Slots</h1>
      <div className="mb-4">
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="px-3 py-2 border rounded"
        />
      </div>
      {loading ? <p>Loading...</p> : renderSlots()}
      {showForm && (
        <CreateSlotForm
          fetchSlots={fetchSlots} // Pass the fetch function for updating slots
          closeForm={() => setShowForm(false)}
        />
      )}
    </div>
  );
};

export default CreateSlots;
