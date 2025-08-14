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

// 73 Medical Routines with proper category assignments
const routineData: Omit<Routine, 'id'>[] = [
  // Emergency
  { title: "Acidentes por animais peçonhentos", author: "Autor a ser definido", category: "emergency", categoryColor: "bg-red-500/40" },
  { title: "Afogamento", author: "Autor a ser definido", category: "emergency", categoryColor: "bg-red-500/40" },
  { title: "Choque Séptico (Emergência)", author: "Autor a ser definido", category: "emergency", categoryColor: "bg-red-500/40" },
  { title: "Emergência Respiratória", author: "Autor a ser definido", category: "emergency", categoryColor: "bg-red-500/40" },
  { title: "Intoxicações Exógenas Agudas", author: "Autor a ser definido", category: "emergency", categoryColor: "bg-red-500/40" },
  { title: "Parada Cardiorrespiratória (PCR)", author: "Autor a ser definido", category: "emergency", categoryColor: "bg-red-500/40" },
  { title: "Traumatismo Cranioencefálico (TCE)", author: "Autor a ser definido", category: "emergency", categoryColor: "bg-red-500/40" },
  
  // Intensive Care
  { title: "Choque Séptico (Aminas Vasoativas)", author: "Autor a ser definido", category: "intensive-care", categoryColor: "bg-orange-500/40" },
  { title: "Ventilação Mecânica (Conceitos Básicos)", author: "Autor a ser definido", category: "intensive-care", categoryColor: "bg-orange-500/40" },
  { title: "Distúrbios Ácido-Básicos", author: "Autor a ser definido", category: "intensive-care", categoryColor: "bg-orange-500/40" },
  { title: "Distúrbios Eletrolíticos", author: "Autor a ser definido", category: "intensive-care", categoryColor: "bg-orange-500/40" },
  { title: "Punção Lombar", author: "Autor a ser definido", category: "intensive-care", categoryColor: "bg-orange-500/40" },
  
  // Neonatology
  { title: "Febre no Recém Nascido", author: "Autor a ser definido", category: "neonatology", categoryColor: "bg-pink-500/40" },
  { title: "Hidratação Venosa no RN", author: "Autor a ser definido", category: "neonatology", categoryColor: "bg-pink-500/40" },
  { title: "Icterícia Neonatal", author: "Autor a ser definido", category: "neonatology", categoryColor: "bg-pink-500/40" },
  { title: "Insuficiência Respiratória no RN", author: "Autor a ser definido", category: "neonatology", categoryColor: "bg-pink-500/40" },
  { title: "Reanimação Neonatal", author: "Autor a ser definido", category: "neonatology", categoryColor: "bg-pink-500/40" },
  
  // Infants
  { title: "Alimentação nos 2 primeiros anos de vida", author: "Autor a ser definido", category: "infants", categoryColor: "bg-blue-500/40" },
  { title: "Desconforto Respiratório do Lactente (Bronquiolite Viral Aguda)", author: "Autor a ser definido", category: "infants", categoryColor: "bg-blue-500/40" },
  { title: "Fórmulas Lácteas", author: "Autor a ser definido", category: "infants", categoryColor: "bg-blue-500/40" },
  { title: "Alergia à Proteína do Leite de Vaca (APLV)", author: "Autor a ser definido", category: "infants", categoryColor: "bg-blue-500/40" },
  { title: "Desidratação Hipernatrêmica", author: "Autor a ser definido", category: "infants", categoryColor: "bg-blue-500/40" },
  
  // Cardiology
  { title: "Crise de Hipóxia", author: "Autor a ser definido", category: "cardiology", categoryColor: "bg-rose-500/40" },
  { title: "Doença de Kawasaki", author: "Autor a ser definido", category: "cardiology", categoryColor: "bg-rose-500/40" },
  { title: "Endocardite Infecciosa", author: "Autor a ser definido", category: "cardiology", categoryColor: "bg-rose-500/40" },
  { title: "Febre Reumática (FR)", author: "Autor a ser definido", category: "cardiology", categoryColor: "bg-rose-500/40" },
  { title: "Hipertensão Arterial", author: "Autor a ser definido", category: "cardiology", categoryColor: "bg-rose-500/40" },
  { title: "Insuficiência Cardíaca Congestiva (ICC)", author: "Autor a ser definido", category: "cardiology", categoryColor: "bg-rose-500/40" },
  
  // Pneumology
  { title: "Asma (Crise Aguda)", author: "Autor a ser definido", category: "pneumology", categoryColor: "bg-sky-500/40" },
  { title: "Crupe", author: "Autor a ser definido", category: "pneumology", categoryColor: "bg-sky-500/40" },
  { title: "Derrame Pleural", author: "Autor a ser definido", category: "pneumology", categoryColor: "bg-sky-500/40" },
  { title: "Obstrução de Via Aérea por Corpo Estranho (OVACE)", author: "Autor a ser definido", category: "pneumology", categoryColor: "bg-sky-500/40" },
  { title: "Pneumonias Bacterianas", author: "Autor a ser definido", category: "pneumology", categoryColor: "bg-sky-500/40" },
  { title: "Tuberculose", author: "Autor a ser definido", category: "pneumology", categoryColor: "bg-sky-500/40" },
  
  // Hematology, Rheumatology and Nephrology
  { title: "Anemia Falciforme", author: "Autor a ser definido", category: "hematology-rheumatology-nephrology", categoryColor: "bg-purple-500/40" },
  { title: "Anemia Ferropriva", author: "Autor a ser definido", category: "hematology-rheumatology-nephrology", categoryColor: "bg-purple-500/40" },
  { title: "Artrite (Abordagem Inicial)", author: "Autor a ser definido", category: "hematology-rheumatology-nephrology", categoryColor: "bg-purple-500/40" },
  { title: "Artrite Séptica", author: "Autor a ser definido", category: "hematology-rheumatology-nephrology", categoryColor: "bg-purple-500/40" },
  { title: "Artrites Reativas ou Reacionais", author: "Autor a ser definido", category: "hematology-rheumatology-nephrology", categoryColor: "bg-purple-500/40" },
  { title: "Distúrbio Metabólico / Litíase Renal / Cólica Nefrética", author: "Autor a ser definido", category: "hematology-rheumatology-nephrology", categoryColor: "bg-purple-500/40" },
  { title: "Glomerulonefrite Difusa Aguda (GNDA)", author: "Autor a ser definido", category: "hematology-rheumatology-nephrology", categoryColor: "bg-purple-500/40" },
  { title: "Hematúria", author: "Autor a ser definido", category: "hematology-rheumatology-nephrology", categoryColor: "bg-purple-500/40" },
  { title: "Púrpura de Henoch-Schönlein (PHS)", author: "Autor a ser definido", category: "hematology-rheumatology-nephrology", categoryColor: "bg-purple-500/40" },
  { title: "Púrpura Trombocitopênica Idiopática (PTI)", author: "Autor a ser definido", category: "hematology-rheumatology-nephrology", categoryColor: "bg-purple-500/40" },
  { title: "Síndrome Nefrótica (SN)", author: "Autor a ser definido", category: "hematology-rheumatology-nephrology", categoryColor: "bg-purple-500/40" },
  
  // Infectology
  { title: "Coqueluche", author: "Autor a ser definido", category: "infectology", categoryColor: "bg-green-500/40" },
  { title: "Dengue e outra Arboviroses", author: "Autor a ser definido", category: "infectology", categoryColor: "bg-green-500/40" },
  { title: "Hepatites Virais", author: "Autor a ser definido", category: "infectology", categoryColor: "bg-green-500/40" },
  { title: "Infecções Tegumentares e Miosites", author: "Autor a ser definido", category: "infectology", categoryColor: "bg-green-500/40" },
  { title: "Leishmaniose Visceral", author: "Autor a ser definido", category: "infectology", categoryColor: "bg-green-500/40" },
  { title: "Mastoidite", author: "Autor a ser definido", category: "infectology", categoryColor: "bg-green-500/40" },
  { title: "Meningites Bacterianas", author: "Autor a ser definido", category: "infectology", categoryColor: "bg-green-500/40" },
  { title: "Mononucleose Infecciosa", author: "Autor a ser definido", category: "infectology", categoryColor: "bg-green-500/40" },
  { title: "Osteomielite", author: "Autor a ser definido", category: "infectology", categoryColor: "bg-green-500/40" },
  { title: "Parasitoses Intestinais", author: "Autor a ser definido", category: "infectology", categoryColor: "bg-green-500/40" },
  { title: "Primoinfecção e Encefalite Herpética", author: "Autor a ser definido", category: "infectology", categoryColor: "bg-green-500/40" },
  { title: "Varicela", author: "Autor a ser definido", category: "infectology", categoryColor: "bg-green-500/40" },
  
  // Gastroenterology
  { title: "Constipação Intestinal", author: "Autor a ser definido", category: "gastroenterology", categoryColor: "bg-amber-500/40" },
  { title: "Diarreias Agudas", author: "Autor a ser definido", category: "gastroenterology", categoryColor: "bg-amber-500/40" },
  { title: "Diarreias Infecciosas", author: "Autor a ser definido", category: "gastroenterology", categoryColor: "bg-amber-500/40" },
  { title: "Doença do Refluxo Gastroesofágico", author: "Autor a ser definido", category: "gastroenterology", categoryColor: "bg-amber-500/40" },
  { title: "Dor Abdominal Aguda", author: "Autor a ser definido", category: "gastroenterology", categoryColor: "bg-amber-500/40" },
  
  // Endocrinology
  { title: "Cetoacidose Diabética", author: "Autor a ser definido", category: "endocrinology", categoryColor: "bg-teal-500/40" },
  { title: "Insulinoterapia", author: "Autor a ser definido", category: "endocrinology", categoryColor: "bg-teal-500/40" },
  
  // Neurology
  { title: "Cefaleias", author: "Autor a ser definido", category: "neurology", categoryColor: "bg-indigo-500/40" },
  { title: "Epilepsia e Estado de Mal Epiléptico", author: "Autor a ser definido", category: "neurology", categoryColor: "bg-indigo-500/40" },
  
  // General Pediatrics and Puericulture
  { title: "Adenomegalias", author: "Autor a ser definido", category: "general-pediatrics", categoryColor: "bg-cyan-500/40" },
  { title: "Dor de Crescimento", author: "Autor a ser definido", category: "general-pediatrics", categoryColor: "bg-cyan-500/40" },
  { title: "Faringotonsilite Aguda (IVAS 1)", author: "Autor a ser definido", category: "general-pediatrics", categoryColor: "bg-cyan-500/40" },
  { title: "Maus Tratos e Abuso Sexual na Infância", author: "Autor a ser definido", category: "general-pediatrics", categoryColor: "bg-cyan-500/40" },
  { title: "Otite Média Aguda (IVAS 2)", author: "Autor a ser definido", category: "general-pediatrics", categoryColor: "bg-cyan-500/40" },
  { title: "Rinossinusite Aguda (IVAS 3)", author: "Autor a ser definido", category: "general-pediatrics", categoryColor: "bg-cyan-500/40" },
  { title: "Urticária / Angioedema / Anafilaxia", author: "Autor a ser definido", category: "general-pediatrics", categoryColor: "bg-cyan-500/40" }
];

