'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ReactNode } from 'react';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  imageUrl?: string;
  href: string;
  delay?: number;
}

export default function ServiceCard({ title, description, icon, href, delay = 0 }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay }}
      className="group relative flex flex-col justify-between p-8 rounded-3xl bg-brand-blue/40 border border-white/10 hover:border-brand-cyan/50 hover:bg-brand-blue/60 transition-all overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative z-10">
        <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-brand-cyan mb-6 group-hover:scale-110 group-hover:bg-brand-cyan/20 transition-all duration-300">
          {icon}
        </div>
        
        <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-brand-cyan transition-colors">{title}</h3>
        <p className="text-gray-400 leading-relaxed mb-8">{description}</p>
      </div>

      <Link href={href} className="relative z-10 flex items-center gap-2 text-brand-cyan font-medium group-hover:gap-4 transition-all w-max">
        <span>Dowiedz się więcej</span>
        <ArrowRight size={18} />
      </Link>
    </motion.div>
  );
}
