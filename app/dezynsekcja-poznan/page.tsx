import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';

export const metadata = {
  title: 'Dezynsekcja Poznań | Zwalczanie Pluskiew, Karaluchów, Mrówek',
  description: 'Profesjonalna dezynsekcja w Poznaniu. Zwalczanie pluskiew, karaluchów, prusaków, mrówek, os i szerszeni. Szybki dojazd, gwarancja skuteczności.',
};

export default function DezynsekcjaPage() {
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-24 min-h-screen">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Dezynsekcja <span className="text-brand-cyan">Poznań</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl">
              Specjalizujemy się w zwalczaniu wszelkich owadów latających i biegających. Oferujemy pełne spektrum zabiegów: oprysk, żelowanie, zamgławianie ULV, termonebulizacja.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Zwalczanie Pluskiew</h2>
              <p className="text-gray-400 mb-6">
                Zaawansowane metody zwalczania pluskwy domowej. Stosujemy podwójny zabieg (oprysk szczelinowy + zamgławianie ULV) z użyciem naprzemiennych substancji czynnych, co zapobiega powstawaniu odporności.
              </p>
              <ul className="text-gray-300 space-y-2 list-disc list-inside">
                <li>Kontrola skuteczności po 10-14 dniach</li>
                <li>Bezpieczeństwo dla domowników i zwierząt</li>
                <li>Dyskretna realizacja (nieoznakowany pojazd)</li>
              </ul>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Prusaki i Karaluchy</h2>
              <p className="text-gray-400 mb-6">
                Wykorzystujemy m.in. bezpieczną metodę żelowania (wykładanie profesjonalnych trutek żelowych punktowo), która nie wymaga opuszczania lokalu ani przerw w pracy obiektów gastronomicznych.
              </p>
              <ul className="text-gray-300 space-y-2 list-disc list-inside">
                <li>Brak konieczności wietrzenia</li>
                <li>Idealne dla gastronomii, biur, szpitali</li>
                <li>Szybki efekt i długa ochrona</li>
              </ul>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Osy i Szerszenie</h2>
              <p className="text-gray-400 mb-6">
                Szybka interwencja i bezpieczne usunięcie gniazda błonkoskrzydłych. Używamy profesjonalnych kombinezonów, zabezpieczamy otwory na przyszłość.
              </p>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Mrówki, Pchły, Rybiki</h2>
              <p className="text-gray-400 mb-6">
                Rozwiązujemy problemy z drobnymi insektami za pomocą precyzyjnych oprysków i barier chemicznych (w tym skuteczne zwalczanie inwazji mrówek faraona).
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
