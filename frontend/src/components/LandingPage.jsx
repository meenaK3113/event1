import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  const genres = [
    'Music',
    'Comedy',
    'Product Launch',
    'Tech',
    'Coding',
    'Health',
    'Food',
    'Art',
  ];

  const events = [
    {
      id: 1,
      title: 'Tech Conference',
      description: 'An exciting tech event!',
      genre: 'Tech',
      image: 'https://via.placeholder.com/300x200.png?text=Tech+Conference',
      location: 'Tech City Convention Center',
      date: '2025-05-15',
    },
    {
      id: 2,
      title: 'Music Festival',
      description: 'A lively music event!',
      genre: 'Music',
      image: 'https://via.placeholder.com/300x200.png?text=Music+Festival',
      location: 'Music Park, City Center',
      date: '2025-06-01',
    },
    {
      id: 3,
      title: 'Comedy Night',
      description: 'A hilarious comedy event!',
      genre: 'Comedy',
      image: 'https://via.placeholder.com/300x200.png?text=Comedy+Night',
      location: 'Comedy Club, Downtown',
      date: '2025-07-20',
    },
    {
      id: 4,
      title: 'Product Launch',
      description: 'An innovative product launch event!',
      genre: 'Product Launch',
      image: 'https://via.placeholder.com/300x200.png?text=Product+Launch',
      location: 'City Hall, Main Street',
      date: '2025-08-10',
    },
    {
      id: 5,
      title: 'Health Summit',
      description: 'A health and wellness summit!',
      genre: 'Health',
      image: 'https://via.placeholder.com/300x200.png?text=Health+Summit',
      location: 'Wellness Center, Green Park',
      date: '2025-09-15',
    },
    {
      id: 6,
      title: 'Coding Bootcamp',
      description: 'A hands-on coding bootcamp!',
      genre: 'Coding',
      image: 'https://via.placeholder.com/300x200.png?text=Coding+Bootcamp',
      location: 'Tech Hub, Silicon Valley',
      date: '2025-10-01',
    },
    {
      id: 7,
      title: 'Food Festival',
      description: 'A tasty food festival!',
      genre: 'Food',
      image: 'https://via.placeholder.com/300x200.png?text=Food+Festival',
      location: 'Food Plaza, Riverside',
      date: '2025-11-12',
    },
    {
      id: 8,
      title: 'Art Exhibition',
      description: 'An artistic exhibition of paintings and sculptures!',
      genre: 'Art',
      image: 'https://via.placeholder.com/300x200.png?text=Art+Exhibition',
      location: 'Art Gallery, Old Town',
      date: '2025-12-05',
    },
  ];

  const [selectedGenres, setSelectedGenres] = useState([]);
  
  // Filter events based on selected genres
  const handleGenreChange = (e) => {
    const genre = e.target.value;
    setSelectedGenres((prevSelectedGenres) =>
      prevSelectedGenres.includes(genre)
        ? prevSelectedGenres.filter((item) => item !== genre)
        : [...prevSelectedGenres, genre]
    );
  };

  const filteredEvents = events.filter(
    (event) =>
      selectedGenres.length === 0 || selectedGenres.includes(event.genre)
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/5 bg-gray-800 text-white p-6 transition-all duration-300">
        <h2 className="text-2xl font-semibold mb-6">Genres</h2>
        <ul>
          {genres.map((genre) => (
            <li key={genre} className="mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  value={genre}
                  checked={selectedGenres.includes(genre)}
                  onChange={handleGenreChange}
                  className="mr-2"
                />
                {genre}
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content Area */}
      <div className="w-4/5 p-6">
        <h1 className="text-3xl font-semibold mb-6">Events</h1>
        <div className="grid grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white shadow-lg rounded-lg p-6 mb-6 transition-transform transform hover:scale-105 hover:shadow-2xl"
            >
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h3 className="text-2xl font-semibold mb-2">{event.title}</h3>
              <p className="text-gray-700 mb-4">{event.description.slice(0, 100)}...</p>
              <p className="text-gray-600 mb-4">Location: {event.location}</p>
              <p className="text-gray-600 mb-4">Date: {new Date(event.date).toLocaleDateString()}</p>
              <Link
                to={`/event/${event.id}`}
                className="text-blue-600 hover:text-blue-800 font-semibold"
              >
                Read More
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
