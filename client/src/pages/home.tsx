import { Link } from "wouter";
import { GlassCard } from "@/components/ui/glass-card";
import { PediatriaLogo } from "@/components/pediatria-logo";
import { FileText, ChevronRight } from "lucide-react";

export default function Home() {
  return (
    <div className="sunset-background">
      {/* Background Effects */}
      <div className="sunset-rays"></div>
      
      {/* Main Content Container */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center px-4 py-8">
        {/* Logo Card */}
        <div className="w-full max-w-sm mx-auto mb-6">
          <GlassCard className="p-8 text-center">
            <PediatriaLogo />
            
            <h1 className="text-white text-xl font-semibold mb-2">
              Pediatria HRT
            </h1>
            <p className="text-white/80 text-sm">
              Hospital Regional de Taguatinga
            </p>
          </GlassCard>
        </div>
        
        {/* Navigation Card */}
        <div className="w-full max-w-sm mx-auto">
          <Link href="/routines">
            <GlassCard 
              className="p-6 w-full text-center cursor-pointer focus:outline-none focus:ring-4 focus:ring-white/30 active:scale-95 transition-transform duration-150 touch-manipulation touch-only" 
            >
              <div className="flex items-center justify-center mb-3">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mr-3">
                  <FileText className="w-5 h-5 text-white" />
                </div>
              </div>
              
              <h2 className="text-white text-lg font-semibold mb-2">
                Acesso às rotinas da Pediatria HRT
              </h2>
              
              <div className="mt-4 flex justify-center">
                <ChevronRight className="w-5 h-5 text-white/60" />
              </div>
            </GlassCard>
          </Link>
        </div>
        
        {/* Footer Information */}
        <div className="mt-12 text-center">
          <p className="text-white/60 text-xs">
            © 2024 Hospital Regional de Taguatinga - DF
          </p>
        </div>
      </div>
    </div>
  );
}
