import React, { useState } from "react";
import Step1 from "./PersonalDetailsForm";
import Step2 from "./ProfessionalDetailsForm";
import Step3 from "./ClinicDetailsForm";
import Step4 from "./AccountDetailsForm";

const SignupForm = () => {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    fullName: "",
    userEmail: "",
    aadharNo: "",
    specialization: "",
    qualification: "",
    experience: "",
    address: "",
    phoneNumber: "",
    gender: "",
    clinicName: "",
    openingTime: "",
    closingTime: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = async () => {
    try {
      const response = await fetch("https://userauth-production-a0f4.up.railway.app/doctor/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        if (data.token) {
          localStorage.setItem("token", data.token);
          window.location = "/";
        } else {
          console.log("Error during signup: " + (data.message || "Unknown error"));
        }
      } else {
        console.log("Error: " + response.statusText);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="bg-white w-full min-h-[500px] flex flex-col justify-between">
      <h1 className="text-2xl font-bold mb-4 text-center">Signup</h1>
  
      <div className="flex-1">
        {step === 1 && <Step1 formData={formData} handleInputChange={handleInputChange} nextStep={nextStep} />}
        {step === 2 && <Step2 formData={formData} handleInputChange={handleInputChange} nextStep={nextStep} prevStep={prevStep} />}
        {step === 3 && <Step3 formData={formData} handleInputChange={handleInputChange} nextStep={nextStep} prevStep={prevStep} />}
        {step === 4 && <Step4 formData={formData} handleInputChange={handleInputChange} prevStep={prevStep} handleSubmit={handleSubmit} />}
      </div>
    </div>
  );
  
};

export default SignupForm;
