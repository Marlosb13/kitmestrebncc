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
      img: "https://i.postimg.cc/vmWYjNw9/t-JDaa.webp"
    },
    { 
      num: "02", 
      category: "02", 
      title: "Kit Interdisciplinar", 
      desc: "Atividades conectando computação com Português, Matemática e Ciências",
      icon: <Sparkles className="text-[#0C2551]" size={32} />,
      img: "https://i.postimg.cc/Jn4fq6rC/Gemini-Generated-Image-i95dnoi95dnoi95d.webp"
    },
    { 
      num: "03", 
      category: "03", 
      title: "Storytelling e Lógica", 
      desc: "Use clássicos infantis para ensinar algoritmos e raciocínio lógico de forma divertida",
      icon: <Users className="text-[#0C2551]" size={32} />,
      img: "https://i.postimg.cc/1tjjKy77/Gemini-Generated-Image-g3e4a3g3e4a3g3e4.webp"
    },
    { 
      num: "04", 
      category: "04", 
      title: "Guia BNCC Comentado", 
      desc: "Documentação pronta para facilitar relatórios, acompanhamento e reuniões pedagógicas",
      icon: <ClipboardCheck className="text-[#0C2551]" size={32} />,
      img: "https://i.postimg.cc/5NdVcmp6/Gemini-Generated-Image-darzsedarzsedarz.webp"
    }
  ];

  return (
    <section className="py-12 px-6 bg-[#06132b]">
      <div className="text-center space-y-4 mb-12">
        <span className="inline-block px-6 py-2 rounded-full text-xs font-black uppercase tracking-wider bg-[#e4bf23] text-[#0C2551]">BÔNUS EXCLUSIVOS</span>
        <h2 className="text-3xl font-black text-white leading-tight">Bônus Exclusivos Para Quem Garantir as +600 Atividades de Pensamento Computacional BNCC Hoje</h2>
        <p className="text-center text-white/70 text-sm max-w-xs mx-auto">Levando o Kit Estratégico Essencial HOJE, você desbloqueia 4 materiais extras:</p>
      </div>
      
      <div className="grid grid-cols-1 gap-12 max-w-md mx-auto">
        {bonuses.map((item, id) => (
          <div key={id} className="relative bg-white rounded-[2rem] shadow-2xl flex flex-col p-3 pt-12">
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-20">
              <div className="bg-[#e4bf23] w-16 h-16 rounded-full flex items-center justify-center shadow-xl border-4 border-white">
                <span className="text-2xl font-black text-[#0C2551]">{item.num}</span>
              </div>
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

            <div className="p-8 space-y-4 text-left">
               <div className="mb-4">
                  {item.icon}
               </div>
               
               <div className="space-y-1">
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest">{item.category}</p>
                  <h4 className="text-2xl font-black text-[#0C2551] leading-tight">{item.title}</h4>
               </div>

               <p className="text-[#0C2551] font-black text-base">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Bonus;
