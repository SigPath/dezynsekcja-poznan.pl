import Link from 'next/link';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#050a18] border-t border-white/5 pt-20 pb-10">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Col */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2 group inline-block">
              <span className="text-2xl font-bold tracking-tight text-white">
                Dezynsekcja<span className="text-brand-cyan">Poznań</span>
              </span>
            </Link>
            <p className="text-gray-400">
              Certyfikowana firma DDD obsługująca Poznań i okoliczne miejscowości (Luboń, Swarzędz, Komorniki). Dojeżdżamy do 120 minut.
            </p>
          </div>

          {/* Contact Col */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6">Kontakt Formularz</h4>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-brand-cyan" />
                <a href="tel:+48720638628" className="hover:text-white transition-colors">+48 720 638 628</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-brand-cyan" />
                <a href="mailto:kontakt@dezynsekcja-poznan.pl" className="hover:text-white transition-colors">kontakt@dezynsekcja-poznan.pl</a>
              </li>
              <li className="flex items-center gap-3">
                <MapPin size={18} className="text-brand-cyan" />
                <span>Poznań (całe miasto)</span>
              </li>
              <li className="flex items-center gap-3">
                <Clock size={18} className="text-brand-cyan" />
                <span>24/7 (Szybka interwencja)</span>
              </li>
            </ul>
          </div>

          {/* Links Col */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6">Usługi</h4>
            <ul className="space-y-3 text-gray-400">
              <li><Link href="/dezynsekcja-poznan" className="hover:text-brand-cyan transition-colors">Zwalczanie Pluskiew</Link></li>
              <li><Link href="/dezynsekcja-poznan" className="hover:text-brand-cyan transition-colors">Zwalczanie Prusaków</Link></li>
              <li><Link href="/deratyzacja-poznan" className="hover:text-brand-cyan transition-colors">Deratyzacja (Gryzonie)</Link></li>
              <li><Link href="/dezynfekcja-poznan" className="hover:text-brand-cyan transition-colors">Dezynfekcja Biur</Link></li>
              <li><Link href="/ozonowanie-poznan" className="hover:text-brand-cyan transition-colors">Ozonowanie</Link></li>
            </ul>
          </div>

          {/* CTA Col */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6">Masz problem ze szkodnikami?</h4>
            <p className="text-gray-400 mb-6">
              Nie zwlekaj. Im szybciej zadziałamy, tym problem będzie mniejszy. Zadzwoń po darmową wycenę.
            </p>
            <a
              href="tel:+48720638628"
              className="inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium transition-all border border-white/10"
            >
              <Phone size={20} />
              <span>Darmowa Konsultacja</span>
            </a>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-gray-500 text-sm">
          <p>&copy; {currentYear} Dezynsekcja Poznań. Wszystkie prawa zastrzeżone.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link href="/kontakt" className="hover:text-gray-300">Polityka Prywatności</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
