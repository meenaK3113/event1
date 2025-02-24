

import React, { useState } from "react";

const Feedback = () => {
  const generateFeedbackId = () => Math.floor(100000 + Math.random() * 900000); // Generate a random 6-digit ID

  const [feedback, setFeedback] = useState({
    feedback_id: generateFeedbackId(), 
    attendee_id: 18, 
    event_id: 29, 
    name: "",
    email: "",
    rating: 0,
    performance: "",
    feedback_text: "",
  });
 
 
  const handleRatingClick = (rating) => {
    setFeedback((prev) => ({ ...prev, rating }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          feedback_id: feedback.feedback_id,
          attendee_id: feedback.attendee_id,
          event_id: feedback.event_id,
          name: feedback.name,
          email: feedback.email,
          feedback_text: feedback.feedback_text,
          rating: feedback.rating,
          performance: feedback.performance,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Feedback submitted successfully!");
      } else {
        alert(`Error: ${data.error || "Something went wrong!"}`);
      }
      setFeedback({
        feedback_id: feedback.feedback_id,
        attendee_id: feedback.attendee_id,
        event_id: 29,
        name: "",
        email: "",
        rating: 0,
        performance: "",
        feedback_text: "",
      });

    } catch (error) {
      console.error("❌ Error:", error);
      alert("Error submitting feedback. Please try again.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto my-10 p-6 shadow-lg rounded-xl bg-[#D9EAFD]">
      <h2 className="text-3xl font-semibold text-center mb-6">
        “Music is the strongest form of magic.” 🎵✨
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="text-lg font-medium">Your Name:</label>
        <input
          type="text"
          placeholder="Enter your name"
          className="p-2 rounded-md border"
          value={feedback.name}
          onChange={(e) => setFeedback({ ...feedback, name: e.target.value })}
          required
        />

        <label className="text-lg font-medium">Your Email:</label>
        <input
          type="email"
          placeholder="Enter your email"
          className="p-2 rounded-md border"
          value={feedback.email}
          onChange={(e) => setFeedback({ ...feedback, email: e.target.value })}
          required
        />

      <label className="text-lg font-medium">Rate Your Experience:</label>
        <div className="flex gap-2 text-6xl">
           {[1, 2, 3, 4, 5].map((star) => (
             <span
              key={star}
              className={`cursor-pointer transition duration-200 ${
                 star <= feedback.rating ? "text-yellow-500" : "text-gray-400"
              }`}
               onClick={() => handleRatingClick(star)}
             onMouseEnter={() => setFeedback((prev) => ({ ...prev, rating: star }))}
             >
              ★
             </span>
          ))}
        </div>

        <label className="text-lg font-medium">How was the performance?</label>
        <div className="flex gap-4">
          {["Excellent 🎤", "Good 🎶", "Average 😐", "Poor 😞"].map((option) => (
            <label key={option} className="flex items-center gap-2">
              <input
                type="radio"
                name="performance"
                value={option}
                checked={feedback.performance === option}
                onChange={(e) => setFeedback({ ...feedback, performance: e.target.value })}
                className="cursor-pointer"
              />
              {option}
            </label>
          ))}
        </div>

        <label className="text-lg font-medium">Your Feedback:</label>
        <textarea
          placeholder="Share your thoughts!"
          className="p-2 rounded-md border h-20"
          value={feedback.feedback_text}
          onChange={(e) => setFeedback({ ...feedback, feedback_text: e.target.value })}
        />

        <button
          type="submit"
          disabled={!feedback.email || !feedback.rating || !feedback.performance || !feedback.feedback_text}
          className={`flex flex-col justify-center items-center relative border border-white rounded-[2%] p-4 text-white bg-black overflow-hidden transition-colors duration-300 ease-in-out
            before:absolute before:inset-0 before:right-0 before:bg-white before:w-0 before:transition-all before:duration-300 before:ease-in-out hover:before:w-full hover:text-black
            before:z-0 z-10 hover:cursor-pointer hover:shadow-lg max-w-xs 
            ${
              !feedback.email || !feedback.rating || !feedback.performance || !feedback.feedback_text
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-800"
            }`}
        >
          <span className="relative z-10 transition-colors duration-0 ease-in-out text-center">
          Submit Feedback ✨
            </span>
         
        </button>
      </form>
    </div>
  );
};

export default Feedback;
