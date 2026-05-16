/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, lazy, Suspense } from "react";
import { AnimatePresence, motion } from "motion/react";
import { 
  CheckCircle2, 
  Clock, 
  BookOpen, 
  ShieldCheck, 
  Users, 
  Filter, 
  Calendar, 
  ClipboardCheck, 
  Sparkles,
  Lock,
  ArrowRight,
  Star,
  Quote,
  AlertCircle,
  XCircle
} from "lucide-react";

// Lazy Loaded Components
const Testimonials = lazy(() => import("./components/Testimonials"));
const Bonus = lazy(() => import("./components/Bonus"));
const Pricing = lazy(() => import("./components/Pricing"));
const ActivitiesShowcase = lazy(() => import("./components/ActivitiesShowcase"));

// --- Components ---

const Badge: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${className}`}>
    {children}
  </span>
);

const Button: React.FC<{ 
  children: React.ReactNode; 
  variant?: "primary" | "secondary" | "outline" | "success"; 
  className?: string;
  onClick?: () => void;
}> = ({ 
  children, 
  variant = "primary", 
  className = "", 
  onClick 
}) => {
  const variants = {
    primary: "bg-[#e4bf23] hover:bg-[#d4b020] text-[#0C2551] shadow-lg shadow-slate-200/20",
    secondary: "bg-[#0C2551] hover:bg-[#06132b] text-white",
    outline: "border-2 border-[#0C2551] text-[#0C2551] hover:bg-[#0C2551] hover:text-white",
    success: "bg-[#00BC70] hover:bg-[#00A362] text-white shadow-lg shadow-green-500/20"
  };

  return (
    <div 
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onClick?.(); }}
      className={`w-full py-4 px-6 rounded-xl font-black text-lg cursor-pointer flex items-center justify-center gap-2 ${variants[variant]} ${className}`}
    >
      {children}
    </div>
  );
};

const SectionHeading: React.FC<{ children: React.ReactNode; badge?: string; badgeColor?: string; className?: string }> = ({ children, badge, badgeColor = "bg-[#e4bf23]", className = "" }) => (
  <div className={`text-center space-y-3 mb-6 ${className}`}>
    {badge && <Badge className={`${badgeColor} text-[#0C2551]`}>{badge}</Badge>}
    <h2 className="text-2xl font-black text-[#0C2551] leading-tight px-4">{children}</h2>
  </div>
);

const testimonialsData = [
  { name: "Beatriz Oliveira", avatar: "https://i.postimg.cc/zvTVkGDj/7bffb1fa-a02d-44ae-9f39-1678b52a253a.webp", role: "Professora do 3º ano", text: '“Abri o material e consegui aplicar a primeira atividade no mesmo dia. A turma participou muito mais.”', stars: 5 },
  { name: "Fernanda Sousa", avatar: "https://i.postimg.cc/65N7pnzF/capture-260221-125951.webp", role: "Pedagoga", text: '“Voltei a sentir prazer em planejar minhas aulas. Tudo muito organizado e fácil de usar.”', stars: 5 },
  { name: "Larissa Pereira", avatar: "https://i.postimg.cc/Hs4rcnhr/capture-260221-130204.webp", role: "Educação Infantil", text: '“As crianças aprenderam lógica brincando. Achei que seria difícil, mas elas amaram.”', stars: 5 },
  { name: "Matheus Araújo", avatar: "https://i.postimg.cc/cLxrQWph/capture-260408-210659.webp", role: "Coordenador Pedagógico", text: '“Indicamos para toda a equipe pedagógica da escola. Facilitou completamente nosso planejamento.”', stars: 5 },
  { name: "Camila Barbosa", avatar: "https://i.postimg.cc/bNzz5Tms/capture-260221-130609.webp", role: "Professora do 5º ano", text: '“Ganhei horas livres no domingo porque as atividades já vêm prontas.”', stars: 5 },
  { name: "Tatiana Gomes", avatar: "https://i.postimg.cc/RZY4Nz4c/596458c1-2719-49a3-a11c-054249648444.webp", role: "Professora do 2º ano", text: '“Os pais começaram a comentar em casa sobre as aulas. Virou referência positiva na escola.”', stars: 5 }
];

// --- Sections ---

