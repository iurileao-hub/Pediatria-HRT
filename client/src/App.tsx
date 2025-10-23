import { Switch, Route } from "wouter";
import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/contexts/ThemeProvider";

// Lazy load pages for better initial load performance
const Home = lazy(() => import("@/pages/home"));
const Routines = lazy(() => import("@/pages/routines"));
const RoutineDynamic = lazy(() => import("@/pages/routine-dynamic"));
const NotFound = lazy(() => import("@/pages/not-found"));

// Loading component for suspense fallback
function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-400 via-red-500 to-pink-500">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 mb-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        </div>
        <p className="text-white text-xl font-semibold">Carregando...</p>
      </div>
    </div>
  );
}

function Router() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/routines" component={Routines} />
        <Route path="/routine/:id" component={RoutineDynamic} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </ThemeProvider>
  );
}

export default App;
