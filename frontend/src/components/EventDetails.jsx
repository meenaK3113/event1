
import React, { useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { UserCircle, ChevronLeft, ChevronRight } from "lucide-react";

const EventDetails = () => {
  const location = useLocation();
  const dummyReviews = [
    { id: 1, name: "John Doe", comment: "Amazing event! Learned a lot about AI." },
    { id: 2, name: "Jane Smith", comment: "Great speakers and networking opportunities!" },
    { id: 3, name: "Joe Smith", comment: "Good Job" },
    { id: 4, name: "CCCCC", comment: "Nice opportunities!" },
    { id: 5, name: "Alice Johnson", comment: "Wonderful experience!" },
  ];

  const event = location.state;
  const [reviews, setReviews] = useState(dummyReviews);
  const [newReview, setNewReview] = useState("");

  const reviewsRef = useRef(null);

  const scrollReviews = (direction) => {
    if (reviewsRef.current) {
      const scrollAmount = 300;
      reviewsRef.current.scrollBy({ 
        left: direction === "left" ? -scrollAmount : scrollAmount, 
        behavior: "smooth" 
      });
    }
  };

  const handleReviewSubmit = () => {
    if (newReview.trim() !== "") {
      setReviews([...reviews, { id: reviews.length + 1, name: "Anonymous", comment: newReview }]);
      setNewReview("");
    }
  };

  if (!event) {
    return <div className="text-center text-xl font-semibold mt-10">No event data found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto my-10 p-6 bg-[#D9EAFD] shadow-lg rounded-xl">
      <img src={event.image} alt={event.title} className="w-full h-64 object-cover rounded-md mb-6" />
      <h1 className="text-3xl font-semibold mb-4">{event.title}</h1>
      <p className="text-gray-700 mb-4">{event.description}</p>
      <p className="text-gray-600 mb-2"><strong>Location:</strong> {event.location}</p>
      <p className="text-gray-600 mb-2"><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>

      {/* Performer Section */}
      <div className="bg-gray-100 p-4 mt-10 mb-10 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Performer</h2>
        <div className="flex flex-col gap-4">
          <UserCircle className="w-24 h-24 text-gray-600" />
          <p className="text-lg font-medium">{event.performer || "Performer details unavailable"}</p>
        </div>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Reviews</h2>

      <div className="relative">
      
        <button
          onClick={() => scrollReviews("left")}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow-md z-10"
        >
          <ChevronLeft className="text-gray-600" />
        </button>

        <div 
          ref={reviewsRef} 
          className="flex space-x-4 overflow-x-hidden p-4"
        >
          {reviews.map((review) => (
            <div
              key={review.id}
              className="min-w-[250px] max-w-[300px] p-4 border rounded-md bg-gray-50 shadow-md flex-shrink-0"
            >
              <p className="font-semibold truncate">{review.name}</p>
              <p className="text-gray-700 break-words">{review.comment}</p>
            </div>
          ))}
        </div>

        <button
          onClick={() => scrollReviews("right")}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow-md z-10"
        >
          <ChevronRight className="text-gray-600" />
        </button>
      </div>

      <div className="flex justify-between items-center mt-6">

        <input
          type="text"
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
          placeholder="Write a review..."
          className="w-full max-w-lg border-b border-gray-600 outline-none p-2 bg-transparent"
        />

        <button
          onClick={handleReviewSubmit}
          className="ml-4 px-6 py-2 bg-black text-white rounded-md hover:bg-white hover:text-black border border-black transition-all"
        >
          Add Review
        </button>
      </div>
    </div>
  );
};

export default EventDetails;
