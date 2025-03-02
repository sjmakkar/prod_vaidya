import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

import axios from "axios";
import { FaUserEdit } from "react-icons/fa";
import Header from "../components/Header";

const Profile = () => {
  const [profile, setProfile] = useState({
    fullName: "",
    
    specialization: "",
    qualification: "",
    experience: "",
    address: "",
    gender: "",
    phoneNumber: "",
    
    clinicName: "",
    openTime: "",
    closeTime: "",
    aadharNo: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const { user, token } = useContext(AuthContext);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`https://userauth-production-61c5.up.railway.app/doctor/${user.userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        // const data = await response.json();
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, [user?.userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://userauth-production-61c5.up.railway.app/doctor/${user.userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });
      if (response.ok) {
        alert("Profile updated successfully!");
        setIsEditing(false);
      } else {
        alert("Failed to update profile.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const sections = [
    {
      title: "Personal Information",
      fields: ["fullName", "gender", "phoneNumber", "address", "aadharNo"],
    },
    {
      title: "Professional Details",
      fields: ["specialization", "qualification", "experience", "clinicName"],
    },
    {
      title: "Availability",
      fields: ["openTime", "closeTime"],
    },
    
    // {
    //   title: "Account Details",
    //   fields: ["userEmail"],
    // },
  ];

  return (
    <div>
      <Header />
      <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
        <div className="max-w-4xl w-full bg-white shadow-xl rounded-xl p-8">
          <div className="flex items-center justify-between pb-6 border-b">
            <h1 className="text-3xl font-bold text-gray-800">Doctor Profile</h1>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center space-x-2 bg-blue-700 hover:bg-blue-800 text-white px-5 py-2 rounded-lg shadow-lg transition-transform hover:scale-105"
            >
              <FaUserEdit />
              <span>{isEditing ? "Cancel" : "Edit"}</span>
            </button>
          </div>

          {isEditing ? (
            <form onSubmit={handleSubmit} className="mt-6 space-y-6">
              {sections.map((section) => (
                <div key={section.title} className="bg-white p-5 rounded-lg shadow-lg border transform transition hover:scale-105">
                  <h2 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">
                    {section.title}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {section.fields.map((key) => (
                      <div key={key}>
                        <label className="block text-sm font-medium text-gray-700 capitalize">
                          {key.replace(/([A-Z])/g, " $1").trim()}
                        </label>
                        <input
                          type={key.includes("Time") ? "time" : "text"}
                          name={key}
                          value={profile[key]}
                          onChange={handleChange}
                          className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              <div className="flex justify-end space-x-4">
                <button
                  type="submit"
                  className="px-6 py-2 bg-green-600 text-white rounded-lg shadow-lg hover:bg-green-700 transition-transform hover:scale-105"
                >
                  Save Changes
                </button>
              </div>
            </form>
          ) : (
            <div className="mt-6 space-y-6">
              {sections.map((section) => (
                <div key={section.title} className="bg-white p-5 rounded-lg shadow-lg border transform transition hover:scale-105">
                  <h2 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">
                    {section.title}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {section.fields.map((key) => (
                      <div key={key}>
                        <label className="block text-sm font-medium text-gray-700 capitalize">
                          {key.replace(/([A-Z])/g, " $1").trim()}
                        </label>
                        <p className="mt-1 text-lg font-semibold text-gray-900">
                          {profile[key] || "-"}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
