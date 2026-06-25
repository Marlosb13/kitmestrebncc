import React from "react";
import { BookOpen, Sparkles, Users, ClipboardCheck } from "lucide-react";

const Bonus: React.FC = () => {
  const bonuses = [
    { 
      num: "01", 
      category: "01", 
      title: "Banco Completo de Planos de Aula", 
      desc: "Planos detalhados com objetivos, desenvolvimento e avaliação prontos para imprimir",
      icon: <BookOpen className="text-[#0C2551]" size={32} />,
      img: "https://i.postimg.cc/vmWYjNw9/t-JDaa.webp",
      badge: "R$ 37,90 Grátis no Pacote Premium"
    },
    { 
      num: "02", 
      category: "02", 
      title: "Kit Interdisciplinar", 
      desc: "Atividades conectando computação com Português, Matemática e Ciências",
      icon: <Sparkles className="text-[#0C2551]" size={32} />,
      img: "https://i.postimg.cc/Jn4fq6rC/Gemini-Generated-Image-i95dnoi95dnoi95d.webp",
      badge: "R$ 27,90 Grátis no Pacote Premium"
    },
    { 
      num: "03", 
      category: "03", 
      title: "Storytelling e Lógica", 
      desc: "Use clássicos infantis para ensinar algoritmos e raciocínio lógico de forma divertida",
      icon: <Users className="text-[#0C2551]" size={32} />,
      img: "https://i.postimg.cc/1tjjKy77/Gemini-Generated-Image-g3e4a3g3e4a3g3e4.webp",
      badge: "R$ 27,90 Grátis no Pacote Premium"
    },
    { 
      num: "04", 
      category: "04", 
      title: "Guia BNCC Comentado", 
      desc: "Documentação pronta para facilitar relatórios, acompanhamento e reuniões pedagógicas",
      icon: <ClipboardCheck className="text-[#0C2551]" size={32} />,
      img: "https://i.postimg.cc/5NdVcmp6/Gemini-Generated-Image-darzsedarzsedarz.webp",
      badge: "R$ 37,90 Grátis no Pacote Premium"
    }
  ];

  return (
    <section id="bonus" className="py-12 px-6 bg-[#06132b]">
      <div className="text-center space-y-4 mb-12">
        <span className="inline-block px-6 py-2 rounded-full text-xs font-black uppercase tracking-wider bg-[#e4bf23] text-[#0C2551]">BÔNUS EXCLUSIVOS</span>
        <h2 className="text-3xl font-black text-white leading-tight">Bônus Exclusivos Para Quem Garantir as +600 Atividades de Pensamento Computacional BNCC Hoje</h2>
      </div>
      
      <div className="grid grid-cols-1 gap-12 max-w-md mx-auto">
        {bonuses.map((item, id) => (
          <div key={id} className="relative bg-white rounded-[2rem] shadow-2xl flex flex-col p-4 pt-6">
            <div className="text-center mb-4">
              <span className="text-[#0C2551] text-xl font-black uppercase tracking-wider">
                Bônus {id + 1}
              </span>
            </div>

            <div className="w-full aspect-[4/3] bg-slate-100 rounded-xl overflow-hidden">
              <img 
                src={item.img} 
                alt={item.title} 
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
                width={400}
                height={300}
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="p-8 space-y-4 text-center flex flex-col items-center">
               <div className="space-y-1">
                  <h4 className="text-2xl font-black text-[#0C2551] leading-tight">{item.title}</h4>
               </div>

               <p className="text-[#45556c] font-semibold text-base">{item.desc}</p>
               
               <div className="mt-2 pt-2 border-t border-slate-100 w-full">
                 <p className="text-[#16a34a] font-black text-sm tracking-wide bg-green-50 py-2 px-3 rounded-xl inline-block">
                   {item.badge}
                 </p>
               </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center max-w-2xl mx-auto px-6 py-8 rounded-[2.5rem] bg-white/5 border border-white/10 shadow-2xl">
        <p className="text-[#e4bf23] text-sm uppercase tracking-wider font-black mb-2">Valor Total em Bônus :</p>
        <p className="text-white text-4xl font-black italic mb-4">R$ 131,60</p>
        <p className="text-white/80 text-sm sm:text-base font-bold leading-relaxed max-w-md mx-auto">
          Hoje você recebe R$ 131,60 em bônus gratuitamente ao escolher o Pacote Premium.
        </p>
      </div>
    </section>
  );
};

export default Bonus;
