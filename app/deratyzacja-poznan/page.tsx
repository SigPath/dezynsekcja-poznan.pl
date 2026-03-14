'use client';

import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import FloatingCTA from '@/components/ui/FloatingCTA';
import { motion } from 'framer-motion';
import { Rat, ShieldCheck, PhoneCall, ChevronDown, AlertTriangle, Home, Building2, Warehouse, UtensilsCrossed } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1 } })
};

const services = [
  { icon: <Rat size={28} />, title: 'Zwalczanie Szczurów', description: 'Rozmieszczamy certyfikowane stacje deratyzacyjne z rodentycydami nowej generacji. Substancje mumifikujące zapobiegają nieprzyjemnym zapachom.', highlights: ['Stacje deratyzacyjne', 'Substancje mumifikujące', 'Audyt szczelności'] },
  { icon: <AlertTriangle size={28} />, title: 'Zwalczanie Myszy', description: 'Stosujemy pułapki mechaniczne i profesjonalne trutki żelowe. Lokalizujemy ścieżki migracji, uszczelniamy otwory wejściowe.', highlights: ['Pułapki żywołapki', 'Trutki żelowe', 'Uszczelnianie otworów'] },
  { icon: <ShieldCheck size={28} />, title: 'HACCP dla Firm', description: 'Kompletna dokumentacja HACCP, regularne przeglądy stacji deratyzacyjnych i monitoring z certyfikatem dla sanepidu.', highlights: ['Dokumentacja HACCP', 'Regularne przeglądy', 'Certyfikat sanepid'] },
  { icon: <Home size={28} />, title: 'Kuny Domowe', description: 'Odłów i odstraszanie kun, które gnieżdżą się na poddaszach i w garażach. Zabezpieczamy przejścia, instalujemy odstraszacze.', highlights: ['Odłów humanitarny', 'Zabezpieczenie poddaszy', 'Odstraszacze ultradźwiękowe'] },
];

const steps = [
  { number: '01', title: 'Kontakt', description: 'Zadzwoń lub napisz — odpowiadamy w ciągu 30 minut.' },
  { number: '02', title: 'Audyt', description: 'Inspekujemy obiekt, identyfikujemy gatunek i ścieżki migracji gryzoni.' },
  { number: '03', title: 'Zabieg', description: 'Rozmieszczamy stacje deratyzacyjne i uszczelniamy budynek.' },
  { number: '04', title: 'Monitoring', description: 'Regularnie sprawdzamy stacje i raportujemy — pełna dokumentacja.' },
];

const faq = [
  { q: 'Jak szybko zadziałają trutki?', a: 'Rodentycydy najnowszej generacji działają w ciągu 3-5 dni. Efekt jest opóźniony celowo, żeby gryzonie nie skojarzyły zagrożenia z przynętą.' },
  { q: 'Czy trutki są bezpieczne dla psów i kotów?', a: 'Tak. Stacje deratyzacyjne są zamykane na klucz i montowane w miejscach niedostępnych dla zwierząt domowych.' },
  { q: 'Mam restaurację — czy potrzebuję stałej umowy?', a: 'Tak. Sanepid wymaga aktualnej dokumentacji HACCP i regularnego monitoringu. Oferujemy umowy serwisowe z comiesięczną kontrolą.' },
  { q: 'Ile kosztuje deratyzacja?', a: 'Jednorazowy zabieg od 200 zł. Stała umowa HACCP od 150 zł/miesiąc. Dokładną wycenę przygotowujemy po oględzinach — zadzwoń!' },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-white/10 rounded-2xl overflow-hidden bg-white/5 hover:border-brand-cyan/30 transition-colors">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-6 text-left">
        <span className="text-white font-semibold text-lg pr-4">{q}</span>
        <ChevronDown size={20} className={`text-brand-cyan shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-48 pb-6' : 'max-h-0'}`}>
        <p className="px-6 text-gray-400 leading-relaxed">{a}</p>
      </div>
    </div>
  );
}

