import React, { useEffect, useState, useRef } from "react";
import { Star, CheckCircle2, ArrowDown } from "lucide-react";

interface PricingProps {
  setShowUpsell: (show: boolean) => void;
}

const Pricing: React.FC<PricingProps> = ({ setShowUpsell }) => {
  const [timeLeft, setTimeLeft] = useState(() => {
    const saved = sessionStorage.getItem("promo_time_left");
    if (saved !== null) {
      const parsed = parseInt(saved, 10);
      if (!isNaN(parsed) && parsed > 0) {
        return parsed;
      }
    }
    return 15 * 60; // 15 minutes default
  });

  const [hasStarted, setHasStarted] = useState(() => {
    return sessionStorage.getItem("promo_timer_started") === "true";
  });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (hasStarted) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          sessionStorage.setItem("promo_timer_started", "true");
        }
      },
      { threshold: 0.5 } // Triggers when at least 50% of the card is visible on screen
    );
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          sessionStorage.setItem("promo_time_left", "0");
          return 0;
        }
        const nextTime = prev - 1;
        sessionStorage.setItem("promo_time_left", nextTime.toString());
        return nextTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [hasStarted]);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return {
      hours: hrs.toString().padStart(2, "0").split(""),
      minutes: mins.toString().padStart(2, "0").split(""),
      seconds: secs.toString().padStart(2, "0").split(""),
    };
  };

  const timeFormatted = formatTime(timeLeft);

  return (
    <section id="pricing" className="py-12 px-6 bg-white text-center">
      {/* Promo Countdown Card */}
      <div ref={containerRef} className="max-w-3xl mx-auto mb-12 px-2 xs:px-4">
        <div className="bg-white border-2 border-[#0C2551]/10 rounded-[2rem] p-4 xs:p-6 sm:p-8 shadow-[0_20px_50px_rgba(12,37,81,0.15),_inset_0_-6px_0_rgba(12,37,81,0.1)] text-center flex flex-col items-center">
          <p className="text-[#0C2551] text-[15px] xs:text-lg sm:text-xl md:text-2xl font-black tracking-wide uppercase mb-2">
            OFERTA PROMOCIONAL DISPONÍVEL NESTE MOMENTO
          </p>
          <p className="text-[#0C2551]/70 text-[13px] xs:text-sm sm:text-base font-bold mb-6">
            Esta condição fica disponível por:
          </p>
          
          <div className="flex items-center gap-0.5 xs:gap-1 sm:gap-2">
            {/* Hours */}
            <div className="flex gap-0.5 xs:gap-1">
              {timeFormatted.hours.map((digit, i) => (
                <div key={`h-${i}`} className="w-8 h-12 xs:w-10 xs:h-14 sm:w-12 sm:h-16 bg-amber-50 text-[#0C2551] border border-amber-200/80 rounded-lg xs:rounded-xl sm:rounded-2xl flex items-center justify-center text-lg xs:text-xl sm:text-2xl font-black shadow-md shadow-[#0C2551]/5">
                  {digit}
                </div>
              ))}
            </div>
            
            <span className="text-[#0C2551] text-xl xs:text-2xl sm:text-3xl font-black px-1 sm:px-2 animate-pulse">:</span>
            
            {/* Minutes */}
            <div className="flex gap-0.5 xs:gap-1">
              {timeFormatted.minutes.map((digit, i) => (
                <div key={`m-${i}`} className="w-8 h-12 xs:w-10 xs:h-14 sm:w-12 sm:h-16 bg-amber-50 text-[#0C2551] border border-amber-200/80 rounded-lg xs:rounded-xl sm:rounded-2xl flex items-center justify-center text-lg xs:text-xl sm:text-2xl font-black shadow-md shadow-[#0C2551]/5">
                  {digit}
                </div>
              ))}
            </div>
            
            <span className="text-[#0C2551] text-xl xs:text-2xl sm:text-3xl font-black px-1 sm:px-2 animate-pulse">:</span>
            
            {/* Seconds */}
            <div className="flex gap-0.5 xs:gap-1">
              {timeFormatted.seconds.map((digit, i) => (
                <div key={`s-${i}`} className="w-8 h-12 xs:w-10 xs:h-14 sm:w-12 sm:h-16 bg-amber-50 text-[#0C2551] border border-amber-200/80 rounded-lg xs:rounded-xl sm:rounded-2xl flex items-center justify-center text-lg xs:text-xl sm:text-2xl font-black shadow-md shadow-[#0C2551]/5">
                  {digit}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mb-10">
        <h2 className="text-4xl font-black text-[#0C2551] mt-4">Escolha a opção ideal para você</h2>
      </div>

      <div className="max-w-xl mx-auto space-y-8 text-left px-2 sm:px-0">
        {/* Secondary Card (Basic) */}
        <div className="bg-slate-50/50 rounded-[2.5rem] p-4 xs:p-6 sm:p-10 border-2 border-slate-100 flex flex-col items-center text-center">
           <p className="text-[#0C2551] text-2xl sm:text-3xl font-black tracking-[0.1em] uppercase mb-8 text-center whitespace-nowrap">Pacote Básico</p>

           



           <div className="mb-8 text-center">
              <p className="text-slate-400 text-base sm:text-lg font-black mb-1 uppercase">DE R$ 47,00</p>
              <div className="flex items-baseline gap-1 justify-center">
                 <span className="text-[#0C2551] text-6xl font-black italic tracking-tighter">R$ 10</span>
              </div>
           </div>

           <ul className="space-y-4 mb-10 w-full max-w-[280px] mx-auto">
              {[
                "100 Atividades de Pensamento Computacional BNCC",
                
                "Acesso Vitalício"
              ].filter(item => item !== "Acesso Vitalício").map((item, i) => (
                <li key={i} className="w-full">
                  
                   
                     <div className="w-full">
                       <div className="flex items-start gap-3 text-sm font-bold text-slate-600 text-left mb-6">
                          <CheckCircle2 className="text-[#00BC70] shrink-0" size={18} /> {item}
      
                       </div>
                       <div className="text-center pt-4 border-t border-slate-200 mb-4">
                         <p className="text-slate-400 text-xs font-black uppercase tracking-wider">BÔNUS NÃO INCLUSOS</p>
                       </div>
                       <ul className="space-y-3">
                         {[
                           "Habilidades BNCC organizadas",
                           "Atividades de lógica e representação binária",
                           "Roteiros de storytelling",
                           "Guia BNCC comentado",
                           "Conteúdos extras de folclore e raciocínio lógico"
                         ].map((bonus, idx) => (
                           <li key={idx} className="flex items-start gap-3 text-sm font-bold text-rose-500 text-left">
                             <span className="shrink-0 text-base leading-none">❌</span>
                             <span>{bonus}</span>
                           </li>
                         ))}
                       </ul>
                     </div>
                </li>
              ))}
           </ul>

           <div 
             role="button"
             tabIndex={0}
             onClick={() => setShowUpsell(true)}
             onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setShowUpsell(true); }}
             className="w-full py-4 bg-[#22c55e] hover:bg-[#16a34a] rounded-2xl font-black text-white shadow-lg shadow-green-900/10 transition-colors uppercase text-xs tracking-widest text-center cursor-pointer"
           >
              QUERO O PACOTE BÁSICO
            </div>

            {/* Informative attention card below the basic purchase button with downward arrow */}
            <div className="w-full mt-6 flex flex-col items-center">
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3 xs:p-4 w-full text-center shadow-sm">
                <p className="text-[#0C2551] text-[11px] xs:text-xs sm:text-sm font-black leading-relaxed">
                  89% dos Professores escolhem o pacote premium mais completo com Bônus
                </p>
              </div>
              <ArrowDown className="text-[#0C2551] animate-bounce mt-4 shrink-0" size={32} strokeWidth={3.5} />
           </div>
        </div>

        {/* Main Card (Premium) */}
        <div id="premium-card" className="bg-[#0C2551] rounded-[2.5rem] p-4 xs:p-6 sm:p-10 relative shadow-2xl border-x-0 border-y-0 overflow-hidden">
           <div className="absolute top-0 left-1/2 -translate-x-1/2 transform">
              <div className="bg-[#e4bf23] text-[#0C2551] font-black text-[10px] sm:text-xs uppercase px-4 sm:px-8 py-2 rounded-b-2xl shadow-md flex items-center gap-2 whitespace-nowrap">
                <Star size={12} className="fill-[#0C2551] shrink-0" /> O MAIS ESCOLHIDOS DOS PROFESSORES
              </div>
           </div>

           <div className="pt-6">
              <p className="text-[#e4bf23] text-2xl sm:text-3xl font-black tracking-[0.1em] uppercase mb-8 text-center whitespace-nowrap">PACOTE PREMIUM</p>
           </div>
           



           <div className="mb-8 text-center">
              <p className="text-white/60 text-base sm:text-lg font-black mb-1 uppercase">DE R$ 178,60</p>
              <div className="flex items-baseline gap-1 justify-center">
                 <span className="text-white text-6xl font-black tracking-tighter italic">R$ 17,90</span>
              </div>
           </div>

           <ul className="grid grid-cols-1 gap-4 mb-10">
              {[
                { text: "+600 Atividades de Pensamento Computacional BNCC", icon: "check" },
                { text: "Habilidades BNCC organizadas", icon: "gift" },
                { text: "Atividades de lógica e representação binária", icon: "gift" },
                { text: "Roteiros de storytelling", icon: "gift" },
                { text: "Guia BNCC comentado", icon: "gift" },
                { text: "Conteúdos extras de folclore e raciocínio lógico", icon: "gift" }
              ].map((item, i) => ( // premium-bonuses
                <li key={i} className="flex items-start gap-3 text-sm font-bold text-white/80">
                  {item.icon === "gift" ? (
                    <span className="shrink-0 text-base leading-none">🎁</span>
                  ) : (
                    <CheckCircle2 className="text-[#e4bf23] shrink-0" size={16} />
                  )}
                  <span>{item.text}</span>
                </li>
              ))}

              <li className="col-span-1 py-2 text-center list-none">
                <p className="text-[#e4bf23] text-sm sm:text-base font-black uppercase tracking-wide">
                  R$ 131,60 em bônus INCLUSOS GRÁTIS
                </p>
              </li>

              {[
                { text: "Acesso imediato e vitalício", icon: "check" },
                { text: "Garantia de 15 dias", icon: "check" },
                { text: "Entrega diretamente no E-mail", icon: "check" }
              ].map((item, i) => ( // premium-shipping
                <li key={i} className="flex items-start gap-3 text-sm font-bold text-white/80">
                  {item.icon === "gift" ? (
                    <span className="shrink-0 text-base leading-none">🎁</span>
                  ) : (
                    <CheckCircle2 className="text-[#e4bf23] shrink-0" size={16} />
                  )}
                  <span>{item.text}</span>
                </li>
              ))}
           </ul>

           <a 
             href="https://pagamento.checkoutseguro.shop/checkout/v5/qppegBTZJAhMgbVrsLxw"
             className="w-full py-6 uppercase font-black text-sm sm:text-lg rounded-2xl bg-[#22c55e] text-white hover:bg-[#16a34a] transition-colors text-center block"
           >
              QUERO O PACOTE PREMIUM
           </a>

           <div className="hidden">
             <span className="text-[10px] font-bold flex items-center justify-center gap-1 uppercase tracking-widest text-white/80 whitespace-nowrap">✓ Compra protegida</span>
             <span className="text-[10px] font-bold flex items-center justify-center gap-1 uppercase tracking-widest text-white/80 whitespace-nowrap">✓ Garantia de 15 dias</span>
           </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
