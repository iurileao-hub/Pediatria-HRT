import { useState, useEffect } from "react";
import { Link } from "wouter";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { GlassCard } from "@/components/ui/glass-card";
import { ArrowLeft, Search, FileText } from "lucide-react";

interface Routine {
  id: string;
  title: string;
  author: string;
  category: string;
  htmlContent?: string;
  conversionMethod?: string;
}

interface DirectoryCategory {
  id: string;
  name: string;
  color: string;
}

const directories: DirectoryCategory[] = [
  { id: "all", name: "Todas", color: "bg-slate-500/40" },
  { id: "Geral", name: "Geral", color: "bg-slate-600/40" },
  { id: "Emergência", name: "Emergência", color: "bg-red-500/40" },
  { id: "Pneumologia", name: "Pneumologia", color: "bg-sky-500/40" },
  { id: "Infectologia", name: "Infectologia", color: "bg-green-500/40" },
  { id: "Cardiologia", name: "Cardiologia", color: "bg-rose-500/40" },
  { id: "Neurologia", name: "Neurologia", color: "bg-indigo-500/40" },
  { id: "Gastroenterologia", name: "Gastroenterologia", color: "bg-amber-500/40" },
  { id: "Nefrologia", name: "Nefrologia", color: "bg-purple-500/40" },
  { id: "Endocrinologia", name: "Endocrinologia", color: "bg-teal-500/40" },
  { id: "Neonatologia", name: "Neonatologia", color: "bg-pink-500/40" },
  { id: "Hematologia", name: "Hematologia", color: "bg-violet-500/40" },
  { id: "Reumatologia", name: "Reumatologia", color: "bg-orange-500/40" },
  { id: "Alergia e Imunologia", name: "Alergia e Imunologia", color: "bg-cyan-500/40" }
];

// Helper function to get category color
const getCategoryColor = (category: string) => {
  const colorMap: Record<string, string> = {
    "Geral": "bg-slate-600/40",
    "Emergência": "bg-red-500/40", 
    "Pneumologia": "bg-sky-500/40",
    "Infectologia": "bg-green-500/40",
    "Cardiologia": "bg-rose-500/40",
    "Neurologia": "bg-indigo-500/40",
    "Gastroenterologia": "bg-amber-500/40",
    "Nefrologia": "bg-purple-500/40",
    "Endocrinologia": "bg-teal-500/40",
    "Neonatologia": "bg-pink-500/40",
    "Hematologia": "bg-violet-500/40",
    "Reumatologia": "bg-orange-500/40",
    "Alergia e Imunologia": "bg-cyan-500/40"
  };
  return colorMap[category] || "bg-slate-500/40";
};

