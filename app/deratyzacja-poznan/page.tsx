import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';

export const metadata = {
  title: 'Deratyzacja Poznań | Zwalczanie Szczurów i Myszy',
  description: 'Skuteczna deratyzacja w Poznaniu. Bezpieczne usuwanie szczurów, myszy oraz innych gryzoni. Metody chemiczne i mechaniczne. Zadzwoń po wycenę.',
};

export default function DeratyzacjaPage() {
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-24 min-h-screen">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Deratyzacja <span className="text-brand-cyan">Poznań</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl">
              Zapewniamy profesjonalne i szybkie zwalczanie gryzoni – szczurów i myszy. Obsługujemy domy prywatne, piwnice, bloki mieszkalne, a także obiekty komercyjne i magazynowe.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Zwalczanie Szczurów i Myszy</h2>
              <p className="text-gray-400 mb-6">
                Rozmieszczamy karmniki deratyzacyjne oraz bezpieczne stacje przynęt z rodentycydami najnowszej generacji. Środki, których używamy, posiadają substancje mumifikujące, które zapobiegają przykremu zapachowi w przypadku padnięcia gryzonia w trudnodostępnym miejscu.
              </p>
              <ul className="text-gray-300 space-y-2 list-disc list-inside">
                <li>Precyzyjne audyty szczelności budynku</li>
                <li>Montaż bezpiecznych stacji deratyzacyjnych</li>
                <li>HACCP dla firm i gastronomii</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
