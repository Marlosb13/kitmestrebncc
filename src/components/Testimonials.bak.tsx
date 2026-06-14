import React, { useState, useEffect, useRef } from "react";

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
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);

  // Set initial scroll position to the middle third of the carousel
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const setInitialPos = () => {
      if (container.scrollWidth > 0) {
        container.scrollLeft = container.scrollWidth / 3;
      }
    };

    setInitialPos();

    window.addEventListener("load", setInitialPos);
    const interval = setInterval(() => {
      if (container.scrollLeft === 0 && container.scrollWidth > 100) {
        container.scrollLeft = container.scrollWidth / 3;
        clearInterval(interval);
      }
    }, 150);

    return () => {
      window.removeEventListener("load", setInitialPos);
      clearInterval(interval);
    };
  }, []);

  // Frame-by-frame auto-scrolling loop
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationId: number;
    let lastTime = performance.now();

    const step = (now: number) => {
      const elapsed = now - lastTime;
      
      // Auto-scroll when user is not interacting
      if (!isMouseDown) {
        const distance = elapsed * 0.045; // adjustment factor for smooth scroll speed
        container.scrollLeft += distance;

        // Perform wrapping correction beautifully
        const oneThird = container.scrollWidth / 3;
        if (oneThird > 0) {
          if (container.scrollLeft >= oneThird * 2) {
            container.scrollLeft -= oneThird;
          } else if (container.scrollLeft <= 0) {
            container.scrollLeft += oneThird;
          }
        }
      }

      lastTime = now;
      animationId = requestAnimationFrame(step);
    };

    animationId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationId);
  }, [isMouseDown]);

  // Drag-to-scroll event handlers for desktop mouse interaction
  const handleMouseDown = (e: React.MouseEvent) => {
    const container = containerRef.current;
    if (!container) return;
    setIsMouseDown(true);
    setStartX(e.pageX - container.offsetLeft);
    setScrollLeftState(container.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDown) return;
    e.preventDefault();
    const container = containerRef.current;
    if (!container) return;
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startX) * 1.5; // drag sensitivity multiplier
    container.scrollLeft = scrollLeftState - walk;
  };

  const handleMouseUpOrLeave = () => {
    setIsMouseDown(false);
  };

  // Touch handlers for seamless mobile interaction (native swipe)
  const handleTouchStart = () => {
    setIsMouseDown(true);
  };

  const handleTouchEnd = () => {
    setIsMouseDown(false);
  };

  return (
    <section className="py-12 bg-white text-center overflow-hidden">
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      <div className="text-center mb-8 px-6">
        <h2 className="text-3xl font-black text-[#0C2551] leading-tight mb-2">
          Professoras estão transformando suas aulas
        </h2>
      </div>
      
      <div className="w-full overflow-hidden relative">
        <div 
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="flex w-full overflow-x-auto no-scrollbar touch-pan-x cursor-grab active:cursor-grabbing select-none"
        >
          <div
            className="flex gap-4 px-4"
            style={{ width: "max-content" }}
          >
            {carouselImages.map((src, index) => (
              <div
                key={index}
                className="w-[60vw] md:w-[320px] shrink-0 transform transition-transform duration-500 hover:scale-[1.01] aspect-[9/16] relative bg-slate-100 rounded-2xl overflow-hidden"
              >
                <img
                  src={src}
                  alt={`Depoimento ${index + 1}`}
                  className="w-full h-full object-cover block pointer-events-none select-none"
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
