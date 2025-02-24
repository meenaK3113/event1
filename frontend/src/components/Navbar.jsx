// import React, { useState, useEffect, useRef } from "react";
// import { Menu, X, User } from "lucide-react"; // Import the User icon
// import { useNavigate } from "react-router-dom"; // Use useNavigate instead of useHistory

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [dropdownOpen, setDropdownOpen] = useState(false); // State to control dropdown visibility
//   const dropdownRef = useRef(null); // Ref for dropdown
//   const navigate = useNavigate(); // Initialize the useNavigate hook

//   // Handle click on the user profile icon
//   const handleProfileClick = () => {
//     setDropdownOpen(!dropdownOpen); // Toggle dropdown visibility
//   };

//   // Handle navigation to "My Orders" page
//   const handleMyOrdersClick = () => {
//     navigate("/my-orders"); // Navigate to the "My Orders" page
//     setDropdownOpen(false); // Close the dropdown after navigation
//   };

//   // Handle logout action (You can add your own logout logic here)
//   const handleLogout = () => {
//     // Perform logout logic here (e.g., clearing user data, etc.)
//     navigate("/login"); // Redirect to login page after logout
//     setDropdownOpen(false); // Close the dropdown after logout
//   };

//   // Close dropdown if clicked outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setDropdownOpen(false); // Close dropdown if clicked outside
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   return (
//     <div className="flex flex-col md:flex-row justify-between items-center p-4 shadow-lg top-0 left-0 w-full z-50 bg-[#D9EAFD]">
//       <div className="flex items-center justify-between w-full md:w-auto">
//         <h1 className="text-2xl p-4">Project Title</h1>

//         {/* Menu Icon - Visible on Small Screens */}
//         <div className="md:hidden">
//           <button onClick={() => setIsOpen(!isOpen)}>
//             {isOpen ? <X size={30} /> : <Menu size={30} />}
//           </button>
//         </div>
//       </div>

//       {/* Navigation Links - Show/Hide based on State */}
//       <ul
//         className={`flex flex-col md:flex-row gap-6 items-center m-4 md:flex ${isOpen ? "block" : "hidden"} md:block`}
//       >
//         {["About", "Contact", "Create Events", "Upcoming Events"].map(
//           (item, index) => (
//             <li
//               key={index}
//               className="relative hover:cursor-pointer before:absolute before:bottom-[-3px] before:left-0 before:w-0 before:h-[2px] before:bg-black before:transition-all before:duration-300 hover:before:w-full"
//             >
//               {item}
//             </li>
//           )
//         )}
//       </ul>

//       <div className="flex items-center gap-4">
//         <ul className="flex flex-row md:flex-row items-center gap-4">
//           {/* Profile Icon Instead of Login/Sign Up */}
//           <li
//             className="relative hover:cursor-pointer"
//             onClick={handleProfileClick} // On click, toggle dropdown
//           >
//             {/* User Icon from Lucide */}
//             <User size={30} className="cursor-pointer hover:scale-105 transition-all ease-in-out" />

//             {/* Dropdown Menu */}
//             {dropdownOpen && (
//               <div
//                 ref={dropdownRef}
//                 className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-50"
//               >
//                 <ul>
//                   <li
//                     className="hover:bg-gray-100 p-2 cursor-pointer"
//                     onClick={handleMyOrdersClick} // Navigate to "My Orders" page
//                   >
//                     My Orders
//                   </li>
//                   <li
//                     className="hover:bg-gray-100 p-2 cursor-pointer"
//                     onClick={handleLogout} // Handle logout
//                   >
//                     Logout
//                   </li>
//                 </ul>
//               </div>
//             )}
//           </li>
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Navbar;


import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-center p-4 shadow-lg  top-0 left-0 w-full z-50 bg-[#D9EAFD]">
      <div className="flex items-center justify-between w-full md:w-auto">
        <h1 className="text-2xl p-4">Project Title</h1>
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={30} /> : <Menu size={30} />}
          </button>
        </div>
      </div>

      <ul className={`flex flex-col items-center gap-6 m-4 md:flex-row transition-all duration-300 ease-in-out ${isOpen ? "flex-row" : "hidden md:flex flex-col"}`}>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/landingpage">Home</Link></li>
        {user?.role === "organizer" && <li><Link to="/create-event">Create Events</Link></li>}
        <li><Link to="/upcoming-events">Upcoming Events</Link></li>
      </ul>

      <div className="flex flex-col md:flex-row items-center gap-4">
        <ul className="flex flex-col md:flex-row items-center gap-4">
          {user ? (
            <>
              <li className="text-lg font-semibold">Hello, {user.name}</li>
              <li>
                <button
                  onClick={handleLogout}
                  className="border p-2 bg-red-500 text-white rounded-md hover:bg-red-700 hover:cursor-pointer"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li><Link to="/login">Login</Link></li>
              <li>
                <Link to="/signup" className="border p-2 bg-black text-white rounded-md hover:bg-gray-800">
                  Sign-Up
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;