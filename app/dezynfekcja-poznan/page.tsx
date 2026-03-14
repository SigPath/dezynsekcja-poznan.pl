import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';

export const metadata = {
  title: 'Dezynfekcja Poznań | Sterylizacja, Usuwanie Wirusów',
  description: 'Skuteczna dezynfekcja pomieszczeń w Poznaniu. Profesjonalne zwalczanie wirusów, bakterii, grzybów. Odkażanie po zalaniach, chorobach i zgonach.',
};

export default function DezynfekcjaPage() {
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-24 min-h-screen">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Dezynfekcja <span className="text-brand-cyan">Poznań</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl">
              Chronimy Twoje zdrowie. Świadczymy usługi odkażania, sterylizacji powierzchni oraz likwidacji drobnoustrojów (wirusów, grzybów, bakterii).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Mieszkania, Biura, Szpitale</h2>
              <p className="text-gray-400 mb-6">
                Używamy atestowanych chemikaliów biobójczych, które w połączeniu z zamgławianiem (zimnym i gorącym) wnikają w każdą szczelinę.
              </p>
              <ul className="text-gray-300 space-y-2 list-disc list-inside">
                <li>Dezynfekcja zapobiegawcza i pochorobowa</li>
                <li>Odkażanie kanałów zsypowych, piwnic i strychów</li>
                <li>Certyfikat wykonania dla sanepidu</li>
              </ul>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Sprzątanie Specjalistyczne</h2>
              <p className="text-gray-400 mb-6">
                Zabezpieczamy miejsca po zalaniach (np. wyciek kanalizacji) oraz tzw. trudne przypadki jak dezynfekcja pomieszczeń po zmarłych.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
