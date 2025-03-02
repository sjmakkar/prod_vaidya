import React, { createContext, useState } from 'react';

// Create the context
export const DateContext = createContext();

// Create a provider component
export const DateProvider = ({ children }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <DateContext.Provider value={{ selectedDate, setSelectedDate }}>
      console.log(selectedDate)
      {children}
    </DateContext.Provider>
  );
};
