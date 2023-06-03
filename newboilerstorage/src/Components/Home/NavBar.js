import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const navigation = [
        { name: "Home", href: "/" },
        { name: "Login", href: "/Login" },
        { name: "SignUp", href: "/SignUp" },
        { name: "Add New Listing", href: "/addlisting" },
        { name: "View Listings", href: "/ListingPage" },
        
        { name: "Contact", href: "mailto:mehta233@purdue.edu" },
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
                      <a
                        key={item.name}
                        href={item.href}
                        className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                      >
                        {item.name}
                      </a>
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
