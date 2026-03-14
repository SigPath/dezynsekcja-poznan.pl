import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import { PhoneCall, Mail, MapPin, Clock } from 'lucide-react';

export const metadata = {
  title: 'Kontakt | Dezynsekcja Poznań',
  description: 'Skontaktuj się z nami w celu zamówienia usługi DDD. Szybka wycena i dojazd na terenie Poznania i okolic.',
};

export default function KontaktPage() {
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-24 min-h-screen">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Szybki <span className="text-brand-green">Kontakt</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Masz problem ze szkodnikami? Zadzwoń lub zostaw numer — oddzwonimy z darmową wyceną.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="bg-white/5 border border-white/10 rounded-3xl p-8 transition-transform hover:-translate-y-1">
                <div className="flex items-center gap-4 mb-4 text-brand-cyan">
                  <div className="p-3 bg-brand-cyan/10 rounded-full">
                    <PhoneCall size={28} />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Zadzwoń teraz</h3>
                </div>
                <p className="text-gray-400 mb-2">Jesteśmy dostępni 24/7 (Szybka interwencja)</p>
                <a href="tel:+48720638628" className="text-3xl font-bold text-brand-green hover:opacity-80 transition-opacity">
                  +48 720 638 628
                </a>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-3xl p-8 transition-transform hover:-translate-y-1">
                <div className="flex items-center gap-4 mb-4 text-brand-cyan">
                  <div className="p-3 bg-brand-cyan/10 rounded-full">
                    <Mail size={28} />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Napisz do nas</h3>
                </div>
                <p className="text-gray-400 mb-2">Odpowiemy tak szybko, jak to możliwe.</p>
                <a href="mailto:kontakt@dezynsekcja-poznan.pl" className="text-xl font-bold text-white hover:text-brand-cyan transition-colors">
                  kontakt@dezynsekcja-poznan.pl
                </a>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
                  <div className="flex items-center gap-3 mb-3 text-white">
                    <MapPin size={24} className="text-brand-cyan" />
                    <h4 className="font-bold">Obszar Działania</h4>
                  </div>
                  <p className="text-gray-400">Poznań i okolice (Luboń, Swarzędz, Komorniki)</p>
                </div>
                
                <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
                  <div className="flex items-center gap-3 mb-3 text-white">
                    <Clock size={24} className="text-brand-cyan" />
                    <h4 className="font-bold">Godziny Pracy</h4>
                  </div>
                  <p className="text-gray-400">Całodobowo (24/7)</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 lg:p-10">
              <h2 className="text-3xl font-bold text-white mb-2">Zostaw numer</h2>
              <p className="text-gray-400 mb-8">Zostaw swój numer telefonu lub e-mail, a nasz specjalista skontaktuje się z Tobą w ciągu 15 minut.</p>
              
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Imię i nazwisko</label>
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-cyan focus:border-transparent transition-all"
                    placeholder="Wpisz imię..."
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">Numer telefonu</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-cyan focus:border-transparent transition-all"
                    placeholder="+48 ___ ___ ___"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Opcjonalna wiadomość co się dzieje</label>
                  <textarea 
                    id="message" 
                    rows={4}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-cyan focus:border-transparent transition-all resize-none"
                    placeholder="Opisz krótko swój problem..."
                  ></textarea>
                </div>

                <div className="pt-2">
                  <button type="submit" className="w-full bg-brand-green hover:bg-green-500 text-gray-900 font-bold text-lg rounded-xl px-8 py-4 transition-all shadow-[0_0_20px_rgba(57,255,20,0.3)] hover:shadow-[0_0_30px_rgba(57,255,20,0.5)] hover:-translate-y-1">
                    Zostaw numer / Wyślij
                  </button>
                  <p className="text-xs text-gray-500 mt-4 text-center">
                    Zostawiając dane zgadzasz się na naszą politykę prywatności (kontakt nastąpi tylko w celu darmowej wyceny DDD).
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
