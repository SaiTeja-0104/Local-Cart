import React, { useState } from "react";
import {toast} from 'react-toastify'
import NewsLetter from "../components/NewsLetter";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Thank for contacting us! We’ll get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 ">
      {/* Header */}
      <div className="text-center mb-18">
        <h1 className="text-4xl sm:text-5xl font-bold text-[#0a4d30] font-space">
          Contact Us
        </h1>
        <p className="mt-3 text-lg sm:text-xl text-gray-500">
          We'd love to hear from you. Reach out anytime!
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-lg p-8 border"
        >
          <h2 className="text-2xl font-semibold mb-6">Send us a message</h2>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-green-300"
              placeholder="Enter your name"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-green-300"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Message
            </label>
            <textarea
              name="message"
              required
              rows="4"
              value={formData.message}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-green-300"
              placeholder="Write your message here..."
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md transition"
          >
            Send Message
          </button>
        </form>

        {/* Contact Info */}
        <div className="flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-semibold mb-6">Get in touch</h2>
            <p className="text-gray-600 mb-4">
              Have questions or feedback? Reach out to us via phone, email, or visit us at our office.
            </p>

            <div className="space-y-4">
              <p>
                <span className="font-semibold text-gray-800">📞 Phone:</span>{" "}
                040-712-6060
              </p>
              <p>
                <span className="font-semibold text-gray-800">📧 Email:</span>{" "}
                support@localcart.com
              </p>
              <p>
                <span className="font-semibold text-gray-800">📍 Address:</span>{" "}
                Hyderabad, Telangana, India
              </p>
            </div>
          </div>

          {/* Google Maps Embed */}
          <div className="mt-8">
            <iframe
              title="Local Cart Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.2171850270986!2d78.486671!3d17.385044!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb99f1b2d8d4e7%3A0xf58c8a83340a!2sHyderabad!5e0!3m2!1sen!2sin!4v1615971587139!5m2!1sen!2sin"
              width="100%"
              height="250"
              allowFullScreen=""
              loading="lazy"
              className="rounded-lg border"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
