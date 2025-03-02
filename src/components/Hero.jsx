import React from 'react';
import heroBG from '../assets/hero-bg.jpg';

function Hero() {
  return (
    <section id="hero" className="relative flex items-center justify-center min-h-screen pt-20 pb-20 overflow-hidden bg-gray-100">
      <img
        src={heroBG}
        alt="Hero Background"
        className="absolute inset-0 object-cover w-full h-full z-0"
      />

      <div className="container mx-auto relative z-10 px-4 lg:px-8">
        {/* Welcome Section */}
        <div className="text-left mb-10" data-aos="fade-down" data-aos-delay="100">
          <h2 className="text-4xl font-bold mb-4 ml-3">Welcome to Vaidya</h2>
          <p className="text-lg text-gray-700">
            Your trusted companion for seamless doctor appointment scheduling and prescription management.
          </p>
        </div>

        {/* Content Section */}
        <div className="flex flex-wrap justify-center -mx-4">
          {/* Why Box */}
          <div className="w-full lg:w-1/3 px-4 mb-8 lg:mb-0">
            <div
              className="bg-blue-600 bg-opacity-50 text-white p-8 rounded-md h-full flex flex-col justify-between"
              data-aos="zoom-out"
              data-aos-delay="200"
            >
              <h3 className="text-2xl font-bold mb-4 text-center">Why Choose Vaidya?</h3>
              <p className="mb-6 text-center">
                Vaidya is designed to simplify healthcare operations. Manage appointments effortlessly, store digital prescriptions securely, and optimize your workflow—all in one place. Empowering doctors and enhancing patient care is at the heart of what we do.
              </p>
              <div className="text-center">
                <a
                  href="#about"
                  className="inline-block px-6 py-2 text-blue-600 bg-white rounded-full hover:bg-gray-100 transition"
                >
                  Learn More <i className="bi bi-chevron-right ml-2"></i>
                </a>
              </div>
            </div>
          </div>

          {/* Icon Boxes */}
          <div className="w-full lg:w-2/3 px-4">
            <div className="flex flex-wrap justify-center -mx-4">
              {/* Icon Box 1 */}
              <div className="w-full md:w-1/2 xl:w-1/3 px-4 mb-8">
                <div
                  className="bg-white bg-opacity-50 p-6 rounded-md shadow-md text-center"
                  data-aos="zoom-out"
                  data-aos-delay="300"
                >
                  <i className="bi bi-clipboard-data text-4xl text-blue-600 mb-4"></i>
                  <h4 className="text-xl font-bold mb-2">Effortless Appointment Management</h4>
                  <p className="text-gray-600">
                    Schedule, manage, and track appointments with an intuitive interface that streamlines your practice.
                  </p>
                </div>
              </div>

              {/* Icon Box 2 */}
              <div className="w-full md:w-1/2 xl:w-1/3 px-4 mb-8">
                <div
                  className="bg-white bg-opacity-50 p-6 rounded-md shadow-md text-center"
                  data-aos="zoom-out"
                  data-aos-delay="400"
                >
                  <i className="bi bi-gem text-4xl text-blue-600 mb-4"></i>
                  <h4 className="text-xl font-bold mb-2">Secure Digital Prescriptions</h4>
                  <p className="text-gray-600">
                    Digitally store and retrieve prescriptions for easy access, accuracy, and convenience.
                  </p>
                </div>
              </div>

              {/* Icon Box 3 */}
              <div className="w-full md:w-1/2 xl:w-1/3 px-4 mb-8">
                <div
                  className="bg-white bg-opacity-50 p-6 rounded-md shadow-md text-center"
                  data-aos="zoom-out"
                  data-aos-delay="500"
                >
                  <i className="bi bi-inboxes text-4xl text-blue-600 mb-4"></i>
                  <h4 className="text-xl font-bold mb-2">Streamlined Workflow</h4>
                  <p className="text-gray-600">
                    Save time and effort with our all-in-one platform, ensuring smooth operations and better patient outcomes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
