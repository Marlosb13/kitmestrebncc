import React, { useEffect } from "react";
import { Star, CheckCircle2 } from "lucide-react";

interface PricingProps {
  setShowUpsell: (show: boolean) => void;
}

const Pricing: React.FC<PricingProps> = ({ setShowUpsell }) => {
  useEffect(() => {
    // Utmify propagation for SPAs
    if ((window as any).utmifyPropagate) {
      (window as any).utmifyPropagate();
    }
  }, []);

  return (
    <section id="pricing" className="py-12 px-6 bg-white text-center">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-black text-[#0C2551] mt-4">Oferta Especial de Hoje</h2>
      </div>
      
      <div className="max-w-md mx-auto space-y-8 text-left">
        {/* Main Card */}
        <div className="bg-[#0C2551] rounded-[2.5rem] p-10 relative shadow-2xl border-x-0 border-y-0 overflow-hidden">
           <div className="absolute top-0 left-1/2 -translate-x-1/2 transform">
              <div className="bg-[#e4bf23] text-[#0C2551] font-black text-[10px] sm:text-xs uppercase px-4 sm:px-8 py-2 rounded-b-2xl shadow-md flex items-center gap-2 whitespace-nowrap">
                <Star size={12} className="fill-[#0C2551] shrink-0" /> KIT FAVORITO DOS PROFESSORES
              </div>
           </div>

           <div className="pt-6">
              <p className="text-[#e4bf23] text-3xl sm:text-4xl font-black tracking-[0.1em] uppercase mb-8 text-center">PACOTE PREMIUM</p>
           </div>
           



           <div className="mb-8 text-center">
              <p className="text-white text-[10px] font-black uppercase tracking-widest mb-1 opacity-80">Hoje por apenas</p>
              <div className="flex items-baseline gap-1 justify-center">
                 <span className="text-white text-5xl font-black tracking-tighter italic">R$ 17,90</span>
              </div>
           </div>

           <ul className="grid grid-cols-1 gap-4 mb-10">
              {[
                "+600 Atividades de Pensamento Computacional BNCC",
                "Habilidades BNCC organizadas",
                "Atividades de lógica e representação binária",
                "Roteiros de storytelling",
                "Guia BNCC comentado",
                "Conteúdos extras de folclore e raciocínio lógico",
                "Acesso imediato e vitalício",
                "Garantia de 15 dias",
                "Entrega diretamente no E-mail"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm font-bold text-white/80">
                  <CheckCircle2 className="text-[#e4bf23] shrink-0" size={16} /> {item}
                </li>
              ))}
           </ul>

           <a 
             href="https://pagamento.checkoutseguro.shop/checkout/v5/qppegBTZJAhMgbVrsLxw"
             className="w-full py-6 uppercase font-black text-xs rounded-2xl bg-[#22c55e] text-white hover:bg-[#16a34a] transition-colors text-center block"
           >
              COMPRAR PACOTE PREMIUM
           </a>

           <div className="hidden">
             <span className="text-[10px] font-bold flex items-center justify-center gap-1 uppercase tracking-widest text-white/80 whitespace-nowrap">✓ Compra protegida</span>
             <span className="text-[10px] font-bold flex items-center justify-center gap-1 uppercase tracking-widest text-white/80 whitespace-nowrap">✓ Garantia de 15 dias</span>
           </div>
        </div>

        {/* Secondary Card */}
        <div className="bg-slate-50/50 rounded-[2.5rem] p-10 border-2 border-slate-100 flex flex-col items-center text-center">
           <p className="text-[#0C2551] text-3xl sm:text-4xl font-black tracking-wider uppercase">Pacote Básico</p>

           
           <div className="mb-8">
              <p className="text-slate-400 text-base sm:text-lg line-through decoration-red-400 mb-1">De R$ 47</p>
              <p className="text-[#0C2551] text-xs font-black uppercase tracking-widest mb-1">Hoje por</p>
              <div className="flex items-baseline justify-center gap-1">
                 <span className="text-[#0C2551] text-5xl font-black italic tracking-tighter">R$ 10</span>
              </div>
           </div>

           <ul className="space-y-4 mb-10 w-full max-w-[280px] mx-auto">
              {[
                "100 Atividades de Pensamento Computacional BNCC",
                
                "Acesso Vitalício"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm font-bold text-slate-600 text-left">
                  <CheckCircle2 className="text-[#00BC70] shrink-0" size={18} /> {item}
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
              COMPRAR PACOTE BÁSICO
           </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
