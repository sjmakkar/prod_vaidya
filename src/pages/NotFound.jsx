import React from 'react';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <div className="text-9xl font-extrabold">4</div>
      <div className="text-6xl animate-spin">?</div>
      <div className="text-9xl font-extrabold">4</div>
      <div className="mt-4 text-center text-lg">
        Maybe this page moved? Got deleted? Is hiding out in quarantine? Never existed in the first place? 
        <p>
          Let's go <a href="/" className="text-blue-500 hover:underline">home</a> and try from there.
        </p>
      </div>
    </div>
  );
};

export default NotFound;