export default function Routines() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const queryClient = useQueryClient();
  
  // Fetch routines from API with fresh data and retry
  const { data: routines = [], isLoading, error, refetch } = useQuery<Routine[]>({
    queryKey: ['/api/routines'],
    refetchOnMount: true,
    staleTime: 0, // Always consider data stale
    gcTime: 0, // Don't cache data
    retry: 3,
    retryDelay: 1000,
  });

  // Reset filters when component mounts (user preference) and refresh data
  useEffect(() => {
    setSearchTerm("");
    setSelectedCategory("all");
    
    // Force fresh data load on mount
    queryClient.invalidateQueries({ queryKey: ['/api/routines'] });
    refetch();
  }, [queryClient, refetch]);
  
  const filteredRoutines = routines.filter((routine: Routine) => {
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
          <Link href="/" className="block">
            <GlassCard className="p-4 flex items-center cursor-pointer hover:bg-white/10 transition-colors">
              <button className="p-2 rounded-lg bg-white/20 mr-4 hover:bg-white/30 transition-colors">
                <ArrowLeft className="w-5 h-5 text-white" />
              </button>
              <h1 className="text-white text-lg font-semibold">Início</h1>
            </GlassCard>
          </Link>
        </div>
        
        {/* Search Bar */}
        <div className="w-full max-w-md mx-auto mb-6">
          <GlassCard className="p-4">
            <div className="relative mb-3">
              <input 
                type="text" 
                placeholder="Buscar rotinas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/20 border border-white/30 rounded-lg px-4 py-3 pl-10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60" />
            </div>
            {/* Debug Info & Refresh Button */}
            <div className="flex items-center justify-between text-xs text-white/60">
              <span>Rotinas: {routines.length}</span>
              <button 
                onClick={() => refetch()}
                className="px-3 py-1 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
              >
                ↻ Atualizar
              </button>
            </div>
          </GlassCard>
        </div>

        {/* Directory Cards - Horizontal Scroll */}
        <div className="mb-6 -mx-4">
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-3 py-2" style={{ width: 'max-content', paddingLeft: '1rem', paddingRight: '1rem' }}>
              {directories.map((directory) => {
                const getBackgroundColor = (color: string) => {
                  switch(color) {
                    case 'bg-slate-500/40': return 'rgba(100, 116, 139, 0.4)';
                    case 'bg-slate-600/40': return 'rgba(71, 85, 105, 0.4)';
                    case 'bg-red-500/40': return 'rgba(239, 68, 68, 0.4)';
                    case 'bg-orange-500/40': return 'rgba(249, 115, 22, 0.4)';
                    case 'bg-pink-500/40': return 'rgba(236, 72, 153, 0.4)';
                    case 'bg-blue-500/40': return 'rgba(59, 130, 246, 0.4)';
                    case 'bg-rose-500/40': return 'rgba(244, 63, 94, 0.4)';
                    case 'bg-sky-500/40': return 'rgba(14, 165, 233, 0.4)';
                    case 'bg-purple-500/40': return 'rgba(168, 85, 247, 0.4)';
                    case 'bg-green-500/40': return 'rgba(34, 197, 94, 0.4)';
                    case 'bg-violet-500/40': return 'rgba(139, 92, 246, 0.4)';
                    case 'bg-cyan-500/40': return 'rgba(6, 182, 212, 0.4)';
                    case 'bg-amber-500/40': return 'rgba(245, 158, 11, 0.4)';
                    case 'bg-teal-500/40': return 'rgba(20, 184, 166, 0.4)';
                    case 'bg-indigo-500/40': return 'rgba(99, 102, 241, 0.4)';
                    default: return 'rgba(255, 255, 255, 0.15)';
                  }
                };

                return (
                  <div
                    key={directory.id}
                    className={`p-4 cursor-pointer min-w-[140px] flex-shrink-0 text-center transition-all duration-200 rounded-2xl ${
                      selectedCategory === directory.id 
                        ? 'ring-2 ring-white/50 scale-105' 
                        : 'hover:scale-102'
                    }`}
                    style={{
                      background: getBackgroundColor(directory.color),
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
                    }}
                    onClick={() => setSelectedCategory(directory.id)}
                  >
                    <h3 className="text-white text-sm font-medium leading-tight flex items-center justify-center h-full">
                      {directory.name}
                    </h3>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        
        {/* Loading State */}
        {isLoading && (
          <div className="w-full max-w-md mx-auto">
            <GlassCard className="p-6 text-center">
              <p className="text-white/70">Carregando rotinas...</p>
            </GlassCard>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="w-full max-w-md mx-auto">
            <GlassCard className="p-6 text-center">
              <p className="text-red-300">Erro ao carregar rotinas. Tente novamente.</p>
            </GlassCard>
          </div>
        )}
        
        {/* Routines List */}
        <div className="w-full max-w-md mx-auto">
          {!isLoading && !error && filteredRoutines.length === 0 ? (
            <GlassCard className="p-6 text-center">
              <p className="text-white/70 mb-3">
                {searchTerm 
                  ? `Nenhuma rotina encontrada para "${searchTerm}"`
                  : 'Nenhuma rotina encontrada'
                }
              </p>
              <p className="text-white/50 text-xs mb-3">
                Total carregadas: {routines.length} | Estado: {isLoading ? 'Carregando...' : 'Pronto'}
              </p>
              <button 
                onClick={() => refetch()}
                className="px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors text-white text-sm"
              >
                Recarregar Rotinas
              </button>
            </GlassCard>
          ) : (
            filteredRoutines.map((routine: Routine) => {
              const categoryColor = getCategoryColor(routine.category);
              
              return (
                <Link key={routine.id} href={`/routine/${routine.id}`} className="block mb-4">
                  <GlassCard className="p-4 cursor-pointer hover:bg-white/10 transition-all duration-200 hover:scale-[1.02] group">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mr-3">
                        <div className={`w-10 h-10 rounded-lg ${categoryColor} flex items-center justify-center`}>
                          <FileText className="w-5 h-5 text-white" />
                        </div>
                      </div>
                      
                      <div className="flex-grow min-w-0">
                        <h3 className="text-white font-semibold mb-1 group-hover:text-white/90 transition-colors">
                          {routine.title}
                        </h3>
                        <p className="text-white/60 text-sm mb-2">
                          Autor: {routine.author}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <span className={`px-2 py-1 rounded text-xs font-medium text-white ${categoryColor}`}>
                            {routine.category}
                          </span>
                          {routine.conversionMethod && (
                            <span className="text-white/50 text-xs">
                              {routine.conversionMethod}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                </Link>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}