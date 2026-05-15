import React from "react";
import { Star, Quote } from "lucide-react";

interface Testimonial {
  name: string;
  avatar: string;
  role: string;
  text: string;
  stars: number;
}

const Testimonials: React.FC<{ testimonials: Testimonial[] }> = ({ testimonials }) => {
  return (
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
                className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md bg-slate-100" 
                alt={t.name}
                loading="lazy"
                decoding="async"
                width={48}
                height={48}
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
  );
};

export default Testimonials;