export default function DeratyzacjaPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {/* HERO */}
        <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image src="/img/deratyzacja-hero.png" alt="Deratyzacja Poznań" fill className="object-cover opacity-25" priority />
            <div className="absolute inset-0 bg-gradient-to-b from-brand-blue/60 via-brand-blue/80 to-brand-blue" />
          </div>
          <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-cyan/30 bg-brand-cyan/10 text-brand-cyan text-sm font-medium mb-6 backdrop-blur-sm">
              <Rat size={16} /><span>Zwalczanie gryzoni</span>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15 }}
              className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight">
              Deratyzacja <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-green">Poznań</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
              className="text-xl md:text-2xl text-gray-300 max-w-3xl mb-10 leading-relaxed">
              Profesjonalne zwalczanie gryzoni — szczurów, myszy i kun. <strong className="text-white">Gwarancja skuteczności i dokumentacja HACCP.</strong>
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.45 }} className="flex flex-col sm:flex-row gap-4">
              <a href="tel:+48720638628" className="flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-red-600 hover:bg-red-700 text-white text-lg font-bold transition-all shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:shadow-[0_0_30px_rgba(220,38,38,0.6)] hover:-translate-y-1">
                <PhoneCall size={24} /><span>Zadzwoń teraz</span>
              </a>
              <a href="/cennik" className="flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white text-lg font-bold backdrop-blur-md transition-all border border-white/20">Zobacz cennik</a>
            </motion.div>
          </div>
        </section>

        {/* SERVICES */}
        <section className="py-20 md:py-28 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-cyan/5 rounded-full blur-[120px] -z-10" />
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
              <motion.h2 variants={fadeUp} custom={0} className="text-3xl md:text-5xl font-bold text-white mb-6">Jakich <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-green">gryzoni zwalczamy?</span></motion.h2>
              <motion.p variants={fadeUp} custom={1} className="text-lg text-gray-400 max-w-2xl mx-auto">Identyfikujemy gatunek, lokalizujemy wejścia, dobieramy optymalną metodę.</motion.p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {services.map((s, i) => (
                <motion.div key={s.title} initial="hidden" whileInView="visible" custom={i} variants={fadeUp} viewport={{ once: true }}
                  className="group relative p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-brand-cyan/40 transition-all overflow-hidden">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-brand-cyan/5 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-brand-cyan/10 transition-all" />
                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-2xl bg-brand-cyan/10 border border-brand-cyan/20 flex items-center justify-center text-brand-cyan mb-5 group-hover:scale-110 transition-transform">{s.icon}</div>
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-brand-cyan transition-colors">{s.title}</h3>
                    <p className="text-gray-400 leading-relaxed mb-5">{s.description}</p>
                    <div className="flex flex-wrap gap-2">{s.highlights.map(h => (<span key={h} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300">{h}</span>))}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* WHERE WE WORK */}
        <section className="py-16 md:py-20 border-t border-white/5">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.h2 initial="hidden" whileInView="visible" custom={0} variants={fadeUp} viewport={{ once: true }} className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">Obsługujemy <span className="text-brand-green">każdy obiekt</span></motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[{ icon: <Home size={24} />, label: 'Domy i piwnice' }, { icon: <Building2 size={24} />, label: 'Bloki i kamienice' }, { icon: <Warehouse size={24} />, label: 'Magazyny i hale' }, { icon: <UtensilsCrossed size={24} />, label: 'Restauracje i hotele' }].map((item, i) => (
                <motion.div key={item.label} initial="hidden" whileInView="visible" custom={i} variants={fadeUp} viewport={{ once: true }}
                  className="flex flex-col items-center text-center gap-3 p-6 rounded-2xl bg-white/5 border border-white/10">
                  <div className="text-brand-green">{item.icon}</div>
                  <span className="text-white font-semibold">{item.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section className="py-20 md:py-28 relative">
          <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-brand-green/5 rounded-full blur-[100px] -z-10" />
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
              <motion.h2 variants={fadeUp} custom={0} className="text-3xl md:text-5xl font-bold text-white mb-6">Jak <span className="text-brand-green">pracujemy?</span></motion.h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {steps.map((step, i) => (
                <motion.div key={step.number} initial="hidden" whileInView="visible" custom={i} variants={fadeUp} viewport={{ once: true }}
                  className="relative p-8 rounded-3xl bg-white/5 border border-white/10 text-center group hover:border-brand-green/30 transition-colors">
                  <span className="text-5xl font-extrabold text-brand-green/20 group-hover:text-brand-green/40 transition-colors">{step.number}</span>
                  <h3 className="text-xl font-bold text-white mt-2 mb-3">{step.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 md:py-28 border-t border-white/5">
          <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
            <motion.h2 initial="hidden" whileInView="visible" custom={0} variants={fadeUp} viewport={{ once: true }} className="text-3xl md:text-5xl font-bold text-white mb-12 text-center">Często zadawane <span className="text-brand-cyan">pytania</span></motion.h2>
            <div className="space-y-4">{faq.map((item) => (<FAQItem key={item.q} {...item} />))}</div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="relative rounded-3xl overflow-hidden p-10 md:p-16 text-center">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan/20 via-brand-blue to-brand-green/20" />
              <div className="absolute inset-0 border border-white/10 rounded-3xl" />
              <div className="relative z-10">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Problem z <span className="text-brand-cyan">gryzoniami?</span></h2>
                <p className="text-lg text-gray-300 mb-8 max-w-xl mx-auto">Nie czekaj — gryzonie mnożą się szybko. Zadzwoń teraz po bezpłatną wycenę.</p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a href="tel:+48720638628" className="flex items-center gap-3 px-8 py-4 rounded-full bg-red-600 hover:bg-red-700 text-white text-lg font-bold transition-all shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:-translate-y-1"><PhoneCall size={24} />720 638 628</a>
                  <a href="/kontakt" className="flex items-center gap-3 px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white text-lg font-bold backdrop-blur-md border border-white/20 transition-all">Formularz kontaktowy</a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
