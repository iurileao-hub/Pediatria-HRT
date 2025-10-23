import { useState, useEffect, useMemo, useCallback, memo } from "react";
import { Link } from "wouter";
import { GlassCard } from "@/components/ui/glass-card";
import { ArrowLeft, Search } from "lucide-react";
import { useRoutinesIndex } from "@/hooks/useRoutines";
import type { RoutineIndex } from "@/types/routine";
import { categoryColorMap, getCategoryColor } from "@/lib/categories";

interface DirectoryCategory {
  id: string;
  name: string;
  color: string;
  rgba: string;
}

const directories: DirectoryCategory[] = Object.entries(categoryColorMap).map(([id, { color, rgba }]) => ({
  id,
  name: id === "all" ? "Todas" : id,
  color,
  rgba
}));

// Memoize utility functions
const removeAccents = (text: string): string => {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
};

// Memoized Routine Card Component
const RoutineCard = memo(({ routine }: { routine: RoutineIndex }) => {
  const categoryColor = getCategoryColor(routine.category);

  return (
    <Link href={`/routine/${routine.id}`} className="block mb-4">
      <GlassCard className="p-4 cursor-pointer">
        <div className="flex items-start">
          <div className="flex-grow min-w-0">
            <h3 className="text-white text-xl font-bold mb-1" style={{ fontFamily: '"Crimson Text", Cambria, "Book Antiqua", Georgia, serif' }}>
              {routine.title}
            </h3>
            <p className="text-white/60 text-lg font-medium mb-2" style={{ fontFamily: '"Crimson Text", Cambria, "Book Antiqua", Georgia, serif' }}>
              Autor: {routine.author}
            </p>

            <div className="flex items-center justify-between">
              <span className={`px-2 py-1 rounded text-base font-semibold text-white ${categoryColor}`} style={{ fontFamily: '"Crimson Text", Cambria, "Book Antiqua", Georgia, serif' }}>
                {routine.category}
              </span>
            </div>
          </div>
        </div>
      </GlassCard>
    </Link>
  );
});

export default function Routines() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const { data: routines = [], isLoading, error } = useRoutinesIndex();

  useEffect(() => {
    setSearchTerm("");
    setSelectedCategory("all");
  }, []);
  
  // Memoize filtered routines to avoid recalculation on every render
  const filteredRoutines = useMemo(() => {
    if (!routines || routines.length === 0) return [];

    const searchNormalized = removeAccents(searchTerm);

    return routines.filter((routine: RoutineIndex) => {
      const titleNormalized = removeAccents(routine.title);
      const authorNormalized = removeAccents(routine.author);

      const matchesSearch = !searchTerm ||
        titleNormalized.includes(searchNormalized) ||
        authorNormalized.includes(searchNormalized);

      const matchesCategory = selectedCategory === "all" || routine.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [routines, searchTerm, selectedCategory]);
  
  // Memoize callbacks to avoid unnecessary re-renders
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);
  
  const handleCategorySelect = useCallback((categoryId: string) => {
    setSelectedCategory(categoryId);
  }, []);

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
              <h1 className="text-white text-xl font-bold">Início</h1>
            </GlassCard>
          </Link>
        </div>
        
        {/* Search Bar */}
        <div className="w-full max-w-md mx-auto mb-6">
          <GlassCard className="p-4">
            <div className="relative mb-1">
              <input 
                type="text" 
                placeholder="Buscar rotinas, autores ou categorias..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full bg-white/20 border border-white/30 rounded-lg px-4 py-3 pl-10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 text-lg font-medium"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60" />
            </div>

          </GlassCard>
        </div>

        {/* Directory Cards - Horizontal Scroll */}
        <div className="mb-6 -mx-4">
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-3 py-2" style={{ width: 'max-content', paddingLeft: '1rem', paddingRight: '1rem' }}>
              {directories.map((directory) => (
                <div
                  key={directory.id}
                  className={`p-4 cursor-pointer min-w-[140px] flex-shrink-0 text-center transition-all duration-200 rounded-2xl ${
                    selectedCategory === directory.id 
                      ? 'ring-2 ring-white/50 scale-105' 
                      : 'hover:scale-102'
                  }`}
                  style={{
                    background: directory.rgba,
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
                  }}
                  onClick={() => handleCategorySelect(directory.id)}
                >
                  <h3 className="text-white text-xl font-semibold leading-tight flex items-center justify-center h-full">
                    {directory.name}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Routine Counter */}
        <div className="w-full max-w-md mx-auto mb-4">
          <p className="text-white/70 text-lg font-semibold text-center" style={{ fontFamily: '"Crimson Text", Cambria, "Book Antiqua", Georgia, serif' }}>
            {filteredRoutines.length} Rotina{filteredRoutines.length !== 1 ? 's' : ''}
          </p>
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
              <p className="text-white/70 mb-3 text-lg font-medium">
                {searchTerm
                  ? `Nenhuma rotina encontrada para "${searchTerm}"`
                  : 'Nenhuma rotina encontrada'
                }
              </p>
              <p className="text-white/50 text-sm font-medium">
                Total carregadas: {routines.length} rotinas
              </p>
            </GlassCard>
          ) : (
            filteredRoutines.map((routine: RoutineIndex) => (
              <RoutineCard key={routine.id} routine={routine} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}