'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PhoneCall } from 'lucide-react';

export default function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled down a bit (past the hero CTA)
      setIsVisible(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="fixed bottom-6 right-6 z-50 lg:hidden" // Only show on mobile/tablet since destkop has navbar CTA
        >
          <a
            href="tel:+48720638628"
            className="flex items-center justify-center bg-red-600 text-white rounded-full p-4 shadow-[0_8px_30px_rgba(220,38,38,0.5)] active:scale-95 transition-transform"
            aria-label="Zadzwoń teraz"
          >
            <PhoneCall size={28} className="animate-pulse" />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
