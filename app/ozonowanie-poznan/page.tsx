import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';

export const metadata = {
  title: 'Ozonowanie Poznań | Usuwanie Zapachów i Alergenów',
  description: 'Profesjonalne ozonowanie pomieszczeń, mieszkań i samochodów w Poznaniu. Bezinwazyjne usuwanie trudnych zapachów, grzybów, wirusów i alergenów.',
};

export default function OzonowaniePage() {
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-24 min-h-screen">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ozonowanie <span className="text-brand-cyan">Poznań</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl">
              100% naturalna i bezinwazyjna metoda oczyszczania powietrza. Generator ozonu przekształca tlen w silny utleniacz – ozon, który dekomponuje zapachy i alergeny.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Na co pomaga Ozonowanie?</h2>
              <p className="text-gray-400 mb-6">
                Ozon to gaz, który dociera głęboko w materiały, neutralizując zapach, a nie go maskując. Idealny do mieszkań zakupionych na rynku wtórnym, po palaczach czy po zalaniach.
              </p>
              <ul className="text-gray-300 space-y-2 list-disc list-inside">
                <li>Zneutralizuje zapach dymu tytoniowego, spalenizny</li>
                <li>Zabije roztocza i grzyby (ważne dla alergików)</li>
                <li>Dezynfekuje klimatyzację (także samochodową)</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
