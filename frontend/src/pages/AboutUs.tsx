import Footer from "../components/Footer";
import Header from "./landing/Header";
import { FaPhone, FaEnvelope, FaLinkedin } from "react-icons/fa";

const AboutUs = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />

      
      <section className="bg-100 text-white py-20">
        <div className="container mx-auto px-5 text-center">
          <h1 className="text-4xl font-bold">About Us</h1>
          <p className="mt-4 text-lg max-w-2xl mx-auto">
            Welcome to Recipes! Discover who we are, our passion for food, and what inspires our recipes.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-5 py-16">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Our Mission</h2>
        <p className="text-gray-700 text-center max-w-3xl mx-auto">
          At Recipes, we aim to bring the joy of cooking into every home. We're dedicated to sharing delicious, easy-to-follow recipes that inspire creativity and enhance your culinary journey.
        </p>
      </section>

      {/* Core Values */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-5">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
            <div>
              <h3 className="text-xl font-semibold text-100">Passion for Food</h3>
              <p className="mt-2 text-gray-600">
                We believe in celebrating the art of cooking, bringing you recipes crafted with care.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-100">Inspiration</h3>
              <p className="mt-2 text-gray-600">
                We provide recipes that inspire you to try new flavors and techniques in the kitchen.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-100">Community</h3>
              <p className="mt-2 text-gray-600">
                We prioritize our community by sharing ideas, tips, and food stories that connect us all.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Team */}
      <section className="container mx-auto px-5 py-16">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Meet the Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 text-center">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <img
              src="/path/to/profile1.jpg"
              alt="Team Member 1"
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold">John Doe</h3>
            <p className="text-100">Head Chef</p>
            <p className="text-gray-600 mt-2">Bringing his culinary expertise to each recipe and food story.</p>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6">
            <img
              src="/path/to/profile2.jpg"
              alt="Team Member 2"
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold">Jane Smith</h3>
            <p className="text-100">Recipe Developer</p>
            <p className="text-gray-600 mt-2">Experimenting with new flavors to bring the best dishes to you.</p>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6">
            <img
              src="/path/to/profile3.jpg"
              alt="Team Member 3"
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold">Emily Johnson</h3>
            <p className="text-100">Community Manager</p>
            <p className="text-gray-600 mt-2">Connecting with our audience and keeping our food community vibrant.</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-100 text-white py-16">
        <div className="container mx-auto px-5 text-center">
          <h2 className="text-2xl font-bold">Get in Touch</h2>
          <p className="mt-4 max-w-2xl mx-auto">
            Have questions, recipe requests, or just want to say hello? Reach out to us—we’re here to help!
          </p>
          <div className="flex justify-center gap-10 mt-8">
            <a href="tel:+1234567890" className="flex items-center gap-2 text-white">
              <FaPhone /> +1 (234) 567-890
            </a>
            <a href="mailto:info@yourrecipesite.com" className="flex items-center gap-2 text-white">
              <FaEnvelope /> recipes@outlook.com
            </a>
            <a href="https://www.linkedin.com/company/yourrecipesite" className="flex items-center gap-2 text-white">
              <FaLinkedin /> LinkedIn
            </a>
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  );
};

export default AboutUs;
