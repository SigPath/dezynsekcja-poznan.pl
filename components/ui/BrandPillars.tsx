'use client';

import { motion } from 'framer-motion';
import { Clock, ShieldCheck, Leaf } from 'lucide-react';

const pillars = [
  {
    title: 'Szybkość Reakcji 24h',
    description: 'Przyjeżdżamy na miejsce tego samego dnia. Wiemy, że czas ma kluczowe znaczenie przy zwalczaniu szkodników.',
    icon: <Clock size={32} />,
  },
  {
    title: 'Pełna Dyskrecja',
    description: 'Nasze samochody są nieoznakowane. Działamy cicho i profesjonalnie, chroniąc reputację Twojej firmy lub domu.',
    icon: <ShieldCheck size={32} />,
  },
  {
    title: 'Certyfikowane Środki',
    description: 'Używamy tylko sprawdzonych i certyfikowanych preparatów, w 100% bezpiecznych dla dzieci i zwierząt domowych.',
    icon: <Leaf size={32} />,
  },
];

export default function BrandPillars() {
  return (
    <section className="py-24 bg-brand-blue relative">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-white mb-6"
          >
            Dlaczego <span className="text-brand-green">Wybierają Nas</span>?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-400"
          >
            Jesteśmy lokalną, Poznańską firmą DDD z wieloletnim doświadczeniem. Znamy specyfikę miasta i najczęstsze problemy ze szkodnikami.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="flex flex-col items-center text-center p-8 rounded-3xl bg-white/5 border border-white/10 relative overflow-hidden group hover:border-brand-green/30 transition-colors"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-green/10 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-brand-green/20 transition-all"></div>
              
              <div className="text-brand-green mb-6 bg-brand-green/10 p-4 rounded-2xl">
                {pillar.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-4">{pillar.title}</h3>
              <p className="text-gray-400">{pillar.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
