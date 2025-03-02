import React, { useState } from 'react';
import Header from '../components/Header';
import AppointmentSearch from '../components/AppointmentSearch';
import AppointmentDetails from '../components/AppointmentDetails';

const AppointmentPage = () => {
  const [selectedDate, setSelectedDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [refreshKeys, setRefreshKey] = useState(0);

  const refreshAppointments = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div>
      <Header />
      <div className="bg-customBlue min-h-screen flex flex-col items-center">
        <div className="w-full max-w-[1000px] mt-10 px-4">
          <div className="mt-6">
            <AppointmentSearch 
              selectedDate={selectedDate} 
              setSelectedDate={setSelectedDate} 
              refreshTrigger={refreshKeys}
              onBookingComplete={refreshAppointments} // Pass refresh function
            />
          </div>
          <div className="mt-6">
            <AppointmentDetails 
              selectedDate={selectedDate} 
              refreshTrigger={refreshKeys}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentPage;