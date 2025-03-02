import React, { useState, useEffect, useContext, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthProvider";

const useAppointments = (userId, selectedDate, token, refreshTrigger) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAppointments = useCallback(async () => {
    if (!userId || !selectedDate) return;

    setLoading(true);
    setError(null);

    try {
      const { data } = await axios.get(
        `https://patient-production-be15.up.railway.app/api/patients/doctor/${userId}/date/${selectedDate}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setAppointments(
        Array.isArray(data)
          ? data.map(({ slot, patientName, doctor, mobileNo, patientId }) => ({
              slotId: slot?.slotId || "Unknown",
              time: `${slot?.startTime || "??"} - ${slot?.endTime || "??"}`,
              patientName: patientName || "Unknown",
              doctorName: doctor?.fullName || "Unknown",
              phoneNumber: mobileNo || "Unknown",
              status: slot?.status || "Unknown",
              patientId: patientId || "Unknown", // Add patientId
            }))
          : []
      );
    } catch {
      setError("Failed to fetch appointments.");
    } finally {
      setLoading(false);
    }
  }, [userId, selectedDate, token]);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments, refreshTrigger]);

  return { appointments, loading, error };
};

const AppointmentRow = ({ appointment }) => (
  <tr className="border-b hover:bg-gray-100">
    <td className="px-4 py-2">{appointment.slotId}</td>
    <td className="px-4 py-2">{appointment.time}</td>
    <td className="px-4 py-2">{appointment.patientName}</td>
    <td className="px-4 py-2">{appointment.doctorName}</td>
    <td className="px-4 py-2">{appointment.phoneNumber}</td>
    <td className="px-4 py-2">
      <Link 
        to={`/prescribe/${appointment.patientId}/${appointment.slotId}`} // Pass patientId in the URL
        className="text-blue-600 hover:underline"
      >
        Write Prescription
      </Link>
    </td>
  </tr>
);

const AppointmentsTable = ({ selectedDate, refreshTrigger }) => {
  const { user, token } = useContext(AuthContext);
  const { appointments, loading, error } = useAppointments(
    user?.userId,
    selectedDate,
    token,
    refreshTrigger
  );

  const tableContent = useMemo(() => {
    if (loading)
      return (
        <tr>
          <td className="px-4 py-2 text-center" colSpan="6">
            Loading...
          </td>
        </tr>
      );
    if (error)
      return (
        <tr>
          <td className="px-4 py-2 text-center text-red-500" colSpan="6">
            {error}
          </td>
        </tr>
      );
    if (appointments.length === 0)
      return (
        <tr className="border-b hover:bg-gray-100">
          <td className="px-4 py-2 text-center" colSpan="6">
            No appointments available for the selected date.
          </td>
        </tr>
      );
    return appointments.map((appointment, index) => (
      <AppointmentRow key={index} appointment={appointment} />
    ));
  }, [appointments, loading, error]);

  return (
    <div className="w-full max-w-[1000px] bg-white rounded-lg shadow-md overflow-x-auto">
      <table className="w-full table-auto border-collapse">
        <thead className="sticky top-0 bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">Slot ID</th>
            <th className="px-4 py-2 text-left">Time</th>
            <th className="px-4 py-2 text-left">Patient Name</th>
            <th className="px-4 py-2 text-left">Doctor</th>
            <th className="px-4 py-2 text-left">Phone Number</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>{tableContent}</tbody>
      </table>
    </div>
  );
};

export default AppointmentsTable;