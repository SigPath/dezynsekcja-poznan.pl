import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';

export const metadata = {
  title: 'Cennik Usług DDD | Dezynsekcja, Deratyzacja Poznań',
  description: 'Aktualny cennik usług dezynsekcji, deratyzacji, dezynfekcji i ozonowania w Poznaniu. Darmowa wycena i dojazd. Przejrzyste warunki.',
};

export default function CennikPage() {
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-24 min-h-screen">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Przejrzysty <span className="text-brand-green">Cennik</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Każde zlecenie traktujemy indywidualnie, jednak poniżej przedstawiamy bazowe ceny naszych najpopularniejszych usług.
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-white/5 border border-white/10 rounded-3xl overflow-hidden">
            <table className="w-full text-left text-gray-300">
              <thead className="bg-brand-blue border-b border-white/10">
                <tr>
                  <th className="p-6 font-bold text-white text-lg">Usługa</th>
                  <th className="p-6 font-bold text-white text-lg">Cena (od)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="p-6">Zwalczanie Pluskiew (Oprysk + ULV) - kawalerka/pokój</td>
                  <td className="p-6 font-bold text-brand-green">od 250 zł</td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="p-6">Zwalczanie Pluskiew - mieszkanie 2-3 pokojowe</td>
                  <td className="p-6 font-bold text-brand-green">od 350 zł</td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="p-6">Dezynsekcja Prusaków/Karaluchów (metoda żelowa)</td>
                  <td className="p-6 font-bold text-brand-green">od 200 zł</td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="p-6">Usuwanie Gniazda Os / Szerszeni</td>
                  <td className="p-6 font-bold text-brand-green">od 300 zł</td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="p-6">Zwalczanie mrówek / rybików / pcheł</td>
                  <td className="p-6 font-bold text-brand-green">od 180 zł</td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="p-6">Deratyzacja (rozkładanie stacji, trutek)</td>
                  <td className="p-6 font-bold text-brand-green">od 200 zł</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="mt-12 text-center text-gray-400 max-w-2xl mx-auto">
            <p>Zadzwoń do nas, opisz swój problem i metraż, a my podamy dokładną wycenę przez telefon. Bez ukrytych kosztów.</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
