import React from "react";
import { motion } from "motion/react";

interface ActivitiesShowcaseProps {
  className?: string;
}

const activities = [
  "https://i.postimg.cc/gk0YVX45/Computacao-Desplugada-Cartoes.webp",
  "https://i.postimg.cc/q720J8MC/Folha-de-Atividade-Labirinto-Infantil-Design-Ludico-Azul.webp",
  "https://i.postimg.cc/QNfDdNs4/Matematica-logica.webp",
  "https://i.postimg.cc/cCFdq01B/Client-Challenge.webp",
  "https://i.postimg.cc/DzGfS953/ATIVIDADE-DE-MATEMATICA.webp",
  "https://i.postimg.cc/K8kxW667/Cruzadinhas-partes-do-computador-worksheet.webp",
];

// Duplicating for infinite loop effect
const carouselImages = [...activities, ...activities];

export const ActivitiesShowcase: React.FC<ActivitiesShowcaseProps> = () => {
  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="container mx-auto px-6 mb-12">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-[#0C2551] leading-tight tracking-tight">
            Veja Como São as <span className="text-[#0C2551]">+600 Atividades de Pensamento Computacional BNCC</span>
          </h2>
          <p className="text-slate-500 font-bold text-sm md:text-base leading-relaxed">
            Materiais organizados, modernos e 100% prontos para imprimir e aplicar em sala de aula.
          </p>
        </div>
      </div>

      <div className="relative">
        {/* Carousel Container */}
        <div className="flex w-full group">
          <motion.div
            className="flex gap-6 px-4"
            animate={{
              x: [0, "-50%"],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 40,
                ease: "linear",
              },
            }}
            style={{ width: "max-content" }}
            whileHover={{ animationPlayState: "paused" }}
          >
            {carouselImages.map((src, index) => (
              <div
                key={index}
                className="w-[280px] md:w-[320px] shrink-0 transform transition-transform duration-500 hover:scale-[1.05] cursor-default"
              >
                <img
                  src={src}
                  alt={`Atividade ${index + 1}`}
                  className="w-full aspect-[3/4] object-contain"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Gradient Fades for Premium Look */}
        <div className="absolute inset-y-0 left-0 w-20 md:w-40 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
        <div className="absolute inset-y-0 right-0 w-20 md:w-40 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
      </div>

    </section>
  );
};

export default ActivitiesShowcase;
