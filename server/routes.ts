import type { Express } from "express";
import { createServer, type Server } from "http";
import { fileStorage } from "./file-based-storage";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Rota para listar todas as rotinas
  app.get("/api/routines", async (req, res) => {
    try {
      const { category, search } = req.query;
      let routines;

      if (search && typeof search === 'string') {
        routines = await fileStorage.searchRoutines(search);
      } else if (category && typeof category === 'string') {
        routines = await fileStorage.getRoutinesByCategory(category);
      } else {
        routines = await fileStorage.getAllRoutines();
      }

      res.json(routines);
    } catch (error) {
      console.error('Error fetching routines:', error);
      res.status(500).json({ error: "Erro ao buscar rotinas" });
    }
  });

  // Rota para buscar uma rotina específica com conteúdo HTML
  app.get("/api/routines/:id", async (req, res) => {
    try {
      const routine = await fileStorage.getRoutine(req.params.id);
      if (!routine) {
        return res.status(404).json({ error: "Rotina não encontrada" });
      }
      res.json(routine);
    } catch (error) {
      console.error('Error fetching routine:', error);
      res.status(500).json({ error: "Erro ao buscar rotina" });
    }
  });

  // Rota para listar categorias disponíveis
  app.get("/api/categories", async (req, res) => {
    try {
      const categories = fileStorage.getCategories();
      res.json(categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
      res.status(500).json({ error: "Erro ao buscar categorias" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}