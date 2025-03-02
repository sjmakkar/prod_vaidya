import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import axios from "axios";
import Header from "../components/Header";
import generatePrescriptionPDF from "../utils/pdfGenerator";
import prescribe from "../assets/prescribe2.png";

const PrescriptionForm = ({ viewMode = false, initialData = null, patientId: propPatientId, slotId: propSlotId }) => {
  const { user, token } = useContext(AuthContext);
  const { prescriptionId, patientId: urlPatientId, slotId: urlSlotId } = useParams();
  const patientId = propPatientId || urlPatientId;
  const slotId = propSlotId || urlSlotId;
  const currentDate = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    doctorName: "",
    specialization: "",
    address: "",
    clinicHours: "",
    clinicName: "",
    patientName: "",
    patientId: "",
    age: "",
    date: currentDate,
    weight: "",
    fever: "",
    bloodPressureSystolic: "",
    bloodPressureDiastolic: "",
    sugar: "",
    tests: "",
    history: "",
    prescription: "",
  });

  useEffect(() => {
    console.log("Initial token:", token); // Debug initial token
    if (viewMode && initialData) {
      const [systolic, diastolic] = initialData.bp ? initialData.bp.split("/") : ["", ""];
      setFormData({
        doctorName: String(initialData.user.fullName || ""),
        specialization: String(initialData.user.specialization || ""),
        address: String(initialData.user.address || ""),
        clinicHours: `${String(initialData.user.openTime?.slice(0, 5) || "")} - ${String(initialData.user.closeTime?.slice(0, 5) || "")}`,
        clinicName: String(initialData.user.clinicName || ""),
        patientName: String(initialData.patient.patientName || ""),
        patientId: String(initialData.patient.patientId || ""),
        age: String(initialData.patient.age || ""),
        date: String(initialData.date || currentDate),
        weight: String(initialData.weight || ""),
        fever: String(initialData.fever || ""),
        bloodPressureSystolic: String(systolic || ""),
        bloodPressureDiastolic: String(diastolic || ""),
        sugar: String(initialData.sugar || ""),
        tests: String(initialData.test ? initialData.test.join(", ") : ""),
        history: String(initialData.history ? initialData.history.join(", ") : ""),
        prescription: String(initialData.medicine ? initialData.medicine.join(", ") : ""),
      });
    } else if (viewMode && prescriptionId && !initialData && token) { // Wait for token
      const fetchPrescription = async () => {
        console.log("Fetching with token:", token);
        try {
          const response = await axios.get(
            `https://prescription-production-39f5.up.railway.app/api/prescriptions/${prescriptionId}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          const data = response.data;
          console.log("Fetched data:", data);
          const [systolic, diastolic] = data.bp ? data.bp.split("/") : ["", ""];
          setFormData({
            doctorName: String(data.user.fullName || ""),
            specialization: String(data.user.specialization || ""),
            address: String(data.user.address || ""),
            clinicHours: `${String(data.user.openTime?.slice(0, 5) || "")} - ${String(data.user.closeTime?.slice(0, 5) || "")}`,
            clinicName: String(data.user.clinicName || ""),
            patientName: String(data.patient.patientName || ""),
            patientId: String(data.patient.patientId || ""),
            age: String(data.patient.age || ""),
            date: String(data.date || currentDate),
            weight: String(data.weight || ""),
            fever: String(data.fever || ""),
            bloodPressureSystolic: String(systolic || ""),
            bloodPressureDiastolic: String(diastolic || ""),
            sugar: String(data.sugar || ""),
            tests: String(data.test ? data.test.join(", ") : ""),
            history: String(data.history ? data.history.join(", ") : ""),
            prescription: String(data.medicine ? data.medicine.join(", ") : ""),
          });
        } catch (error) {
          console.error("Error fetching prescription:", error.response?.status, error.response?.data);
          alert("Failed to load prescription details. Status: " + (error.response?.status || "Unknown"));
        }
      };
      fetchPrescription();
    } else if (!viewMode && user?.userId && patientId && token) {
      const fetchData = async () => {
        try {
          const doctorResponse = await axios.get(
            `https://userauth-production-a0f4.up.railway.app/doctor/${user.userId}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          const doctorData = doctorResponse.data;

          const patientResponse = await axios.get(
            `https://patient-production-be15.up.railway.app/api/patients/${patientId}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          const patientData = patientResponse.data;

          setFormData((prev) => ({
            ...prev,
            doctorName: String(doctorData.fullName || ""),
            specialization: String(doctorData.specialization || ""),
            address: String(doctorData.address || ""),
            clinicHours: doctorData.openTime && doctorData.closeTime
              ? `${String(doctorData.openTime.slice(0, 5))} - ${String(doctorData.closeTime.slice(0, 5))}`
              : "",
            clinicName: String(doctorData.clinicName || ""),
            patientName: String(patientData.patientName || ""),
            patientId: String(patientData.patientId || patientId),
            age: String(patientData.age || ""),
          }));
        } catch (error) {
          console.error("Error fetching data:", error);
          alert("Failed to fetch doctor or patient data.");
        }
      };
      fetchData();
    }
  }, [viewMode, initialData, prescriptionId, user?.userId, token, patientId]);

  const handleChange = (e) => {
    if (!viewMode) {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: String(value) });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (viewMode) return;

    const payload = {
      fever: parseFloat(formData.fever) || null,
      weight: parseFloat(formData.weight) || null,
      bp: `${formData.bloodPressureSystolic}/${formData.bloodPressureDiastolic}`,
      sugar: parseInt(formData.sugar) || null,
      test: formData.tests ? formData.tests.split(",").map((t) => t.trim()) : [],
      medicine: formData.prescription ? formData.prescription.split(",").map((p) => t.trim()) : [],
      history: formData.history ? formData.history.split(",").map((h) => h.trim()) : [],
      user: { userId: user?.userId },
      slot: { slotId: parseInt(slotId) },
      patient: { patientId: parseInt(patientId) },
      date: formData.date,
    };

    try {
      const response = await axios.post(
        "https://prescription-production-39f5.up.railway.app/api/prescriptions/post",
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 201) {
        alert("Prescription submitted successfully!");
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("Failed to submit prescription.");
    }
  };

  const generatePDF = () => {
    try {
      generatePrescriptionPDF(formData, prescribe);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF.");
    }
  };

  const inputProps = viewMode ? { disabled: true, className: "bg-[#E6F0FF] border border-[#B3CDE0]" } : {};
  const buttonProps = viewMode ? { className: "hidden" } : {};

  return (
    <div>
      <Header />
      <div className="p-8 bg-[#F5F6F5] min-h-screen flex justify-center">
        <div
          id="prescription-form"
          className="bg-white p-8 shadow-lg rounded-lg w-full max-w-4xl border border-[#CBD5E0]"
        >
          <div id="prescription-content" className="text-[#2D3748]">
            <div className="mb-6 pb-4 border-b-2 border-[#CBD5E0]">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-2xl font-bold">{formData.doctorName}</h1>
                  <p className="text-sm text-[#4B7BA8] mt-2">{formData.specialization}</p>
                </div>
                <div className="text-right">
                  <span className="text-xl font-semibold">{formData.clinicName}</span>
                  <p className="text-sm text-[#4B7BA8] mt-2">{formData.address}</p>
                  <p className="text-sm text-[#4B7BA8] mt-2">{formData.clinicHours}</p>
                </div>
              </div>
            </div>

            <div className="mb-6 pb-4 border-b-2 border-[#CBD5E0]">
              <h2 className="text-xl font-semibold mb-4">Patient Information</h2>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-[#4B7BA8] block mb-2">Patient ID</label>
                    <p className="text-sm bg-[#E6F0FF] p-4 rounded-md border border-[#B3CDE0]">
                      {formData.patientId}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-[#4B7BA8] block mb-2">Patient Name</label>
                    <p className="text-sm bg-[#E6F0FF] p-4 rounded-md border border-[#B3CDE0]">
                      {formData.patientName}
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-[#4B7BA8] block mb-2">Age</label>
                    <p className="text-sm bg-[#E6F0FF] p-4 rounded-md border border-[#B3CDE0]">
                      {formData.age}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-[#4B7BA8] block mb-2">Date</label>
                    <p className="text-sm bg-[#E6F0FF] p-4 rounded-md border border-[#B3CDE0]">
                      {formData.date}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-6 pb-4 border-b-2 border-[#CBD5E0]">
              <h2 className="text-xl font-semibold mb-4">Vital Signs</h2>
              <div className="grid grid-cols-1 gap-6 w-full bg-[#E6F0FF] p-6 rounded-md">
                <div className="flex items-center">
                  <label className="font-medium text-[#4B7BA8] w-40">Weight</label>
                  <div className="flex-1 flex items-center space-x-4">
                    <input
                      type="text"
                      name="weight"
                      value={formData.weight}
                      onChange={handleChange}
                      className="w-1/2 p-3 rounded-md border border-[#B3CDE0] bg-white focus:outline-none focus:ring-2 focus:ring-[#4B7BA8] text-base"
                      {...inputProps}
                    />
                    <span className="text-[#4B7BA8] text-base">kg</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <label className="font-medium text-[#4B7BA8] w-40">Fever</label>
                  <div className="flex-1 flex items-center space-x-4">
                    <input
                      type="text"
                      name="fever"
                      value={formData.fever}
                      onChange={handleChange}
                      className="w-1/2 p-3 rounded-md border border-[#B3CDE0] bg-white focus:outline-none focus:ring-2 focus:ring-[#4B7BA8] text-base"
                      {...inputProps}
                    />
                    <span className="text-[#4B7BA8] text-base">°C</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <label className="font-medium text-[#4B7BA8] w-40">Blood Pressure</label>
                  <div className="flex-1 flex items-center space-x-4">
                    <input
                      type="text"
                      name="bloodPressureSystolic"
                      value={formData.bloodPressureSystolic}
                      onChange={handleChange}
                      className="w-1/3 p-3 rounded-md border border-[#B3CDE0] bg-white focus:outline-none focus:ring-2 focus:ring-[#4B7BA8] text-base"
                      {...inputProps}
                    />
                    <span className="text-[#4B7BA8] text-base">/</span>
                    <input
                      type="text"
                      name="bloodPressureDiastolic"
                      value={formData.bloodPressureDiastolic}
                      onChange={handleChange}
                      className="w-1/3 p-3 rounded-md border border-[#B3CDE0] bg-white focus:outline-none focus:ring-2 focus:ring-[#4B7BA8] text-base"
                      {...inputProps}
                    />
                    <span className="ml-2 text-[#4B7BA8] text-base">mmHg</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <label className="font-medium text-[#4B7BA8] w-40">Sugar</label>
                  <div className="flex-1 flex items-center space-x-4">
                    <input
                      type="text"
                      name="sugar"
                      value={formData.sugar}
                      onChange={handleChange}
                      className="w-1/2 p-3 rounded-md border border-[#B3CDE0] bg-white focus:outline-none focus:ring-2 focus:ring-[#4B7BA8] text-base"
                      {...inputProps}
                    />
                    <span className="text-[#4B7BA8] text-base">mg/dL</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <label className="font-medium text-[#4B7BA8] w-40">Tests</label>
                  <input
                    type="text"
                    name="tests"
                    value={formData.tests}
                    onChange={handleChange}
                    className="flex-1 p-3 rounded-md border border-[#B3CDE0] bg-white focus:outline-none focus:ring-2 focus:ring-[#4B7BA8] text-base"
                    {...inputProps}
                  />
                </div>
                <div className="flex items-center">
                  <label className="font-medium text-[#4B7BA8] w-40">History</label>
                  <input
                    type="text"
                    name="history"
                    value={formData.history}
                    onChange={handleChange}
                    className="flex-1 p-3 rounded-md border border-[#B3CDE0] bg-white focus:outline-none focus:ring-2 focus:ring-[#4B7BA8] text-base"
                    {...inputProps}
                  />
                </div>
              </div>
            </div>

            <div className="mb-6 border border-[#B3CDE0] rounded-md">
              <label className="text-xl font-semibold block p-4 bg-[#E6F0FF] rounded-t-md">
                Prescription
              </label>
              <textarea
                name="prescription"
                value={formData.prescription}
                onChange={handleChange}
                className="w-full p-4 bg-white h-60 focus:outline-none focus:ring-2 focus:ring-[#4B7BA8] rounded-b-md resize-none text-lg"
                {...inputProps}
              />
            </div>

            <div className="mt-6 text-center">
              <label className="text-sm font-medium text-[#4B7BA8] block mb-2">Signature</label>
              <span className="w-48 p-2 border-b border-[#B3CDE0] inline-block text-base">
                {formData.doctorName}
              </span>
            </div>
          </div>

          {!viewMode && (
            <div className="mt-8 flex justify-between">
              <button
                type="submit"
                onClick={handleSubmit}
                className="bg-[#4B7BA8] text-white py-3 px-6 rounded-md shadow-md hover:bg-[#3B5E87] transition-colors focus:outline-none focus:ring-2 focus:ring-[#4B7BA8]"
                {...buttonProps}
              >
                Submit Prescription
              </button>
              <button
                onClick={generatePDF}
                className="bg-[#4B7BA8] text-white py-3 px-6 rounded-md shadow-md hover:bg-[#3B5E87] transition-colors focus:outline-none focus:ring-2 focus:ring-[#4B7BA8]"
                {...buttonProps}
              >
                Download as PDF
              </button>
            </div>
          )}
          {viewMode && (
            <div className="mt-8 flex justify-end">
              <button
                onClick={generatePDF}
                className="bg-[#4B7BA8] text-white py-3 px-6 rounded-md shadow-md hover:bg-[#3B5E87] transition-colors focus:outline-none focus:ring-2 focus:ring-[#4B7BA8]"
              >
                Download as PDF
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PrescriptionForm;