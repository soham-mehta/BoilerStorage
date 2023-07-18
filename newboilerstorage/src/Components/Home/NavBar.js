import React from 'react';

const Navbar = ({ id, isHost }) => {
  const navigation = [
    { name: "Home", href: (id !== "" ? `/home/${id}/${isHost}` : "/"), included: true },
    { name: "Login", href: "/Login", included: id === "" },
    { name: "SignUp", href: "/SignUp", included: id === "" },
    { name: "Add New Listing", href: `/addlisting/${id}`, included: isHost === 'true' },
    { name: "Edit Listings", href: `/editlisting/${id}`, included: isHost === 'true' },
    { name: "View Listings", href: (id !== "" ? `/ListingPage/${id}/${isHost}` : "/ListingPage"), included: true },
    { name: "View Pending Requests", href: `/pendingrequests/${id}/${isHost}`, included: id !== "" },
    { name: "Contact", href: "mailto:mehta233@purdue.edu", included: true },
    { name: "Profile", href: `/profile/${id}/${isHost}`, included: id !== "" },
    { name: "Log Out", href: "/", included: id !== ""}
  ];

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="relative flex items-center justify-center h-16">
          <div className="flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0 flex items-center">
              {/* BoilerStorage Logo here... */}
            </div>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  (item.included) ? (<a
                    key={item.name}
                    href={item.href}
                    className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                  >
                    {item.name}
                  </a>) : <></>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
