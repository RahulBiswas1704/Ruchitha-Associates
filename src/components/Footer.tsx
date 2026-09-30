import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-brand-blue text-brand-offwhite pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        
        {/* Brand & About */}
        <div>
          <span className="font-serif font-bold text-2xl text-white block mb-4">
            Ruchitha <span className="text-brand-red">Associates</span>
          </span>
          <p className="text-gray-300 text-sm leading-relaxed mb-6">
            A leading skill development, training, placement, and recruitment company based in Telangana, India. Connecting talent with opportunities.
          </p>
          <div className="flex gap-4">
            <a href="#add-facebook-url" title="[ADD: Facebook URL]" className="text-gray-300 hover:text-brand-red transition-colors">
              <FaFacebook size={20} />
            </a>
            <a href="#add-instagram-url" title="[ADD: Instagram URL]" className="text-gray-300 hover:text-brand-red transition-colors">
              <FaInstagram size={20} />
            </a>
            <a href="#add-linkedin-url" title="[ADD: LinkedIn URL]" className="text-gray-300 hover:text-brand-red transition-colors">
              <FaLinkedin size={20} />
            </a>
            <a href="#add-youtube-url" title="[ADD: YouTube URL]" className="text-gray-300 hover:text-brand-red transition-colors">
              <FaYoutube size={20} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-serif text-lg font-bold text-white mb-4">Quick Links</h3>
          <ul className="space-y-3">
            <li><Link href="/" className="text-sm text-gray-300 hover:text-brand-red transition-colors">Home</Link></li>
            <li><Link href="/about" className="text-sm text-gray-300 hover:text-brand-red transition-colors">About Us</Link></li>
            <li><Link href="/gallery" className="text-sm text-gray-300 hover:text-brand-red transition-colors">Our Gallery</Link></li>
            <li><Link href="/jobs" className="text-sm text-gray-300 hover:text-brand-red transition-colors">Career</Link></li>
            <li><Link href="/contact" className="text-sm text-gray-300 hover:text-brand-red transition-colors">Contact Us</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="font-serif text-lg font-bold text-white mb-4">Contact Us</h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <Phone size={18} className="text-brand-red shrink-0 mt-0.5" />
              <span className="text-sm text-gray-300">+91 7674074055</span>
            </li>
            <li className="flex items-start gap-3">
              <Mail size={18} className="text-brand-red shrink-0 mt-0.5" />
              <div className="flex flex-col gap-1">
                <a href="mailto:Hr.ruchithaassociates@gmail.com" className="text-sm text-gray-300 hover:text-white">Hr.ruchithaassociates@gmail.com</a>
                <a href="mailto:info@ruchithaassociatess.com" className="text-sm text-gray-300 hover:text-white">info@ruchithaassociatess.com</a>
                <span className="text-xs text-brand-teal mt-1">[ADD: confirm the one email to show publicly]</span>
              </div>
            </li>
          </ul>
        </div>

        {/* Locations */}
        <div>
          <h3 className="font-serif text-lg font-bold text-white mb-4">Our Offices</h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <MapPin size={18} className="text-brand-red shrink-0 mt-0.5" />
              <div>
                <span className="text-sm font-semibold text-white block mb-1">Placement Office</span>
                <span className="text-sm text-gray-300">6F6G+565, Tukkuguda, Telangana 501359</span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <MapPin size={18} className="text-brand-red shrink-0 mt-0.5" />
              <div>
                <span className="text-sm font-semibold text-white block mb-1">Registered Office</span>
                <span className="text-sm text-gray-300">House no. 6-7, ST Colony, Annaram Village, Telangana 502313</span>
              </div>
            </li>
          </ul>
        </div>

      </div>
      
      {/* Bottom Bar */}
      <div className="container mx-auto px-4 md:px-6 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs text-gray-400">
          © {currentYear} Ruchitha Associates. All rights reserved.
        </p>
        <div className="flex gap-4">
          <Link href="/privacy-policy" className="text-xs text-gray-400 hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="text-xs text-gray-400 hover:text-white transition-colors">Terms & Conditions</Link>
        </div>
      </div>
    </footer>
  );
}
