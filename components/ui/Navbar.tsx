'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, PhoneCall } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Dezynsekcja', href: '/dezynsekcja-poznan' },
    { name: 'Deratyzacja', href: '/deratyzacja-poznan' },
    { name: 'Dezynfekcja', href: '/dezynfekcja-poznan' },
    { name: 'Ozonowanie', href: '/ozonowanie-poznan' },
    { name: 'Cennik', href: '/cennik' },
    { name: 'Kontakt', href: '/kontakt' },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 border-b border-white/10 ${
        isScrolled ? 'bg-brand-blue/80 backdrop-blur-md py-4 shadow-lg' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-brand-cyan/20 rounded-lg flex items-center justify-center border border-brand-cyan/50 group-hover:bg-brand-cyan/30 transition-colors">
            <span className="text-brand-cyan font-bold text-xl">D</span>
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            Dezynsekcja<span className="text-brand-cyan">Poznań</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          <ul className="flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="text-sm font-medium text-gray-300 hover:text-brand-cyan transition-colors"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
          
          <a
            href="tel:+48720638628"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-red-600 hover:bg-red-700 text-white font-medium transition-all shadow-lg hover:shadow-red-600/30"
          >
            <PhoneCall size={18} />
            <span>Zadzwoń teraz</span>
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden text-white p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-brand-blue/95 backdrop-blur-xl border-b border-white/10 overflow-hidden"
          >
            <ul className="flex flex-col px-6 py-4 gap-4">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block text-lg font-medium text-gray-200 hover:text-brand-cyan py-2 border-b border-white/5"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              <li className="pt-4 pb-2">
                <a
                  href="tel:+48720638628"
                  className="flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-medium transition-all"
                >
                  <PhoneCall size={20} />
                  <span>+48 720 638 628</span>
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
