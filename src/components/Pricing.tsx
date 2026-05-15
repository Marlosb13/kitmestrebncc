import React from "react";
import { Star, CheckCircle2 } from "lucide-react";

interface PricingProps {
  setShowUpsell: (show: boolean) => void;
}

const Pricing: React.FC<PricingProps> = ({ setShowUpsell }) => {
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
              <p className="text-white/40 text-xs font-black tracking-widest uppercase">ACESSO COMPLETO + TODOS OS BÔNUS</p>
              <h3 className="text-3xl font-black text-white mt-1">Kit Mestre BNCC</h3>
              <p className="text-white/60 text-base mt-3 mb-8">Do Infantil ao 5º ano</p>
           </div>
           
           <div className="bg-white/5 rounded-[2rem] p-8 mb-8">
              <p className="text-xs text-white/50 font-black uppercase tracking-[0.2em] mb-4">Valor individual dos materiais:</p>
              <div className="space-y-3 pb-6 border-b border-white/10">
                 <div className="flex justify-between text-white text-xs font-bold"><span>Dinâmicas</span> <span className="line-through">R$ 97</span></div>
                 <div className="flex justify-between text-white text-xs font-bold"><span>Storytelling & Lógica</span> <span className="line-through">R$ 97</span></div>
                 <div className="flex justify-between text-white text-xs font-bold"><span>Banco de Planos</span> <span className="line-through">R$ 97</span></div>
                 <div className="flex justify-between text-white text-xs font-bold"><span>Atividades Interdisciplinares</span> <span className="line-through">R$ 97</span></div>
              </div>
              <div className="flex justify-between text-[#e4bf23] text-base font-black pt-6"><span>Valor total:</span> <span className="line-through opacity-50 mr-2">R$ 388</span></div>
           </div>

           <div className="mb-8 text-center sm:text-left">
              <p className="text-white text-xs font-black uppercase tracking-widest mb-1">Hoje por apenas</p>
              <div className="flex items-baseline gap-1 justify-center sm:justify-start">
                 <span className="text-white text-5xl font-black tracking-tighter italic">R$ 19,90</span>
              </div>
           </div>

           <ul className="grid grid-cols-1 gap-4 mb-10">
              {[
                "Mais de 600 Dinâmicas",
                "Habilidades BNCC organizadas",
                "Acesso imediato e vitalício",
                "Atividades de lógica e representação binária",
                "Roteiros de storytelling",
                "Guia BNCC comentado",
                "Conteúdos extras de folclore e raciocínio lógico"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm font-bold text-white/80">
                  <CheckCircle2 className="text-[#e4bf23] shrink-0" size={16} /> {item}
                </li>
              ))}
           </ul>

           <button 
             onClick={() => window.location.href = "https://pagamento.checkoutseguro.shop/checkout/v5/qppegBTZJAhMgbVrsLxw"}
             className="w-full py-6 uppercase font-black text-xs rounded-2xl bg-[#22c55e] text-white hover:bg-[#16a34a] transition-colors text-center"
           >
              QUERO GARANTIR O KIT COMPLETO
           </button>

           <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-3 text-white max-w-[280px] mx-auto">
             <span className="text-[10px] font-bold flex items-center justify-center gap-1 uppercase tracking-widest text-white/80">✓ Compra protegida</span>
             <span className="text-[10px] font-bold flex items-center justify-center gap-1 uppercase tracking-widest text-white/80">✓ Liberação imediata</span>
             <span className="text-[10px] font-bold flex items-center justify-center gap-1 uppercase tracking-widest text-white/80">✓ Garantia de 15 dias</span>
             <span className="text-[10px] font-bold flex items-center justify-center gap-1 uppercase tracking-widest text-white/80">✓ Suporte direto</span>
           </div>
        </div>

        {/* Secondary Card */}
        <div className="bg-slate-50/50 rounded-[2.5rem] p-10 border-2 border-slate-100 flex flex-col items-center text-center">
           <p className="text-slate-400 text-[10px] font-black tracking-[0.2em] uppercase">Pacote Básico</p>
           <h4 className="text-2xl font-black text-[#0C2551] mt-2 mb-4">Kit Fundamental Prático</h4>
           <p className="text-slate-400 text-xs mb-8">Ideal para quem precisa começar imediatamente</p>
           
           <div className="mb-8">
              <p className="text-slate-400 text-sm line-through decoration-red-400 mb-1">De R$ 47</p>
              <p className="text-[#0C2551] text-xs font-black uppercase tracking-widest mb-1">Hoje por</p>
              <div className="flex items-baseline justify-center gap-1">
                 <span className="text-[#0C2551] text-5xl font-black italic tracking-tighter">R$ 10</span>
              </div>
           </div>

           <ul className="space-y-4 mb-10 w-full">
              {[
                "100 Dinâmicas",
                "Conteúdo alinhado à BNCC",
                "Acesso Vitalício"
              ].map((item, i) => (
                <li key={i} className="flex items-center justify-center gap-2 text-sm font-bold text-slate-600">
                  <CheckCircle2 className="text-[#00BC70] shrink-0" size={18} /> {item}
                </li>
              ))}
           </ul>

           <button 
             onClick={() => setShowUpsell(true)}
             className="w-full py-4 bg-[#22c55e] hover:bg-[#16a34a] rounded-2xl font-black text-white shadow-lg shadow-green-900/10 transition-colors uppercase text-xs tracking-widest text-center cursor-pointer"
           >
              QUERO O PACOTE BÁSICO
           </button>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
