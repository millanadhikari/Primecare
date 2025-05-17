import React from "react";

import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";


const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 mr-2">
                <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" className="fill-orange-500">
                  <path d="M200 80c22.1 0 40 17.9 40 40s-17.9 40-40 40-40-17.9-40-40 17.9-40 40-40zM100 160c22.1 0 40 17.9 40 40s-17.9 40-40 40-40-17.9-40-40 17.9-40 40-40zM300 160c22.1 0 40 17.9 40 40s-17.9 40-40 40-40-17.9-40-40 17.9-40 40-40z"/>
                  <path d="M200 80c-40 0-150 100-150 200 0 0 100 40 150 40s150-40 150-40c0-100-110-200-150-200zM200 280c-60 0-100-40-100-40 0-60 40-100 100-100s100 40 100 100c0 0-40 40-100 40z"/>
                </svg>
              </div>
              <span className="text-xl font-bold text-white">PrimeChoice <span className="text-orange-500">Care</span></span>
            </div>
            <p className="text-gray-300 mb-4">
              Quality disability support services tailored to individual needs. We're committed to enhancing the lives of our participants through personalized care.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="text-gray-300 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://instagram.com" className="text-gray-300 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://linkedin.com" className="text-gray-300 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors">About Us</Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-300 hover:text-white transition-colors">Our Services</Link>
              </li>
              <li>
                <Link href="/ndis" className="text-gray-300 hover:text-white transition-colors">NDIS Information</Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">Our Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services#personal-care" className="text-gray-300 hover:text-white transition-colors">Personal Care</Link>
              </li>
              <li>
                <Link href="/services#community-participation" className="text-gray-300 hover:text-white transition-colors">Community Participation</Link>
              </li>
              <li>
                <Link href="/services#daily-tasks" className="text-gray-300 hover:text-white transition-colors">Daily Tasks & Shared Living</Link>
              </li>
              <li>
                <Link href="/services#capacity-building" className="text-gray-300 hover:text-white transition-colors">Capacity Building</Link>
              </li>
              <li>
                <Link href="/services#supported-independent" className="text-gray-300 hover:text-white transition-colors">Supported Independent Living</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Phone size={18} className="mr-2 mt-1 text-orange-500" />
                <span>+61 451103939</span>
              </li>
              <li className="flex items-start">
                <Mail size={18} className="mr-2 mt-1 text-orange-500" />
                <span>info@primechoicecare.com.au</span>
              </li>
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 mt-1 text-orange-500" />
                <span>123 Care Street, Sydney NSW 2000</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} PrimeChoice Care Disability Services. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;