import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';


const AboutUs = () => {
  return (
        <div>
      {/* Header */}
      <Header />
      <div className="flex flex-col items-center">
      {/* Main Content */}
      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-8 mt-8">
        <h1 className="text-3xl font-bold text-blue-600 mb-4 text-center">About Us</h1>
        <p className="text-lg text-gray-700 mb-6">
          Welcome to <span className="font-bold">Vaidya</span>, a cutting-edge platform designed to revolutionize how healthcare professionals manage appointments and prescriptions. At Vaidya, we strive to make healthcare operations efficient and effortless, giving doctors more time to focus on delivering quality care.
        </p>
        <h2 className="text-2xl font-semibold text-blue-500 mb-4">What We Offer</h2>
        <ul className="list-disc list-inside text-gray-700 mb-6">
          <li><strong>Appointment Scheduling:</strong> Easily create, view, and manage appointments with a streamlined process.</li>
          <li><strong>Digital Prescription Management:</strong> Store and access prescriptions digitally, ensuring accuracy and convenience.</li>
          <li><strong>All-in-One Solution:</strong> Perform all essential operations in one place, saving time and effort.</li>
        </ul>
        <h2 className="text-2xl font-semibold text-blue-500 mb-4">Why Choose Vaidya?</h2>
        <ul className="list-disc list-inside text-gray-700 mb-6">
          <li><strong>Efficient Workflow:</strong> Automate tasks and manage your practice effortlessly.</li>
          <li><strong>Paperless Convenience:</strong> Securely store data and eliminate the need for physical records.</li>
          <li><strong>Enhanced Patient Experience:</strong> User-friendly features ensure smooth interactions between doctors and patients.</li>
          <li><strong>Secure and Reliable:</strong> Built with the latest security standards to protect your data.</li>
        </ul>
        <h2 className="text-2xl font-semibold text-blue-500 mb-4">Our Vision</h2>
        <p className="text-lg text-gray-700 mb-6">
          At <span className="font-bold">Vaidya</span>, we envision a healthcare ecosystem where technology bridges the gap between doctors and patients, enhancing efficiency, accuracy, and care delivery. We aim to equip healthcare professionals with the tools they need to excel in a digital world.
        </p>
        <div className="text-center">
          <p className="text-lg text-gray-700 mb-4">
            Ready to transform your practice? Join us today and experience the future of healthcare management with <span className="font-bold">Vaidya</span>.
          </p>
          <Link to='/signup' className="px-6 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all">
            Get Started
          </Link>
        </div>
      </div>
    </div>
    </div>
  );
};

export default AboutUs;
