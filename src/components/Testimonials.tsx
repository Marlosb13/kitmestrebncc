import React, { useState } from "react";

interface Testimonial {
  name: string;
  avatar: string;
  role: string;
  text: string;
  stars: number;
}

const images = [
  "https://i.postimg.cc/jSW469YW/Chat-GPT-(3).webp",
  "https://i.postimg.cc/XvdKmCJS/Chat-GPT-(5).webp",
  "https://i.postimg.cc/nLbB4h1g/Chat-GPT-(6).webp",
  "https://i.postimg.cc/XvLqrj1F/Chat-GPT-(8).webp",
  "https://i.postimg.cc/50t0vhD3/Chat-GPT-(10).webp"
];

// Duplicated for an extra smooth, seamless infinite scrolling carousel
const carouselImages = [...images, ...images, ...images];

const Testimonials: React.FC<{ testimonials?: Testimonial[] }> = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="py-12 bg-white text-center overflow-hidden">
      <style>{`
        @keyframes customMarquee {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-33.33333%, 0, 0);
          }
        }
        .custom-marquee-animate {
          animation: customMarquee 20s linear infinite;
        }
      `}</style>
      <div className="text-center mb-8 px-6">
        <h2 className="text-3xl font-black text-[#0C2551] leading-tight mb-2">
          Professoras estão transformando suas aulas
        </h2>
      </div>
      
      <div 
        className="w-full overflow-hidden relative cursor-pointer"
        onClick={() => setIsPaused(!isPaused)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex w-full group">
          <div
            className="flex gap-4 px-4 custom-marquee-animate"
            style={{
              width: "max-content",
              animationPlayState: (isPaused || isHovered) ? "paused" : "running",
            }}
          >
            {carouselImages.map((src, index) => (
              <div
                key={index}
                className="w-[60vw] md:w-[320px] shrink-0 transform transition-transform duration-500 hover:scale-[1.02] cursor-pointer"
              >
                <img
                  src={src}
                  alt={`Depoimento ${index + 1}`}
                  className="w-full h-auto object-contain rounded-none border-0 shadow-none block pointer-events-none select-none"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            ))}
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default Testimonials;

