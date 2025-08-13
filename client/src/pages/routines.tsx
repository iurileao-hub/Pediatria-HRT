import { useState } from "react";
import { Link } from "wouter";
import { GlassCard } from "@/components/ui/glass-card";
import { ArrowLeft, Search } from "lucide-react";

interface Routine {
  id: string;
  title: string;
  author: string;
  category: string;
  categoryColor: string;
}

interface DirectoryCategory {
  id: string;
  name: string;
  color: string;
}

const directories: DirectoryCategory[] = [
  { id: "all", name: "Todas", color: "bg-slate-500/40" },
  { id: "emergency", name: "Emergência", color: "bg-red-500/40" },
  { id: "intensive-care", name: "Terapia Intensiva", color: "bg-orange-500/40" },
  { id: "neonatology", name: "Neonatologia", color: "bg-pink-500/40" },
  { id: "infants", name: "Lactentes", color: "bg-blue-500/40" },
  { id: "cardiology", name: "Cardiologia", color: "bg-rose-500/40" },
  { id: "pneumology", name: "Pneumologia", color: "bg-sky-500/40" },
  { id: "hematology-rheumatology-nephrology", name: "Hematologia, Reumatologia e Nefrologia", color: "bg-purple-500/40" },
  { id: "infectology", name: "Infectologia", color: "bg-green-500/40" },
  { id: "gastroenterology", name: "Gastroenterologia", color: "bg-amber-500/40" },
  { id: "endocrinology", name: "Endocrinologia", color: "bg-teal-500/40" },
  { id: "neurology", name: "Neurologia", color: "bg-indigo-500/40" },
  { id: "general-pediatrics", name: "Pediatria Geral e Puericultura", color: "bg-cyan-500/40" }
];

// Generate 73 placeholder routines - UPDATE WITH ACTUAL NAMES
const generateRoutines = (): Routine[] => {
  const routineNames = [
    // PLACEHOLDER - Replace with the 73 actual routine names you provided
    "Rotina 1", "Rotina 2", "Rotina 3", "Rotina 4", "Rotina 5",
    "Rotina 6", "Rotina 7", "Rotina 8", "Rotina 9", "Rotina 10",
    // Add all 73 names here...
  ];
  
  // For now, creating 73 placeholders - will be updated with real names
  const routines: Routine[] = [];
  const categories = directories.slice(1); // Exclude "Todas"
  const routinesPerCategory = Math.floor(73 / categories.length);
  const remainder = 73 % categories.length;
  
  let routineIndex = 0;
  
  categories.forEach((category, categoryIndex) => {
    const count = routinesPerCategory + (categoryIndex < remainder ? 1 : 0);
    
    for (let i = 0; i < count && routineIndex < 73; i++) {
      routines.push({
        id: (routineIndex + 1).toString(),
        title: `Rotina ${routineIndex + 1}`, // Will be replaced with actual names
        author: "Autor a ser definido",
        category: category.id,
        categoryColor: category.color
      });
      routineIndex++;
    }
  });
  
  // Sort alphabetically by title
  return routines.sort((a, b) => a.title.localeCompare(b.title));
};

const routines: Routine[] = generateRoutines();

export default function Routines() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  
  const filteredRoutines = routines.filter(routine => {
    const matchesSearch = routine.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      routine.author.toLowerCase().includes(searchTerm.toLowerCase());
    
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
                <div
                  key={directory.id}
                  className={`glass-card ${directory.color} p-4 cursor-pointer min-w-[140px] flex-shrink-0 text-center transition-all duration-200 rounded-2xl ${
                    selectedCategory === directory.id 
                      ? 'ring-2 ring-white/50 scale-105' 
                      : 'hover:scale-102'
                  }`}
                  onClick={() => setSelectedCategory(directory.id)}
                >
                  <h3 className="text-white text-sm font-medium leading-tight flex items-center justify-center h-full">
                    {directory.name}
                  </h3>
                </div>
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
                  <h3 className="text-white font-semibold mb-1">{routine.title}</h3>
                  <p className="text-white/60 text-sm mb-3">{routine.author}</p>
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
