

import React from 'react';
import { useLocation } from 'react-router-dom';

const ConfirmationPage = () => {
  const location = useLocation();
  const { userData, ticketDetails } = location.state;

  return (
    <div className="bg-[#F1F3F8] min-h-screen flex justify-center items-center py-12 mt-25">
      <div className="bg-white w-full max-w-4xl rounded-lg shadow-2xl">
        <div className="bg-black text-white text-center py-4 rounded-t-lg">
          <h1 className="text-3xl font-semibold">Booking Confirmed!</h1>
        </div>

        {/* Event Info Section */}
        <div className="flex flex-col md:flex-row gap-8 p-8">
          <div className="w-full md:w-1/3">
            <img
              src="" // Add event image URL here
              alt="Event"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
          <div className="w-full md:w-2/3">
            <h2 className="text-2xl font-semibold text-black mb-4">Music Concert 2025</h2>
            <div className="text-lg font-semibold  text-black">
              <p><strong>Date:</strong> March 25, 2025</p>
              <p><strong>Time:</strong> 7:00 PM</p>
              <p><strong>Venue:</strong> Grand Concert Hall, City Center</p>
            </div>
          </div>
        </div>

        {/* User & Ticket Details Section */}
        <div className="bg-[#F9FAFB] p-8">
          <h3 className="text-xl font-semibold  text-black mb-4">Booking Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* User Details */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-lg font-semibold  text-black mb-2 flex justify-center">User Information</h4>
              <div className="mb-4"><strong>Name:</strong> {userData.name}</div>
              <div className="mb-4"><strong>Gender:</strong> {userData.gender}</div>
              <div className="mb-4"><strong>Age:</strong> {userData.age}</div>
              <div className="mb-4"><strong>Email:</strong> {userData.email}</div>
            </div>

            {/* Ticket Details */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-lg font-semibold  text-black mb-2 flex justify-center">Ticket Information</h4>
              <div className="mb-4"><strong>Ticket Type:</strong> {ticketDetails.ticketType}</div>
              <div className="mb-4"><strong>Quantity:</strong> {ticketDetails.quantity}</div>
              <div className="mb-4">
                <strong>Price:</strong> ${ticketDetails.price} per ticket
              </div>
              <div className="mb-4"><strong>Total Price:</strong> ${ticketDetails.price * ticketDetails.quantity}</div>
            </div>
          </div>
        </div>

        {/* Ticket Breakdown */}
        {/* <div className="p-8">
          {ticketDetails.map((detail, index) => (
            <div key={index} className="bg-white p-6 mb-6 rounded-lg shadow-md">
              <h4 className="text-lg font-semibold mb-4">Ticket {index + 1}</h4>
              <div><strong>Name:</strong> {detail.name}</div>
              <div><strong>Age:</strong> {detail.age}</div>
              <div><strong>Email:</strong> {detail.email}</div>
              <div><strong>Phone:</strong> {detail.phone}</div>
              <div><strong>Date of Birth:</strong> {detail.dob}</div>
            </div>
          ))}
        </div> */}

        {/* Footer */}
        <div className=" text-center py-4 rounded-b-lg">
          <button
            className="relative border border-white rounded-[2%] p-2 text-white bg-black overflow-hidden transition-colors duration-300 ease-in-out 
            before:absolute before:inset-0 before:right-0 before:bg-white before:w-0 before:transition-all before:duration-300 before:ease-in-out hover:before:w-full hover:text-black 
            before:z-0 z-10 hover:cursor-pointer hover:shadow-lg"
            onClick={() => window.location.reload()}
          >
            <span className="relative z-10 transition-colors duration-0 ease-in-out">
              OK
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;

