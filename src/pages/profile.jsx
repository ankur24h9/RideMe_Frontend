import React, { useState } from "react";

function Profile() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-400">
      <div className="relative inline-block text-left">
        {/* Profile Button */}
        <button
          onClick={() => setOpen(!open)}
          className=" bg-green-500 hover:bg-green-400 px-6 py-2 cursor-pointer rounded-full"
        >
          My Profile
        </button>

        {/* Dropdown Menu */}
        {open && (
          <div className="absolute right-0 mt-2 w-48 bg-white border rounded-xl shadow-lg py-2 z-10">
            <a
              href="#"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              View Profile
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Settings
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Logout
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;


