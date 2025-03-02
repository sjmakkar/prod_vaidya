import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Header from "../components/Header";
import { AuthContext } from "../context/AuthProvider";

const PrescriptionPage = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const { user, token } = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState(1);
  const prescriptionsPerPage = 5;
  const [selectedDate, setSelectedDate] = useState(getTodayDate());

  function getTodayDate() {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  }

  const fetchPrescriptions = async (date) => {
    if (!user || !user.userId) {
      console.error("User information is not available yet.");
      return;
    }

    try {
      const response = await axios.get(
        `https://prescription-production-39f5.up.railway.app/api/prescriptions/user/${user.userId}/date/${date}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const mappedData = Array.isArray(response.data)
        ? response.data.map((item) => ({
            prescriptionId: item.prescriptionId || "Unknown",
            patientId: item.patient.patientId || "Unknown",
            patientName: item.patient.patientName || "Unknown",
            mobileNo: item.patient.mobileNo || "Unknown",
            email: item.patient.email || "Unknown",
          }))
        : [];
      setPrescriptions(mappedData);
      setCurrentPage(1);
    } catch (error) {
      console.error("Error fetching prescription data", error);
    }
  };

  useEffect(() => {
    fetchPrescriptions(selectedDate);
  }, [selectedDate, user]);

  const totalPages = Math.ceil(prescriptions.length / prescriptionsPerPage);

  const currentData = prescriptions.slice(
    (currentPage - 1) * prescriptionsPerPage,
    currentPage * prescriptionsPerPage
  );

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleDateChange = (e) => {
    const date = e.target.value;
    setSelectedDate(date);
  };

  const handleRowClick = (prescriptionId) => {
    // Open PrescriptionForm in a new tab
    const url = `/prescription/view/${prescriptionId}`;
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex justify-center items-center mt-6">
        <div className="w-full max-w-[1000px] bg-white rounded-lg shadow-md p-6">
          <div className="mb-6">
            <label
              htmlFor="date-picker"
              className="block text-gray-700 font-semibold mb-2 text-lg"
            >
              Select Date
            </label>
            <input
              type="date"
              id="date-picker"
              value={selectedDate}
              onChange={handleDateChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition ease-in-out"
            />
          </div>

          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-blue-100 border-b">
                <th className="px-4 py-2 text-left">Patient ID</th>
                <th className="px-4 py-2 text-left">Patient Name</th>
                <th className="px-4 py-2 text-left">Doctor Name</th>
                <th className="px-4 py-2 text-left">Mobile No</th>
                <th className="px-4 py-2 text-left">Email</th>
              </tr>
            </thead>
            <tbody>
              {currentData.length > 0 ? (
                currentData.map((item) => (
                  <tr
                    key={item.prescriptionId}
                    className="border-b hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleRowClick(item.prescriptionId)}
                  >
                    <td className="px-4 py-2">{item.patientId}</td>
                    <td className="px-4 py-2">{item.patientName}</td>
                    <td className="px-4 py-2">{user.fullName}</td>
                    <td className="px-4 py-2">{item.mobileNo}</td>
                    <td className="px-4 py-2">{item.email}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center px-4 py-2 text-gray-500">
                    No data available for the selected date.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {totalPages > 1 && (
            <div className="mt-4 flex justify-center space-x-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
              >
                Previous
              </button>
              <span className="px-4 py-2">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PrescriptionPage;