"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 w-full bg-white/95 backdrop-blur-sm z-50 shadow-sm ">
      <div className="container-custom">
        <div className="flex items-center justify-between h-20 mt-2 ">
          <Link href="/" className="flex items-center ">
            <div className="w-10 h-10 mr-2">
              <svg
                viewBox="0 0 400 400"
                xmlns="http://www.w3.org/2000/svg"
                className="fill-orange-500"
              >
                <path d="M200 80c22.1 0 40 17.9 40 40s-17.9 40-40 40-40-17.9-40-40 17.9-40 40-40zM100 160c22.1 0 40 17.9 40 40s-17.9 40-40 40-40-17.9-40-40 17.9-40 40-40zM300 160c22.1 0 40 17.9 40 40s-17.9 40-40 40-40-17.9-40-40 17.9-40 40-40z" />
                <path d="M200 80c-40 0-150 100-150 200 0 0 100 40 150 40s150-40 150-40c0-100-110-200-150-200zM200 280c-60 0-100-40-100-40 0-60 40-100 100-100s100 40 100 100c0 0-40 40-100 40z" />
              </svg>
            </div>
            <span className="text-2xl font-bold text-blue-600">
              Prime<span className="text-orange-500">Choice</span>{" "}
              <span className="text-blue-600">Care</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className="font-medium text-gray-700 hover:text-blue-500 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/services"
              className="font-medium text-gray-700 hover:text-blue-500 transition-colors"
            >
              Services
            </Link>
            <Link
              href="/about"
              className="font-medium text-gray-700 hover:text-blue-500 transition-colors"
            >
              About Us
            </Link>
            <Link
              href="/ndis"
              className="font-medium text-gray-700 hover:text-blue-500 transition-colors"
            >
              NDIS
            </Link>
            <Link
              href="/contact"
              className="font-medium text-gray-700 hover:text-blue-500 transition-colors"
            >
              Contact
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-2">
            <Button className="bg-blue-600 hover:bg-blue-500/90">
              <Phone size={16} className="mr-2" />
              +61 451103939
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden mt-2">
            <button onClick={toggleMenu} className="text-gray-700">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-300">
          <div className="container-custom py-4 space-y-3">
            <Link
              href="/"
              className="block py-2 font-medium text-gray-700 hover:text-blue-500"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/services"
              className="block py-2 font-medium text-gray-700 hover:text-blue-500"
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              href="/about"
              className="block py-2 font-medium text-gray-700 hover:text-blue-500"
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
            <Link
              href="/ndis"
              className="block py-2 font-medium text-gray-700 hover:text-blue-500"
              onClick={() => setIsMenuOpen(false)}
            >
              NDIS
            </Link>
            <Link
              href="/contact"
              className="block py-2 font-medium text-gray-700 hover:text-blue-500"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="pt-2">
              <Button className="w-full bg-blue-600 hover:bg-blue-500 ">
                <Phone size={16} className="mr-2" />
                0435764571
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