export default function App() {
  const [timeLeft, setTimeLeft] = useState(3600);
  const [showUpsell, setShowUpsell] = useState(false);

  useEffect(() => {
    if ((window as any).utmifyPropagate) {
      (window as any).utmifyPropagate();
    }
  }, []);

  useEffect(() => {
    if (showUpsell && (window as any).utmifyPropagate) {
      (window as any).utmifyPropagate();
    }
  }, [showUpsell]);

  const scrollToPricing = () => {
    const element = document.getElementById("pricing");
    if (element) {
      const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - 60;
      window.scrollTo({ top: targetPosition, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-slate-200 overflow-x-hidden">
      {/* Sticky Countdown Bar */}
      <div className="sticky top-0 z-50 bg-[#0C2551] text-white py-2 px-4 flex items-center justify-center gap-3 text-xs font-bold border-b border-white/10">
        <Clock size={14} className="text-[#e4bf23]" />
        <span>Termina em:</span>
        <span className="bg-[#e4bf23] text-[#0C2551] px-2 py-0.5 rounded font-mono text-sm tracking-wider">
          {formatTime(timeLeft)}
        </span>
      </div>

      {/* Hero Section */}
      <section className="pt-6 pb-8 px-6 text-center bg-white">
        <div className="max-w-2xl mx-auto space-y-4">
          <Badge className="bg-[#e4bf23] text-[#0C2551] flex items-center gap-2 mx-auto w-fit py-2 px-5 font-black text-sm rounded-full">
             Atualizado conforme a BNCC 2026
          </Badge>

          <div className="space-y-4">
            <h1 className="text-[2.6rem] font-black text-[#0C2551] leading-[1.05] tracking-tight">
              Você <span className="text-red-500 underline decoration-4 underline-offset-4 font-black">NÃO</span> precisa de laboratório de informática para ensinar BNCC
            </h1>
            <span className="bg-[#e4bf23] px-4 py-1.5 rounded-lg text-lg font-black text-[#0C2551] shadow-sm inline-block transform -rotate-1">
              Mais de 600 atividades práticas prontas para aplicar ainda hoje
            </span>

            <div className="mx-auto max-w-sm rounded-[2rem] overflow-hidden shadow-2xl bg-slate-100">
              <img 
                src="https://i.postimg.cc/DZB6z8Nz/Chat-GPT-(1).webp" 
                alt="Kit Estratégico BNCC"
                className="w-full h-auto"
                loading="eager"
                decoding="sync"
                fetchPriority="high"
                width={384}
                height={480}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: <CheckCircle2 className="text-[#00BC70]" size={16} />, label: "Sem computador" },
              { icon: <CheckCircle2 className="text-[#00BC70]" size={16} />, label: "Sem perder horas" },
              { icon: <CheckCircle2 className="text-[#00BC70]" size={16} />, label: "Infantil ao 5º ano" },
              { icon: <CheckCircle2 className="text-[#00BC70]" size={16} />, label: "Aplicação imediata" },
            ].map((item, id) => (
              <div key={id} className="bg-slate-50/80 p-4 rounded-2xl border border-slate-100 flex items-center gap-3 text-left text-xs font-black text-[#0C2551] uppercase tracking-tight">
                <div className="bg-white p-2 rounded-full shadow-sm">{item.icon}</div>
                <span>{item.label}</span>
              </div>
            ))}
          </div>

          <div className="pt-4 space-y-4">
            <Button variant="success" className="py-6 rounded-2xl text-xl bg-[#22c55e] hover:bg-[#16a34a] shadow-lg" onClick={scrollToPricing}>
              Quero Adquirir Agora <ArrowRight size={22} className="stroke-[3]" />
            </Button>
            <div className="flex items-center justify-center gap-x-2 text-red-500 font-black text-[10px] uppercase tracking-widest">
              <AlertCircle size={14} /> <span>Oferta disponível somente nesta página</span>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Points Section */}
      <section className="py-10 px-6 bg-slate-50">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black text-[#0C2551] leading-tight">Você também enfrenta isso na escola?</h2>
        </div>
        
        <div className="max-w-md mx-auto space-y-4">
          {[
            "A coordenação exige Pensamento Computacional, mas ninguém ensinou como aplicar",
            "Sua escola não possui estrutura tecnológica e você precisa se virar",
            "Seu domingo inteiro vai embora criando atividades do zero",
            "Os materiais da internet são distantes da realidade da turma",
          ].map((text, id) => (
            <div key={id} className="bg-white p-6 rounded-2xl shadow-sm flex items-center gap-5 border-l-[6px] border-red-500">
              <XCircle className="text-red-500 shrink-0" size={24} />
              <p className="text-sm font-bold text-slate-600 leading-snug">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <Suspense fallback={<div className="py-12 bg-white" />}>
        <ActivitiesShowcase />
        <Bonus />
        <Testimonials testimonials={testimonialsData} />
        <Pricing setShowUpsell={setShowUpsell} />
      </Suspense>

      {/* Guarantee Section */}
      <section className="py-12 px-6 bg-slate-50">
        <div className="max-w-md mx-auto bg-white rounded-[2.5rem] p-10 text-center shadow-xl border border-slate-100 flex flex-col items-center space-y-6">
          <ShieldCheck className="text-[#e4bf23]" size={64} />
          <h2 className="text-2xl font-black text-[#0C2551] uppercase tracking-tight">Garantia incondicional de 15 dias</h2>
          <p className="text-base text-slate-500 font-bold leading-relaxed">
            Se você sentir que o material não faz sentido para sua realidade, basta solicitar o reembolso dentro de 15 dias.
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-10 px-6 bg-[#0C2551] text-center text-white">
        <div className="max-w-md mx-auto space-y-6">
          <Badge className="bg-[#e4bf23] text-[#0C2551]">Sua próxima segunda-feira pode ser muito mais leve</Badge>
          <h2 className="text-3xl font-black leading-tight">Pare de improvisar atividades.</h2>
          <Button variant="success" className="py-5 text-lg bg-[#22c55e] hover:bg-[#16a34a]" onClick={scrollToPricing}>
             QUERO ACESSAR AGORA <ArrowRight size={20} />
          </Button>
        </div>
      </section>

      <footer className="py-8 bg-[#06132b] text-center text-xs text-white/30 uppercase tracking-[0.2em] font-bold">
        © 2026 Método Dev Expresso Concursos. Todos os direitos reservados.
      </footer>

      {/* Upsell Pop-up */}
      <AnimatePresence>
        {showUpsell && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowUpsell(false)} className="absolute inset-0 bg-[#0C2551]/80 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="relative w-full max-w-sm bg-[#0C2551] rounded-[2.5rem] p-8 sm:p-10 shadow-2xl border border-white/10 overflow-hidden text-center">
              <div role="button" tabIndex={0} onClick={() => setShowUpsell(false)} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setShowUpsell(false); }} className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors cursor-pointer">
                 <XCircle size={24} />
              </div>
              <div className="flex flex-col items-center text-center space-y-6">
                <Badge className="bg-[#e4bf23] text-[#0C2551] px-4 py-1.5 font-black text-[10px] rounded-full shadow-lg">Oferta exclusiva antes de finalizar</Badge>
                <div className="space-y-2">
                  <p className="text-[#e4bf23] text-xs font-black uppercase tracking-widest leading-none">Espere! Libere o Kit Completo com Desconto</p>
                  <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">Hoje você pode desbloquear o Kit Mestre BNCC completo por apenas <span className="text-[#e4bf23]">R$ 14,90</span></h3>
                </div>
                <div className="py-2 px-4 bg-white/5 rounded-xl border border-white/5">
                  <p className="text-white/70 text-xs font-bold">+600 atividades prontas + bônus exclusivos + acesso imediato</p>
                </div>
                <div className="w-full space-y-4 pt-2">
                  <a 
                    href="https://pagamento.checkoutseguro.shop/checkout/v5/o8Ob1mv5B2Y0buiTTHeP"
                    className="py-5 text-sm sm:text-base bg-[#e4bf23] text-[#0C2551] uppercase font-black tracking-tight w-full rounded-xl flex items-center justify-center shadow-xl shadow-yellow-500/10 hover:bg-[#d4b020] transition-colors"
                  >
                    QUERO O KIT COMPLETO POR R$ 14,90
                  </a>

                  <a 
                    href="https://pagamento.checkoutseguro.shop/checkout/v5/txbjsUAp3SBSGcqICWkx"
                    className="text-white/30 text-xs font-bold hover:text-white/50 transition-colors tracking-widest underline underline-offset-4 block"
                  >
                    Continuar apenas com o básico
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
