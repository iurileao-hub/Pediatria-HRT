import { Link, useRoute } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { GlassCard } from "@/components/ui/glass-card";
import { ArrowLeft, FileText, User, Calendar } from "lucide-react";
import type { Routine } from "@shared/types";

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
    "Neonatologia": "bg-pink-500/40"
  };
  return colorMap[category] || "bg-slate-500/40";
};

export default function RoutineDynamic() {
  const [, params] = useRoute("/routine/:id");
  const routineId = params?.id;

  // Fetch specific routine from API
  const { data: routine, isLoading, error } = useQuery<Routine>({
    queryKey: ['/api/routines', routineId],
    queryFn: async () => {
      const response = await fetch(`/api/routines/${routineId}`);
      if (!response.ok) {
        throw new Error('Rotina não encontrada');
      }
      return response.json();
    },
    enabled: !!routineId,
  });

  if (isLoading) {
    return (
      <div className="sunset-background">
        <div className="sunset-rays"></div>
        <div className="relative z-10 min-h-screen px-4 py-8">
          <div className="w-full max-w-4xl mx-auto">
            <div className="mb-6">
              <Link href="/routines" className="inline-block">
                <GlassCard className="p-4 flex items-center cursor-pointer hover:bg-white/10 transition-colors w-fit">
                  <ArrowLeft className="w-5 h-5 text-white mr-2" />
                  <span className="text-white">Voltar às rotinas</span>
                </GlassCard>
              </Link>
            </div>
            
            <GlassCard className="p-8 text-center">
              <p className="text-white/70 text-lg">Carregando rotina...</p>
            </GlassCard>
          </div>
        </div>
      </div>
    );
  }

  if (error || !routine) {
    return (
      <div className="sunset-background">
        <div className="sunset-rays"></div>
        <div className="relative z-10 min-h-screen px-4 py-8">
          <div className="w-full max-w-4xl mx-auto">
            <div className="mb-6">
              <Link href="/routines" className="inline-block">
                <GlassCard className="p-4 flex items-center cursor-pointer hover:bg-white/10 transition-colors w-fit">
                  <ArrowLeft className="w-5 h-5 text-white mr-2" />
                  <span className="text-white">Voltar às rotinas</span>
                </GlassCard>
              </Link>
            </div>
            
            <GlassCard className="p-8 text-center">
              <h1 className="text-white text-2xl font-bold mb-4">
                Rotina não encontrada
              </h1>
              <p className="text-white/70 text-lg mb-6">
                A rotina solicitada não existe ou não pôde ser carregada.
              </p>
              <Link href="/routines" className="text-blue-300 underline hover:text-blue-200">
                Clique aqui para voltar às rotinas
              </Link>
            </GlassCard>
          </div>
        </div>
      </div>
    );
  }

  const categoryColor = getCategoryColor(routine.category);

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: 'white',
      color: '#1a1a1a',
      fontFamily: 'Georgia, Times, serif',
      lineHeight: '1.6'
    }}>
      {/* Header with navigation */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '2rem 1rem',
        color: 'white'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Link href="/routines" style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            color: 'white', 
            textDecoration: 'none',
            marginBottom: '1rem',
            padding: '0.5rem 1rem',
            backgroundColor: 'rgba(255,255,255,0.1)',
            borderRadius: '8px',
            transition: 'background-color 0.2s'
          }}>
            <ArrowLeft style={{ width: '20px', height: '20px', marginRight: '0.5rem' }} />
            Voltar às rotinas
          </Link>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '12px',
              backgroundColor: 'rgba(255,255,255,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <FileText style={{ width: '30px', height: '30px' }} />
            </div>
            
            <div>
              <h1 style={{
                fontSize: '2rem',
                fontWeight: 'bold',
                margin: '0 0 0.5rem 0',
                textShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}>
                {routine.title}
              </h1>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <User style={{ width: '16px', height: '16px' }} />
                  <span>Autor: {routine.author}</span>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{
                    padding: '0.25rem 0.75rem',
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    borderRadius: '20px',
                    fontSize: '0.875rem',
                    fontWeight: '500'
                  }}>
                    {routine.category}
                  </span>
                </div>
                

              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }}>
        <div 
          style={{
            backgroundColor: '#ffffff',
            padding: '2rem',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            border: '1px solid #e5e7eb'
          }}
          dangerouslySetInnerHTML={{ 
            __html: routine.htmlContent || '<p>Conteúdo não disponível.</p>' 
          }}
        />
      </div>

      {/* Footer */}
      <div style={{
        backgroundColor: '#f8f9fa',
        borderTop: '1px solid #e5e7eb',
        padding: '2rem 1rem',
        marginTop: '2rem'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <Link 
            href="/routines"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.5rem',
              backgroundColor: '#667eea',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '8px',
              fontWeight: '500',
              transition: 'background-color 0.2s'
            }}
          >
            <ArrowLeft style={{ width: '18px', height: '18px' }} />
            Voltar às rotinas
          </Link>
        </div>
      </div>
    </div>
  );
}