import Navbar from '@/components/ui/Navbar';
import HeroSection from '@/components/ui/HeroSection';
import ServiceCard from '@/components/ui/ServiceCard';
import BrandPillars from '@/components/ui/BrandPillars';
import FloatingCTA from '@/components/ui/FloatingCTA';
import Footer from '@/components/ui/Footer';
import { Bug, Rat, Droplets, Wind } from 'lucide-react';

export default function Home() {
  const services = [
    {
      title: 'Dezynsekcja',
      description: 'Zwalczanie pluskiew, prusaków, os, szubaków i innych uciążliwych owadów. Skuteczne metody zamgławiania ULV.',
      icon: <Bug size={32} />,
      href: '/dezynsekcja-poznan',
    },
    {
      title: 'Deratyzacja',
      description: 'Bezpieczne i szybkie usuwanie gryzoni (myszy, szczury) z domów, firm i magazynów. Wykładanie trutek i pułapek.',
      icon: <Rat size={32} />,
      href: '/deratyzacja-poznan',
    },
    {
      title: 'Dezynfekcja',
      description: 'Sterylizacja pomieszczeń, usuwanie groźnych wirusów, bakterii oraz patogenów po zalaniach czy zgonach.',
      icon: <Droplets size={32} />,
      href: '/dezynfekcja-poznan',
    },
    {
      title: 'Ozonowanie',
      description: 'Oczyszczanie powietrza, trwałe usuwanie przykrych zapachów (np. spalenizny, dymu) i groźnych alergenów.',
      icon: <Wind size={32} />,
      href: '/ozonowanie-poznan',
    },
  ];

  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col">
        <HeroSection />
        
        {/* Services Section */}
        <section className="py-24 relative overflow-hidden" id="uslugi">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-cyan/5 rounded-full blur-[100px] -z-10"></div>
          
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                Nasze Główne <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-green">Usługi</span>
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Oferujemy pełen pakiet usług DDD dopasowanych do Twoich potrzeb, z gwarancją skuteczności na piśmie.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service, index) => (
                <ServiceCard 
                  key={service.title} 
                  {...service} 
                  delay={index * 0.15} 
                />
              ))}
            </div>
          </div>
        </section>

        <BrandPillars />
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
