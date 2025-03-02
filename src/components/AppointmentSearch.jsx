import React, { useState, useContext, useEffect, useRef } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthProvider";
import CreateSlotForm from "../forms/CreateSlotForm";
import BookAppointmentForm from "../forms/BookAppointmentForm";

const AppointmentSearchWithSlots = ({ selectedDate, setSelectedDate, refreshTrigger, onBookingComplete }) => {
  const { user, token } = useContext(AuthContext);
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const calendarRef = useRef(null);

  const fetchSlots = async () => {
    if (user) {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://slot-production.up.railway.app/api/slots/search?date=${selectedDate}&userId=${user.userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const filteredSlots = response.data.filter(
          (slot) =>
            slot.startTime.includes(searchQuery) ||
            slot.endTime.includes(searchQuery) ||
            slot.date === selectedDate
        );
        setSlots(filteredSlots);
      } catch (error) {
        console.error("Error fetching slots:", error);
        setSlots([]);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchSlots();
  }, [selectedDate, searchQuery, user, refreshTrigger]); // Add refreshTrigger to refetch slots

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setCalendarVisible(false);
      }
    };

    if (calendarVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [calendarVisible]);

  const toggleCalendar = () => {
    setCalendarVisible((prev) => !prev);
  };

  const handleSlotClick = (slot) => {
    setSelectedSlot(slot);
  };

  const renderSlots = () => {
    if (slots.length === 0) {
      return (
        <div className="flex flex-col items-center">
          <p className="text-gray-600 text-lg">
            No slots available for the selected date. Please create new slots.
          </p>
        </div>
      );
    }

    return (
      <div
        className="flex space-x-4 overflow-x-auto mt-4 p-4 bg-white rounded-md shadow-md max-w-full custom-scrollbar"
        style={{
          whiteSpace: "nowrap",
          scrollbarWidth: "thin",
          scrollbarColor: "#6b7280 #f3f4f6",
        }}
      >
        {slots.map((slot) => (
          <button
            key={slot.slotId}
            onClick={() => handleSlotClick(slot)}
            className="inline-block px-4 py-2 text-xs font-bold text-[#131313] transition-all duration-300 border border-[#fff] rounded-xl bg-white shadow-md hover:bg-blue-500 hover:text-white active:scale-90"
          >
            {slot.startTime}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex items-center justify-between w-[1000px] h-[45px] space-x-6 p-2">
        <div className="flex items-center text-lg font-semibold text-customTextBlue space-x-2 relative">
          <span>Appointment</span>
          <div className="relative" ref={calendarRef}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-5 w-5 text-customTextBlue cursor-pointer"
              onClick={toggleCalendar}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 2.994v2.25m10.5-2.25v2.25m-14.252 13.5V7.491a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v11.251m-18 0a2.25 2.25 0 0 0 2.25 2.25h13.5a2.25 2.25 0 0 0 2.25-2.25m-18 0v-7.5a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v7.5m-6.75-6h2.25m-9 2.25h4.5"
              />
            </svg>
            {calendarVisible && (
              <div className="absolute top-[30px] left-0 z-10 p-2 bg-white border border-gray-300 rounded-md shadow-md">
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="border border-gray-300 p-2 rounded-md"
                />
              </div>
            )}
          </div>
        </div>
        <div className="relative w-[710px]">
          <input
            type="text"
            placeholder="Search Appointments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-3 py-1 rounded-md border border-customTextBlue placeholder-customTextBlue focus:outline-none focus:border-blue-500"
          />
        </div>
        <button
          className="bg-blue-500 text-white font-semibold h-[40px] px-3 rounded-md hover:bg-blue-500 text-sm whitespace-nowrap"
          onClick={() => setShowCreateForm(true)}
        >
          + Create Slots
        </button>
      </div>
      {loading ? <p>Loading...</p> : renderSlots()}
      {showCreateForm && (
        <CreateSlotForm
          fetchSlots={fetchSlots}
          closeForm={() => setShowCreateForm(false)}
        />
      )}
      {selectedSlot && (
        <BookAppointmentForm
          key={selectedSlot.slotId}
          slotId={selectedSlot.slotId}
          doctorId={selectedSlot.doctor.userId}
          closeForm={() => setSelectedSlot(null)}
          selectedDate={selectedDate}
          refreshSlots={fetchSlots}
          startTime={selectedSlot.startTime}
          onBookingComplete={onBookingComplete} // Pass to booking form
        />
      )}
    </div>
  );
};

export default AppointmentSearchWithSlots;