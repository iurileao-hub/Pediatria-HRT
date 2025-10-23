import { Link, useRoute } from "wouter";
import { GlassCard } from "@/components/ui/glass-card";
import { ArrowLeft, FileText, User, Calendar } from "lucide-react";
import { useLazyImages } from "@/components/LazyImage";
import { useRoutine } from "@/hooks/useRoutines";
import type { Routine } from "@/types/routine";

// Helper function to get category color
const getCategoryColor = (category: string) => {
  const colorMap: Record<string, string> = {
    "Infectologia": "bg-green-500/40",
    "Emergência": "bg-red-500/40",
    "HRN": "bg-blue-500/40",
    "Gastroenterologia": "bg-amber-500/40",
    "Neonatologia": "bg-pink-500/40",
    "Cardiologia": "bg-rose-500/40",
    "Neurologia": "bg-indigo-500/40",
    "Lactentes": "bg-cyan-500/40",
    "UTI": "bg-orange-500/40",
    "Endocrinologia": "bg-teal-500/40",
    "Pneumologia": "bg-sky-500/40"
  };
  return colorMap[category] || "bg-slate-500/40";
};

export default function RoutineDynamic() {
  const [, params] = useRoute("/routine/:id");
  const routineId = params?.id;

  // Fetch specific routine from local JSON
  const { data: routine, isLoading, error } = useRoutine(routineId);

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
              <p className="text-white/70 text-xl font-medium">Carregando rotina...</p>
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
              <h1 className="text-white text-3xl font-bold mb-4">
                Rotina não encontrada
              </h1>
              <p className="text-white/70 text-xl font-medium mb-6">
                A rotina solicitada não existe ou não pôde ser carregada.
              </p>
              <Link href="/routines" className="text-blue-300 text-lg font-semibold underline hover:text-blue-200">
                Clique aqui para voltar às rotinas
              </Link>
            </GlassCard>
          </div>
        </div>
      </div>
    );
  }

  const categoryColor = getCategoryColor(routine.category);

  // Process HTML content to add lazy loading to images
  const processedHtmlContent = useLazyImages(routine.htmlContent);

  return (
    <div className="min-h-screen bg-white text-gray-900 font-crimson">
      {/* Navigation link above header */}
      <div className="max-w-7xl mx-auto px-2 pt-4">
        <Link
          href="/routines"
          className="inline-flex items-center text-indigo-500 text-lg font-bold no-underline p-2 px-4 bg-indigo-50 rounded-lg border border-indigo-500 transition-colors hover:bg-indigo-100"
          data-testid="link-back-to-routines-top"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Voltar às rotinas
        </Link>
      </div>

      {/* Header with rounded corners */}
      <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-4 text-white m-2 rounded-lg">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-2">
            <div>
              <h1 className="text-3xl font-bold mb-2 font-crimson drop-shadow-md" data-testid="text-routine-title">
                {routine.title}
              </h1>

              <div className="flex items-center gap-6 flex-wrap">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span className="text-lg font-semibold font-crimson" data-testid="text-routine-author">Autor: {routine.author}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className="py-1 px-3 bg-white/20 rounded-full text-lg font-semibold font-crimson"
                    data-testid="text-routine-category"
                  >
                    {routine.category}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-2">
        <div
          className="bg-white p-4 rounded-xl shadow-md border border-gray-200 font-crimson text-xl font-medium leading-relaxed prose prose-lg max-w-none"
          data-testid="text-routine-content"
          dangerouslySetInnerHTML={{
            __html: processedHtmlContent || '<p>Conteúdo não disponível.</p>'
          }}
        />
        {/* Footer */}
        <div className="max-w-7xl mx-auto text-center py-8">
          <Link
            href="/routines"
            className="inline-flex items-center gap-2 py-3 px-6 bg-indigo-500 text-white no-underline rounded-lg text-lg font-bold transition-colors hover:bg-indigo-600"
            data-testid="link-back-to-routines-bottom"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar às rotinas
          </Link>
        </div>
      </div>
    </div>
  );
}
