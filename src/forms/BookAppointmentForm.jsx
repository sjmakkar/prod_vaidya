import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthProvider';
import axios from 'axios';

const BookAppointmentForm = ({ 
  slotId, 
  doctorId, 
  slotTime, 
  patientDetails, 
  closeForm, 
  refreshSlots, 
  selectedDate, 
  startTime, 
  onBookingComplete // Added prop
}) => {
  const { user, token } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    patientName: '',
    phoneNumber: '',
    email: '',
    aadharNo: '',
    age: '',
    address: ''
  });
  const [patientsList, setPatientsList] = useState([]);
  const [showPatientListModal, setShowPatientListModal] = useState(false);

  const handleMobileNumberBlur = async (event) => {
    const phoneNumber = event.target.value;
    if (phoneNumber) {
      try {
        const response = await axios.get(`https://patient-production-be15.up.railway.app/api/patients/search1?phoneNumber=${phoneNumber}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        const patientData = response.data;

        if (patientData.length > 1) {
          setPatientsList(patientData);
          setShowPatientListModal(true);
        } else if (patientData.length === 1) {
          autoFillForm(patientData[0]);
        } else {
          alert('No existing user, enter details');
          setFormData({ ...formData, phoneNumber: phoneNumber, patientName: '' });
        }
      } catch (error) {
        console.error('Error fetching patient details:', error);
      }
    }
  };

  const autoFillForm = (patient) => {
    setFormData({
      patientName: patient.patientName || '',
      phoneNumber: patient.phoneNumber || '',
      email: patient.email || '',
      aadharNo: patient.aadharNo || '',
      age: patient.age || '',
      address: patient.address || ''
    });
  };

  const registerNewPatient = () => {
    setShowPatientListModal(false);
    setFormData({ ...formData, patientName: '', aadharNo: '', age: '', address: '' });
  };

  const handlePatientSelection = (selectedPatient) => {
    autoFillForm(selectedPatient);
    setShowPatientListModal(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const appointmentDetails = {
      patientName: formData.get('patientName'),
      phoneNumber: formData.get('phoneNumber'),
      email: formData.get('email'),
      aadharNo: formData.get('aadharNo'),
      age: formData.get('age'),
      dateTime: `${selectedDate}T${startTime}`,
      address: formData.get('address'),
      roleId: 1,
      doctor: {
        userId: doctorId // Use doctorId prop instead of user.userId
      },
      slot: {
        slotId: slotId
      }
    };

    try {
      await axios.post('https://patient-production-be15.up.railway.app/api/patients/post', appointmentDetails, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });
      alert("Appointment booked successfully!");

      const updateStatusUrl = `https://slot-production.up.railway.app/api/slots/${slotId}?status=no`;
      await axios.put(updateStatusUrl, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Appointment booked successfully!");
      refreshSlots(); // Refresh slots in AppointmentSearch
      onBookingComplete(); // Trigger refresh in AppointmentDetails
      closeForm(); // Close the form
    } catch (error) {
      console.error('Error booking appointment:', error);
      alert("Failed to book appointment.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-md shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Book Appointment</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Mobile</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
              onBlur={handleMobileNumberBlur}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Patient Name</label>
            <input
              type="text"
              name="patientName"
              value={formData.patientName}
              onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Aadhar Number</label>
            <input
              type="text"
              name="aadharNo"
              value={formData.aadharNo}
              onChange={(e) => setFormData({ ...formData, aadharNo: e.target.value })}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={closeForm}
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-1 px-4 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded-md"
            >
              Book
            </button>
          </div>
        </form>

        {showPatientListModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-md shadow-lg w-96">
              <h2 className="text-xl font-bold mb-4">Select Patient</h2>
              <ul>
                {patientsList.map((patient, index) => (
                  <li
                    key={index}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handlePatientSelection(patient)}
                  >
                    {patient.patientName}
                  </li>
                ))}
              </ul>
              <div className="flex justify-end mt-4 space-x-2">
                <button
                  className="bg-green-500 hover:bg-green-600 text-white text-sm py-1 px-3 rounded-md flex-1"
                  onClick={() => registerNewPatient()}
                >
                  New Patient
                </button>
                <button
                  className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-1 px-4 rounded-md flex-1"
                  onClick={() => setShowPatientListModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookAppointmentForm;