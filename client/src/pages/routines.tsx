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

interface DirectoryCategory {
  id: string;
  name: string;
  color: string;
}

const directories: DirectoryCategory[] = [
  { id: "all", name: "Todas", color: "bg-slate-500/20" },
  { id: "emergency", name: "Emergência", color: "bg-red-500/20" },
  { id: "intensive-care", name: "Terapia Intensiva", color: "bg-orange-500/20" },
  { id: "neonatology", name: "Neonatologia", color: "bg-pink-500/20" },
  { id: "infants", name: "Lactentes", color: "bg-blue-500/20" },
  { id: "cardiology", name: "Cardiologia", color: "bg-rose-500/20" },
  { id: "pneumology", name: "Pneumologia", color: "bg-sky-500/20" },
  { id: "hematology-rheumatology-nephrology", name: "Hematologia, Reumatologia e Nefrologia", color: "bg-purple-500/20" },
  { id: "infectology", name: "Infectologia", color: "bg-green-500/20" },
  { id: "gastroenterology", name: "Gastroenterologia", color: "bg-amber-500/20" },
  { id: "endocrinology", name: "Endocrinologia", color: "bg-teal-500/20" },
  { id: "neurology", name: "Neurologia", color: "bg-indigo-500/20" },
  { id: "general-pediatrics", name: "Pediatria Geral e Puericultura", color: "bg-cyan-500/20" }
];

// Generate 76 placeholder routines distributed across categories
const generateRoutines = (): Routine[] => {
  const routines: Routine[] = [];
  const categories = directories.slice(1); // Exclude "Todas"
  const routinesPerCategory = Math.floor(76 / categories.length);
  const remainder = 76 % categories.length;
  
  let id = 1;
  
  categories.forEach((category, index) => {
    const count = routinesPerCategory + (index < remainder ? 1 : 0);
    
    for (let i = 0; i < count; i++) {
      routines.push({
        id: id.toString(),
        title: `Rotina ${id}`,
        description: `Protocolo médico da área de ${category.name.toLowerCase()}`,
        category: category.id,
        categoryColor: category.color
      });
      id++;
    }
  });
  
  return routines;
};

const routines: Routine[] = generateRoutines();

export default function Routines() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  
  const filteredRoutines = routines.filter(routine => {
    const matchesSearch = routine.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      routine.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === "all" || routine.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

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
            <h1 className="text-white text-lg font-semibold">Início</h1>
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

        {/* Directory Cards - Horizontal Scroll */}
        <div className="mb-6 px-4">
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-3 pb-2" style={{ width: 'max-content' }}>
              {directories.map((directory) => (
                <GlassCard
                  key={directory.id}
                  className={`p-4 cursor-pointer min-w-[140px] flex-shrink-0 text-center transition-all duration-200 ${
                    selectedCategory === directory.id 
                      ? 'ring-2 ring-white/50 bg-white/20' 
                      : 'hover:bg-white/10'
                  }`}
                  onClick={() => setSelectedCategory(directory.id)}
                >
                  <div className={`w-8 h-8 rounded-full ${directory.color} mx-auto mb-2`}></div>
                  <h3 className="text-white text-sm font-medium leading-tight">
                    {directory.name}
                  </h3>
                </GlassCard>
              ))}
            </div>
          </div>
        </div>
        
        {/* Routines List */}
        <div className="w-full max-w-md mx-auto space-y-4">
          {filteredRoutines.length === 0 ? (
            <GlassCard className="p-6 text-center">
              <p className="text-white/70">Nenhuma rotina encontrada para "{searchTerm}"</p>
            </GlassCard>
          ) : (
            filteredRoutines.map((routine) => {
              const categoryName = directories.find(dir => dir.id === routine.category)?.name || routine.category;
              return (
                <GlassCard 
                  key={routine.id}
                  className="p-4 cursor-pointer"
                >
                  <h3 className="text-white font-semibold mb-2">{routine.title}</h3>
                  <p className="text-white/70 text-sm mb-2">{routine.description}</p>
                  <span className={`inline-block ${routine.categoryColor} text-white px-2 py-1 rounded-full text-xs`}>
                    {categoryName}
                  </span>
                </GlassCard>
              );
            })
          )}
        </div>
        
        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-white/60 text-xs">
            {filteredRoutines.length} rotina{filteredRoutines.length !== 1 ? 's' : ''} 
            {selectedCategory === "all" ? " disponível" : ` em ${directories.find(dir => dir.id === selectedCategory)?.name}`}
            {filteredRoutines.length !== 1 && selectedCategory === "all" ? 'is' : ''}
            {searchTerm && ` para "${searchTerm}"`}
          </p>
        </div>
      </div>
    </div>
  );
}
