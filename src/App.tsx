/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { 
  CheckCircle2, 
  XCircle, 
  Clock, 
  ChevronDown, 
  ChevronUp, 
  BookOpen, 
  Printer, 
  ShieldCheck, 
  Users, 
  Filter, 
  Calendar, 
  ClipboardCheck, 
  Sparkles,
  Lock,
  ArrowRight,
  ChevronRight,
  Star,
  Quote,
  AlertCircle,
  MonitorOff,
  Layout,
  Brain
} from "lucide-react";

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
    <button 
      onClick={onClick}
      className={`w-full py-4 px-6 rounded-xl font-black text-lg cursor-pointer flex items-center justify-center gap-2 ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

const SectionHeading: React.FC<{ children: React.ReactNode; badge?: string; badgeColor?: string; className?: string }> = ({ children, badge, badgeColor = "bg-[#e4bf23]", className = "" }) => (
  <div className={`text-center space-y-3 mb-6 ${className}`}>
    {badge && <Badge className={`${badgeColor} text-[#0C2551]`}>{badge}</Badge>}
    <h2 className="text-2xl font-black text-[#0C2551] leading-tight px-4">{children}</h2>
  </div>
);

// --- Sections ---

export default function App() {
  const [timeLeft, setTimeLeft] = useState(3600); // 60:00 in seconds
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);

  const scrollToPricing = () => {
    const element = document.getElementById("pricing");
    if (element) {
      const offset = 60;
      const elementPosition = element.getBoundingClientRect().top;
      const startPosition = window.pageYOffset;
      const targetPosition = elementPosition + startPosition - offset;
      const distance = targetPosition - startPosition;
      const duration = 1500; // 1.5 seconds for a slower feel
      let startTime: number | null = null;

      const easeInOutQuad = (t: number, b: number, c: number, d: number) => {
        t /= d / 2;
        if (t < 1) return (c / 2) * t * t + b;
        t--;
        return (-c / 2) * (t * (t - 2) - 1) + b;
      };

      const animation = (currentTime: number) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) {
          requestAnimationFrame(animation);
        } else {
          window.scrollTo(0, targetPosition);
        }
      };

      requestAnimationFrame(animation);
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

  const testimonials = [
    { name: "Beatriz Oliveira", avatar: "https://i.postimg.cc/zvTVkGDj/7bffb1fa-a02d-44ae-9f39-1678b52a253a.webp", role: "Professora do 3º ano", text: '“Abri o material e consegui aplicar a primeira atividade no mesmo dia. A turma participou muito mais.”', stars: 5 },
    { name: "Fernanda Sousa", avatar: "https://i.postimg.cc/65N7pnzF/capture-260221-125951.webp", role: "Pedagoga", text: '“Voltei a sentir prazer em planejar minhas aulas. Tudo muito organizado e fácil de usar.”', stars: 5 },
    { name: "Larissa Pereira", avatar: "https://i.postimg.cc/Hs4rcnhr/capture-260221-130204.webp", role: "Educação Infantil", text: '“As crianças aprenderam lógica brincando. Achei que seria difícil, mas elas amaram.”', stars: 5 },
    { name: "Matheus Araújo", avatar: "https://i.postimg.cc/cLxrQWph/capture-260408-210659.webp", role: "Coordenador Pedagógico", text: '“Indicamos para toda a equipe pedagógica da escola. Facilitou completamente nosso planejamento.”', stars: 5 },
    { name: "Camila Barbosa", avatar: "https://i.postimg.cc/bNzz5Tms/capture-260221-130609.webp", role: "Professora do 5º ano", text: '“Ganhei horas livres no domingo porque as atividades já vêm prontas.”', stars: 5 },
    { name: "Tatiana Gomes", avatar: "https://i.postimg.cc/RZY4Nz4c/596458c1-2719-49a3-a11c-054249648444.webp", role: "Professora do 2º ano", text: '“Os pais começaram a comentar em casa sobre as aulas. Virou referência positiva na escola.”', stars: 5 }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-slate-200 overflow-x-hidden">
      {/* Sticky Countdown Bar */}
      <div className="sticky top-0 z-50 bg-[#0C2551] text-white py-2 px-4 flex items-center justify-center gap-3 text-xs font-bold border-b border-white/10">
        <Clock size={14} className="text-[#e4bf23]" />
        <span>Termina em:</span>
        <span className="bg-[#e4bf23] text-[#0C2551] px-2 py-0.5 rounded font-mono text-sm tracking-wider">
          {formatTime(timeLeft)}
        </span>
        <span>Garanta seu acesso com condição especial</span>
      </div>

      {/* Hero Section */}
      <section className="pt-6 pb-8 px-6 text-center bg-white">
        <div className="max-w-2xl mx-auto space-y-6">
          <Badge className="bg-[#e4bf23] text-[#0C2551] flex items-center gap-2 mx-auto w-fit normal-case py-2 px-5 shadow-sm font-black text-sm rounded-full">
             Atualizado conforme a BNCC 2026
          </Badge>

          <div className="space-y-4">
            <h1 className="text-[2.6rem] font-black text-[#0C2551] leading-[1.05] tracking-tight">
              Você <span className="text-red-500 underline decoration-4 underline-offset-4 font-black">NÃO</span> precisa de laboratório de informática para ensinar BNCC
            </h1>
            <div className="flex flex-col items-center gap-2">
              <span className="bg-[#e4bf23] px-4 py-1.5 rounded-lg text-lg font-black text-[#0C2551] shadow-sm transform -rotate-1">
                Mais de 600 atividades práticas prontas para aplicar ainda hoje
              </span>
            </div>
            


            <div className="mt-4 mx-auto max-w-sm rounded-[2rem] overflow-hidden shadow-2xl">
              <img 
                src="https://i.postimg.cc/DygzfDSQ/5ifb-J-(1).webp" 
                alt="Kit Estratégico BNCC"
                className="w-full h-auto"
                referrerPolicy="no-referrer"
                loading="eager"
                decoding="async"
                fetchpriority="high"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-8">
            {[
              { icon: <CheckCircle2 className="text-[#00BC70]" size={16} />, label: "Sem computador" },
              { icon: <CheckCircle2 className="text-[#00BC70]" size={16} />, label: "Sem perder horas planejando" },
              { icon: <CheckCircle2 className="text-[#00BC70]" size={16} />, label: "Do Infantil ao 5º ano" },
              { icon: <CheckCircle2 className="text-[#00BC70]" size={16} />, label: "Aplicação simples e imediata" },
            ].map((item, id) => (
              <div key={id} className="bg-slate-50/80 p-4 rounded-2xl border border-slate-100 flex items-center gap-3 text-left text-xs font-black text-[#0C2551] uppercase tracking-tight">
                <div className="bg-white p-2 rounded-full shadow-sm">
                  {item.icon}
                </div>
                <span>{item.label}</span>
              </div>
            ))}
          </div>

          <div className="py-4 flex flex-col items-center gap-2">
            <div className="flex -space-x-4">
              {[
                "https://i.postimg.cc/zvTVkGDj/7bffb1fa-a02d-44ae-9f39-1678b52a253a.webp",
                "https://i.postimg.cc/65N7pnzF/capture-260221-125951.webp",
                "https://i.postimg.cc/Hs4rcnhr/capture-260221-130204.webp",
                "https://i.postimg.cc/cLxrQWph/capture-260408-210659.webp"
              ].map((src, i) => (
                <img 
                  key={i} 
                  src={src} 
                  className="w-12 h-12 rounded-full border-2 border-white object-cover shadow-md bg-slate-100" 
                  alt={`Professor ${i + 1}`}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  decoding="async"
                />
              ))}
            </div>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">
              Mais de <span className="text-slate-600">2.000 educadores</span> já estivem usando em sala de aula
            </p>
          </div>

          <div className="pt-8 space-y-4">
            <Button variant="success" className="py-6 rounded-2xl text-xl bg-[#22c55e] hover:bg-[#16a34a] shadow-lg shadow-green-900/20" onClick={scrollToPricing}>
              Quero Adquirir Agora <ArrowRight size={22} className="stroke-[3]" />
            </Button>

            <div className="space-y-4">
              <div className="flex items-center justify-center gap-x-2 text-red-500 font-black text-xs uppercase italic">
                <AlertCircle size={14} />
                <span>Oferta disponível somente nesta página</span>
              </div>
              <div className="flex items-center justify-center gap-x-4 text-[10px] text-slate-400 font-bold uppercase tracking-widest text-center">
                <span className="flex items-center gap-1"><Lock size={12} /> Ambiente 100% seguro</span>
                <span className="flex items-center gap-1"><ShieldCheck size={12} /> Pagamento protegido com criptografia SSL</span>
              </div>
              <div className="flex items-center justify-center gap-x-2 text-[10px] text-[#0C2551] font-bold uppercase tracking-widest">
                <ArrowRight size={12} className="rotate-90" /> Liberação instantânea após a compra
              </div>
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
            "A coordenação exige Pensamento Computacional, mas ninguém ensinou como aplicar na prática",
            "Sua escola não possui estrutura tecnológica e você precisa se virar como pode",
            "Seu domingo inteiro vai embora criando atividades do zero",
            "Os materiais encontrados na internet são difíceis, técnicos e distantes da realidade da turma",
            "Você sente insegurança porque sabe que isso será cobrado nas avaliações externas"
          ].map((text, id) => (
            <div 
              key={id}
              className="bg-white p-6 rounded-2xl shadow-sm flex items-center gap-5 border-l-[6px] border-red-500"
            >
              <XCircle className="text-red-500 shrink-0" size={28} />
              <p className="text-sm font-bold text-slate-600 leading-snug">{text}</p>
            </div>
          ))}
        </div>
      </section>


      {/* Solution Banner */}
      <section className="bg-[#0C2551] py-10 px-6">
        <div className="max-w-md mx-auto bg-white rounded-[2.5rem] p-10 space-y-6 relative overflow-hidden shadow-2xl flex flex-col items-center text-center">
          <BookOpen className="text-[#0C2551]" size={48} />
          <h2 className="text-3xl font-black text-[#0C2551] leading-[1.1]">
            A solução prática que cabe na sua rotina
          </h2>
          <p className="text-base text-slate-600 font-bold leading-relaxed">
            Pensamento Computacional Desplugado ensina lógica, sequência, algoritmos e resolução de problemas usando materiais simples do dia a dia.
          </p>
          <div className="grid grid-cols-2 gap-4 w-full pt-4">
             {["Sem telas", "Sem internet", "Sem complicação", "E o melhor: exatamente dentro do que a BNCC exige"].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-xs font-black text-[#0C2551] uppercase tracking-tight">
                  <CheckCircle2 size={14} className="text-[#00BC70]" />
                  <span>{item}</span>
               </div>
             ))}
          </div>
        </div>

        {/* Feature Highlights Group */}
        <div className="max-w-md mx-auto mt-10 space-y-10">
          {[
            { 
              icon: <Printer className="text-[#e4bf23]" size={42} />, 
              title: "Material pronto para usar", 
              desc: "Baixe, imprima e aplique imediatamente sem precisar adaptar nada" 
            },
            { 
              icon: <ShieldCheck className="text-[#e4bf23]" size={42} />, 
              title: "Conteúdo alinhado à BNCC", 
              desc: "Cada dinâmica acompanha os códigos das habilidades trabalhadas" 
            },
            { 
              icon: <Users className="text-[#e4bf23]" size={42} />, 
              title: "Validado em sala de aula", 
              desc: "Mais de 2.000 professoras já aplicaram com suas turmas" 
            }
          ].map((item, id) => (
            <div 
              key={id} 
              className="flex flex-col items-center text-center space-y-4"
            >
              <div className="p-0">
                {item.icon}
              </div>
              <h3 className="text-2xl font-black text-white">{item.title}</h3>
              <p className="text-slate-300 text-sm font-medium leading-relaxed max-w-[280px] mx-auto">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Resources Details */}
      <section className="py-10 px-6 bg-slate-50">
        <div className="text-center mb-10">
          <Badge className="bg-[#e4bf23] text-[#0C2551] mb-4 shadow-sm font-black px-6 py-2 uppercase tracking-tight">RECURSOS DO MATERIAL</Badge>
          <h2 className="text-3xl font-black text-[#0C2551] leading-tight px-4">O que você recebe no Kit</h2>
        </div>
        
        <div className="grid grid-cols-1 gap-6 max-w-md mx-auto">
          {[
            { 
              icon: <Filter className="text-[#0C2551]" size={32} />, 
              title: "Organização por habilidades BNCC", 
              desc: "Encontre rapidamente a atividade ideal para cada objetivo pedagógico",
            },
            { 
              icon: <Calendar className="text-[#0C2551]" size={32} />, 
              title: "Planejamento pronto", 
              desc: "Sequências organizadas para facilitar sua rotina semanal",
            },
            { 
              icon: <ClipboardCheck className="text-[#0C2551]" size={32} />, 
              title: "Critérios de avaliação", 
              desc: "Rubricas simples para acompanhar a evolução dos alunos",
            },
            { 
              icon: <Sparkles className="text-[#0C2551]" size={32} />, 
              title: "Dinâmicas lúdicas", 
              desc: "Atividades práticas que envolvem toda a turma sem depender de tecnologia",
            }
          ].map((item, id) => (
            <div 
              key={id}
              className="bg-white p-10 rounded-[2.5rem] shadow-sm text-center flex flex-col items-center gap-4"
            >
              <div className="bg-[#e4bf23] p-4 rounded-2xl shadow-md mb-2">
                {item.icon}
              </div>
              <h4 className="text-xl font-black text-[#0C2551]">{item.title}</h4>
              <p className="text-slate-500 text-base leading-relaxed font-medium px-4">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>


      {/* Social Proof / Testimonials */}
      <section className="py-10 px-6 bg-white text-center">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black text-[#0C2551] leading-tight mb-2">Professoras estão transformando suas aulas</h2>
        </div>
        
        <div className="max-w-md mx-auto space-y-6">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-slate-50 p-8 rounded-[2.5rem] relative text-left shadow-sm border border-slate-100/50">
              <Quote className="text-[#e4bf23] mb-4 opacity-50" size={32} />
              <div className="flex gap-0.5 mb-4">
                {[...Array(t.stars)].map((_, si) => (
                  <Star key={si} size={14} className="fill-[#e4bf23] text-[#e4bf23]" />
                ))}
              </div>
              <p className="text-base font-bold text-slate-700 leading-relaxed mb-6 italic">"{t.text}"</p>
              <div className="flex items-center gap-4">
                <img 
                  src={t.avatar} 
                  className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md" 
                  alt={t.name}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  decoding="async"
                />
                <div>
                   <p className="font-black text-[#0C2551] text-base">{t.name}</p>
                   <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* Bonus Section */}
      <section className="py-12 px-6 bg-[#06132b]">
        <div className="text-center space-y-4 mb-12">
          <Badge className="bg-[#e4bf23] text-[#0C2551] font-black px-6 py-2">BÔNUS EXCLUSIVOS</Badge>
          <h2 className="text-3xl font-black text-white leading-tight">Bônus Exclusivos Para Quem Garantir o Kit Mestre BNCC Desplugada Hoje</h2>
          <p className="text-center text-white/70 text-sm max-w-xs mx-auto">Levando o Kit Estratégico Essencial HOJE, você desbloqueia 4 materiais extras:</p>
        </div>
        
        <div className="grid grid-cols-1 gap-12 max-w-md mx-auto">
          {[
            { 
              num: "01", 
              category: "01", 
              title: "Banco Completo de Planos de Aula", 
              desc: "Planos detalhados com objetivos, desenvolvimento e avaliação prontos para imprimir",
              detail: "",
              icon: <BookOpen className="text-[#0C2551]" size={32} />,
              img: "https://i.postimg.cc/vmWYjNw9/t-JDaa.webp"
            },
            { 
              num: "02", 
              category: "02", 
              title: "Kit Interdisciplinar", 
              desc: "Atividades conectando computação com Português, Matemática e Ciências",
              detail: "",
              icon: <Sparkles className="text-[#0C2551]" size={32} />,
              img: "https://i.postimg.cc/Jn4fq6rC/Gemini-Generated-Image-i95dnoi95dnoi95d.webp"
            },
            { 
              num: "03", 
              category: "03", 
              title: "Storytelling e Lógica", 
              desc: "Use clássicos infantis para ensinar algoritmos e raciocínio lógico de forma divertida",
              detail: "",
              icon: <Users className="text-[#0C2551]" size={32} />,
              img: "https://i.postimg.cc/1tjjKy77/Gemini-Generated-Image-g3e4a3g3e4a3g3e4.webp"
            },
            { 
              num: "04", 
              category: "04", 
              title: "Guia BNCC Comentado", 
              desc: "Documentação pronta para facilitar relatórios, acompanhamento e reuniões pedagógicas",
              detail: "",
              icon: <ClipboardCheck className="text-[#0C2551]" size={32} />,
              img: "https://i.postimg.cc/5NdVcmp6/Gemini-Generated-Image-darzsedarzsedarz.webp"
            }
          ].map((item, id) => (
            <div key={id} className="relative bg-white rounded-[2rem] shadow-2xl flex flex-col p-3 pt-12">
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-20">
                <div className="bg-[#e4bf23] w-16 h-16 rounded-full flex items-center justify-center shadow-xl border-4 border-white">
                  <span className="text-2xl font-black text-[#0C2551]">{item.num}</span>
                </div>
              </div>

              {/* Image */}
              <div className="w-full aspect-[4/3] bg-slate-100 rounded-xl overflow-hidden">
                <img 
                  src={item.img} 
                  alt={item.title} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              {/* Content */}
              <div className="p-8 space-y-4">
                 <div className="mb-4">
                    {item.icon}
                 </div>
                 
                 <div className="space-y-1">
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest">{item.category}</p>
                    <h4 className="text-2xl font-black text-[#0C2551] leading-tight">{item.title}</h4>
                 </div>

                 <p className="text-[#0C2551] font-black text-base">{item.desc}</p>
                 <p className="text-sm text-slate-500 leading-relaxed font-medium">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* Comparison Section */}
      <section className="py-12 px-6 bg-slate-50">
        <div className="text-center mb-10 space-y-4">
           <h2 className="text-3xl font-black text-[#0C2551] leading-tight">Uma escolha. Dois resultados completamente diferentes.</h2>
        </div>
        
        <div className="max-w-md mx-auto space-y-8">
          <div className="bg-[#FFEAEA] p-10 rounded-[2.5rem] shadow-sm border border-red-100">
             <Badge className="bg-red-500 text-white mb-6 uppercase tracking-wider">Sem o material</Badge>
             <h4 className="text-2xl font-black text-red-950 mb-6">O ciclo do estresse:</h4>
             <ul className="space-y-5">
              {[
                { icon: <XCircle className="text-red-500" size={18} />, text: "Horas perdidas procurando atividades" },
                { icon: <XCircle className="text-red-500" size={18} />, text: "Aulas improvisadas" },
                { icon: <XCircle className="text-red-500" size={18} />, text: "Medo de não cumprir a BNCC" },
                { icon: <XCircle className="text-red-500" size={18} />, text: "Cansaço mental constante" },
                { icon: <XCircle className="text-red-500" size={18} />, text: "Sensação de estar atrasada pedagogicamente" },
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm font-bold text-red-900/80">
                  {item.icon} {item.text}
                </li>
              ))}
             </ul>
          </div>

          <div className="bg-[#fcf8e3] p-10 rounded-[2.5rem] relative overflow-hidden shadow-sm border border-[#fcf8e3]/30">
             <Badge className="bg-[#0C2551] text-white mb-6 uppercase tracking-wider shadow-md">Com o Kit Completo</Badge>
             <h4 className="text-2xl font-black text-slate-800 mb-6">A liberdade de ensinar:</h4>
             <ul className="space-y-5">
              {[
                { icon: <CheckCircle2 className="text-[#00BC70]" size={18} />, text: "Atividades aplicadas em poucos minutos" },
                { icon: <CheckCircle2 className="text-[#00BC70]" size={18} />, text: "Turmas mais engajadas" },
                { icon: <CheckCircle2 className="text-[#00BC70]" size={18} />, text: "Segurança pedagógica com BNCC" },
                { icon: <CheckCircle2 className="text-[#00BC70]" size={18} />, text: "Mais tempo livre para você" },
                { icon: <CheckCircle2 className="text-[#00BC70]" size={18} />, text: "Reconhecimento profissional na escola" },
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm font-bold text-slate-700">
                  {item.icon} {item.text}
                </li>
              ))}
             </ul>
          </div>
        </div>
      </section>


      {/* Pricing Section */}
      <section id="pricing" className="py-12 px-6 bg-white text-center">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-black text-[#0C2551] mt-4">Oferta Especial de Hoje</h2>
        </div>
        
        <div className="max-w-md mx-auto space-y-8 text-left">
          {/* Main Card */}
          <div className="bg-[#0C2551] rounded-[2.5rem] p-10 relative shadow-2xl border-x-0 border-y-0 overflow-hidden">
             {/* Badge Overlap */}
             <div className="absolute top-0 left-1/2 -translate-x-1/2 transform">
                <div className="bg-[#e4bf23] text-[#0C2551] font-black text-[10px] sm:text-xs uppercase px-4 sm:px-8 py-2 rounded-b-2xl shadow-md flex items-center gap-2 whitespace-nowrap">
                  <Star size={12} className="fill-[#0C2551] shrink-0" /> KIT FAVORITO DOS PROFESSORES
                </div>
             </div>

             <div className="pt-6">
                <p className="text-white/40 text-xs font-black tracking-widest uppercase">ACESSO COMPLETO + TODOS OS BÔNUS</p>
                <h3 className="text-3xl font-black text-white mt-1">Kit Mestre BNCC Desplugada</h3>
                <p className="text-white/60 text-base mt-3 mb-8">Do Infantil ao 5º ano</p>
             </div>
             
             <div className="bg-white/5 rounded-[2rem] p-8 mb-8">
                <p className="text-xs text-white/50 font-black uppercase tracking-[0.2em] mb-4">Valor individual dos materiais:</p>
                <div className="space-y-3 pb-6 border-b border-white/10">
                   <div className="flex justify-between text-white text-xs font-bold"><span>Dinâmicas Desplugadas</span> <span className="line-through">R$ 97</span></div>
                   <div className="flex justify-between text-white text-xs font-bold"><span>Storytelling & Lógica</span> <span className="line-through">R$ 97</span></div>
                   <div className="flex justify-between text-white text-xs font-bold"><span>Banco de Planos</span> <span className="line-through">R$ 97</span></div>
                   <div className="flex justify-between text-white text-xs font-bold"><span>Atividades Interdisciplinares</span> <span className="line-through">R$ 97</span></div>
                </div>
                <div className="flex justify-between text-[#e4bf23] text-base font-black pt-6"><span>Valor total:</span> <span className="line-through opacity-50 mr-2">R$ 388</span></div>
             </div>

             <div className="mb-8">
                <p className="text-white text-xs font-black uppercase tracking-widest mb-1">Hoje por apenas</p>
                <div className="flex items-baseline gap-1">
                   <span className="text-white text-5xl font-black tracking-tighter italic">R$ 19,90</span>
                </div>
             </div>

             <ul className="grid grid-cols-1 gap-4 mb-10">
                {[
                  "Mais de 600 Dinâmicas Desplugadas",
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

             <div className="bg-[#e4bf23] rounded-2xl p-6 mb-8 text-center shadow-lg">
               <p className="text-[#0C2551] text-xs font-medium leading-relaxed">
                 Ao finalizar sua compra, você poderá adicionar os <span className="font-black">conteúdos de Anos Finais e Ensino Médio com 80% OFF.</span>
               </p>
             </div>

             <Button variant="success" className="uppercase font-black text-xs py-6 rounded-2xl bg-[#22c55e] text-white hover:bg-[#16a34a]" onClick={() => window.location.href = "https://pagamento.checkoutseguro.shop/checkout/v5/qppegBTZJAhMgbVrsLxw"}>
                QUERO GARANTIR O KIT COMPLETO
             </Button>

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
                  "100 Dinâmicas Desplugadas",
                  "Conteúdo alinhado à BNCC",
                  "Acesso Vitalício"
                ].map((item, i) => (
                  <li key={i} className="flex items-center justify-center gap-2 text-sm font-bold text-slate-600">
                    <CheckCircle2 className="text-[#00BC70] shrink-0" size={18} /> {item}
                  </li>
                ))}
             </ul>

             <button 
               onClick={() => window.location.href = "https://pagamento.checkoutseguro.shop/checkout/v5/txbjsUAp3SBSGcqICWkx"}
               className="w-full py-4 bg-[#22c55e] hover:bg-[#16a34a] rounded-2xl font-black text-white shadow-lg shadow-green-900/10 transition-colors uppercase text-xs tracking-widest"
             >
                QUERO O PACOTE BÁSICO
             </button>
          </div>
        </div>
      </section>




      {/* Guarantee Section */}
      <section className="py-12 px-6 bg-slate-50 relative overflow-hidden">

        <div className="max-w-md mx-auto bg-white rounded-[2.5rem] p-10 text-center shadow-xl border border-slate-100 flex flex-col items-center space-y-6">
          <ShieldCheck className="text-[#e4bf23]" size={64} />
          <div className="space-y-4">
            <h2 className="text-2xl font-black text-[#0C2551] uppercase tracking-tight">Garantia incondicional de 15 dias</h2>
            <p className="text-base text-slate-500 font-bold leading-relaxed px-2">
              Se você sentir que o material não faz sentido para sua realidade, basta solicitar o reembolso dentro de 15 dias.
            </p>

          </div>
        </div>
      </section>


      {/* Final CTA */}
      <section className="py-10 px-6 bg-[#0C2551] text-center text-white relative overflow-hidden">
        <div className="relative z-10 max-w-md mx-auto space-y-6">
          <Badge className="bg-[#e4bf23] text-[#0C2551]">Sua próxima segunda-feira pode ser muito mais leve</Badge>
          <h2 className="text-3xl font-black tracking-tight leading-tight">
            Pare de improvisar atividades.
          </h2>
          <p className="text-slate-300 text-sm font-medium">Começa amanhã aplicando materiais prontos, organizados e alinhados à BNCC.</p>
          <Button variant="success" className="py-5 text-lg bg-[#22c55e] hover:bg-[#16a34a] shadow-lg shadow-green-900/20" onClick={scrollToPricing}>
             QUERO ACESSAR AGORA <ArrowRight size={20} />
          </Button>
          <div className="flex items-center justify-center gap-x-4 text-[10px] text-white/40 font-bold uppercase tracking-widest leading-none pt-4">
            <span className="flex items-center gap-1"><CheckCircle2 size={10} /> Acesso imediato</span>
            <span className="flex items-center gap-1"><CheckCircle2 size={10} /> Ambiente seguro</span>
            <span className="flex items-center gap-1"><CheckCircle2 size={10} /> Garantia de 15 dias</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-[#06132b] text-center text-xs text-white/30 uppercase tracking-[0.2em] font-bold">
        <p>© 2026 Método Dev Expresso Concursos. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
