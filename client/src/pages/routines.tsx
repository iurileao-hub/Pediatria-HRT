import { useState } from "react";
import { Link } from "wouter";
import { GlassCard } from "@/components/ui/glass-card";
import { ArrowLeft, Search } from "lucide-react";

interface Routine {
  id: string;
  title: string;
  description: string;
  category: string;
  categoryColor: string;
}

const routines: Routine[] = [
  {
    id: "1",
    title: "Protocolo de Emergência Pediátrica",
    description: "Atendimento inicial em situações de urgência",
    category: "Emergência",
    categoryColor: "bg-red-500/20"
  },
  {
    id: "2",
    title: "Vacinação Infantil",
    description: "Calendário e protocolos de imunização",
    category: "Prevenção",
    categoryColor: "bg-blue-500/20"
  },
  {
    id: "3",
    title: "Crescimento e Desenvolvimento",
    description: "Avaliação do desenvolvimento infantil",
    category: "Desenvolvimento",
    categoryColor: "bg-purple-500/20"
  },
  {
    id: "4",
    title: "Alimentação Infantil",
    description: "Orientações nutricionais por faixa etária",
    category: "Nutrição",
    categoryColor: "bg-green-500/20"
  },
  {
    id: "5",
    title: "Doenças Respiratórias",
    description: "Diagnóstico e tratamento de pneumonia, bronquiolite",
    category: "Respiratório",
    categoryColor: "bg-cyan-500/20"
  }
];

export default function Routines() {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredRoutines = routines.filter(routine =>
    routine.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    routine.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    routine.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="sunset-background">
      <div className="sunset-rays"></div>
      
      <div className="relative z-10 min-h-screen px-4 py-8">
        {/* Header with back button */}
        <div className="w-full max-w-md mx-auto mb-6">
          <GlassCard className="p-4 flex items-center">
            <Link href="/">
              <button className="p-2 rounded-lg bg-white/20 mr-4 hover:bg-white/30 transition-colors">
                <ArrowLeft className="w-5 h-5 text-white" />
              </button>
            </Link>
            <h1 className="text-white text-lg font-semibold">Rotinas Médicas</h1>
          </GlassCard>
        </div>
        
        {/* Search Bar */}
        <div className="w-full max-w-md mx-auto mb-6">
          <GlassCard className="p-4">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Buscar rotinas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/20 border border-white/30 rounded-lg px-4 py-3 pl-10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60" />
            </div>
          </GlassCard>
        </div>
        
        {/* Routines List */}
        <div className="w-full max-w-md mx-auto space-y-4">
          {filteredRoutines.length === 0 ? (
            <GlassCard className="p-6 text-center">
              <p className="text-white/70">Nenhuma rotina encontrada para "{searchTerm}"</p>
            </GlassCard>
          ) : (
            filteredRoutines.map((routine) => (
              <GlassCard 
                key={routine.id}
                className="p-4 cursor-pointer"
              >
                <h3 className="text-white font-semibold mb-2">{routine.title}</h3>
                <p className="text-white/70 text-sm mb-2">{routine.description}</p>
                <span className={`inline-block ${routine.categoryColor} text-white px-2 py-1 rounded-full text-xs`}>
                  {routine.category}
                </span>
              </GlassCard>
            ))
          )}
        </div>
        
        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-white/60 text-xs">
            {filteredRoutines.length} rotina{filteredRoutines.length !== 1 ? 's' : ''} disponível{filteredRoutines.length !== 1 ? 'is' : ''}
          </p>
        </div>
      </div>
    </div>
  );
}
