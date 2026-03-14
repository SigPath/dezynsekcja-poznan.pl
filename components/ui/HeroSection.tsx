'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';
import { motion } from 'framer-motion';
import { ShieldCheck, PhoneCall } from 'lucide-react';

function ParticleField(props: any) {
  const ref = useRef<any>(null);
  const sphere = random.inSphere(new Float32Array(5000), { radius: 1.5 });

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#00f0ff"
          size={0.003}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

export default function HeroSection() {
  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-40">
        <Canvas camera={{ position: [0, 0, 1] }}>
          <ParticleField />
        </Canvas>
      </div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

      <div className="container mx-auto px-4 z-10 relative mt-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-cyan/30 bg-brand-cyan/10 text-brand-cyan text-sm font-medium mb-8 backdrop-blur-sm"
          >
            <ShieldCheck size={18} />
            <span>Skuteczność gwarantowana (Umowa)</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-tight"
          >
            Profesjonalna <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-green">walka ze szkodnikami</span> <br />w Poznaniu
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto"
          >
            Kompleksowe usługi DDD: Dezynsekcja, Deratyzacja, Dezynfekcja, Ozonowanie z zachowaniem pełnej dyskrecji.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="tel:+48720638628"
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-red-600 hover:bg-red-700 text-white text-lg font-bold transition-all shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:shadow-[0_0_30px_rgba(220,38,38,0.6)] hover:-translate-y-1"
            >
              <PhoneCall size={24} />
              <span>Zadzwoń teraz</span>
            </a>
            <a
              href="/cennik"
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white text-lg font-bold backdrop-blur-md transition-all border border-white/20"
            >
              Zobacz cennik
            </a>
          </motion.div>
        </div>
      </div>
      
      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-brand-blue to-transparent z-0"></div>
    </section>
  );
}