const routines: Routine[] = routineData
  .map((routine, index) => ({ ...routine, id: (index + 1).toString() }))
  .sort((a, b) => a.title.localeCompare(b.title));

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
              {directories.map((directory) => {
                const getBackgroundColor = (color: string) => {
                  switch(color) {
                    case 'bg-slate-500/40': return 'rgba(100, 116, 139, 0.4)';
                    case 'bg-red-500/40': return 'rgba(239, 68, 68, 0.4)';
                    case 'bg-orange-500/40': return 'rgba(249, 115, 22, 0.4)';
                    case 'bg-pink-500/40': return 'rgba(236, 72, 153, 0.4)';
                    case 'bg-blue-500/40': return 'rgba(59, 130, 246, 0.4)';
                    case 'bg-rose-500/40': return 'rgba(244, 63, 94, 0.4)';
                    case 'bg-sky-500/40': return 'rgba(14, 165, 233, 0.4)';
                    case 'bg-purple-500/40': return 'rgba(168, 85, 247, 0.4)';
                    case 'bg-green-500/40': return 'rgba(34, 197, 94, 0.4)';
                    case 'bg-amber-500/40': return 'rgba(245, 158, 11, 0.4)';
                    case 'bg-teal-500/40': return 'rgba(20, 184, 166, 0.4)';
                    case 'bg-indigo-500/40': return 'rgba(99, 102, 241, 0.4)';
                    case 'bg-cyan-500/40': return 'rgba(6, 182, 212, 0.4)';
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
        
        {/* Routines List */}
        <div className="w-full max-w-md mx-auto space-y-4">
          {filteredRoutines.length === 0 ? (
            <GlassCard className="p-6 text-center">
              <p className="text-white/70">Nenhuma rotina encontrada para "{searchTerm}"</p>
            </GlassCard>
          ) : (
            filteredRoutines.map((routine) => {
              const categoryName = directories.find(dir => dir.id === routine.category)?.name || routine.category;
              const isFirstRoutine = routine.title === "Acidentes por animais peçonhentos";
              
              const cardContent = (
                <>
                  <h3 className="text-white font-semibold mb-1">{routine.title}</h3>
                  <p className="text-white/60 text-sm mb-3">
                    {isFirstRoutine ? "Luiz Antônio" : routine.author}
                  </p>
                  <span className={`inline-block ${routine.categoryColor} text-white px-2 py-1 rounded-full text-xs`}>
                    {categoryName}
                  </span>
                </>
              );

              if (isFirstRoutine) {
                return (
                  <Link key={routine.id} href="/routine/acidentes-por-animais-peconhentos">
                    <GlassCard className="p-4 cursor-pointer hover:bg-white/10 transition-colors">
                      {cardContent}
                    </GlassCard>
                  </Link>
                );
              }

              return (
                <GlassCard 
                  key={routine.id}
                  className="p-4 cursor-pointer"
                >
                  {cardContent}
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
