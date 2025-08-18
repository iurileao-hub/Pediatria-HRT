import type { Express } from "express";
import { createServer, type Server } from "http";
import multer from "multer";
import { storage } from "./storage";
import { documentConverter } from "./conversion-service";
import { insertRoutineSchema, insertConversionJobSchema } from "@shared/schema";
import { z } from "zod";

// Configuração do multer para upload de arquivos
const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
        file.originalname.toLowerCase().endsWith('.docx')) {
      cb(null, true);
    } else {
      cb(new Error('Apenas arquivos .docx são permitidos'));
    }
  },
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limite
  }
});

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Rota para listar todas as rotinas
  app.get("/api/routines", async (req, res) => {
    try {
      const routines = await storage.getAllRoutines();
      res.json(routines);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar rotinas" });
    }
  });

  // Rota para buscar uma rotina específica
  app.get("/api/routines/:id", async (req, res) => {
    try {
      const routine = await storage.getRoutine(req.params.id);
      if (!routine) {
        return res.status(404).json({ error: "Rotina não encontrada" });
      }
      res.json(routine);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar rotina" });
    }
  });

  // Rota para conversão única de arquivo
  app.post("/api/convert/single", upload.single('file'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "Nenhum arquivo enviado" });
      }

      const method = req.body.method as 'mammoth' | 'pandoc' || 'mammoth';
      const result = await documentConverter.convertDocument(
        req.file.buffer,
        req.file.originalname,
        method
      );

      if (result.success && result.htmlContent) {
        // Extrai metadados do nome do arquivo
        const metadata = documentConverter.extractMetadataFromFilename(req.file.originalname);
        
        // Salva a rotina no storage
        const routine = await storage.createRoutine({
          ...metadata,
          htmlContent: result.htmlContent,
          conversionMethod: method
        });

        res.json({
          success: true,
          routine,
          conversionResult: result
        });
      } else {
        res.status(400).json({
          success: false,
          error: result.error,
          method: result.method
        });
      }
    } catch (error) {
      res.status(500).json({ 
        error: "Erro interno no servidor",
        details: error instanceof Error ? error.message : "Erro desconhecido"
      });
    }
  });

  // Rota para conversão em lote
  app.post("/api/convert/batch", upload.array('files', 50), async (req, res) => {
    try {
      const files = req.files as Express.Multer.File[];
      if (!files || files.length === 0) {
        return res.status(400).json({ error: "Nenhum arquivo enviado" });
      }

      const method = req.body.method as 'mammoth' | 'pandoc' || 'mammoth';
      
      // Cria um job de conversão
      const job = await storage.createConversionJob({
        method,
        totalFiles: files.length.toString(),
        processedFiles: "0",
        status: "processing"
      });

      // Inicia a conversão em lote (assíncrona)
      const fileData = files.map(file => ({
        buffer: file.buffer,
        filename: file.originalname
      }));

      let processedCount = 0;
      const results = await documentConverter.convertBatch(
        fileData,
        method,
        async (processed, total) => {
          processedCount = processed;
          await storage.updateConversionJob(job.id, {
            processedFiles: processed.toString()
          });
        }
      );

      // Salva rotinas bem-sucedidas
      const savedRoutines = [];
      const errors = [];

      for (const result of results) {
        if (result.success && result.htmlContent) {
          try {
            const metadata = documentConverter.extractMetadataFromFilename(result.filename);
            const routine = await storage.createRoutine({
              ...metadata,
              htmlContent: result.htmlContent,
              conversionMethod: method
            });
            savedRoutines.push(routine);
          } catch (error) {
            errors.push({
              filename: result.filename,
              error: error instanceof Error ? error.message : "Erro ao salvar"
            });
          }
        } else {
          errors.push({
            filename: result.filename,
            error: result.error || "Erro de conversão"
          });
        }
      }

      // Atualiza o job com os resultados
      await storage.updateConversionJob(job.id, {
        status: "completed",
        completedAt: new Date(),
        results: {
          successful: savedRoutines.length,
          failed: errors.length,
          errors: errors
        }
      });

      res.json({
        success: true,
        jobId: job.id,
        summary: {
          total: files.length,
          successful: savedRoutines.length,
          failed: errors.length
        },
        routines: savedRoutines,
        errors: errors
      });

    } catch (error) {
      res.status(500).json({ 
        error: "Erro interno no servidor",
        details: error instanceof Error ? error.message : "Erro desconhecido"
      });
    }
  });

  // Rota para consultar status de job de conversão
  app.get("/api/convert/job/:id", async (req, res) => {
    try {
      const job = await storage.getConversionJob(req.params.id);
      if (!job) {
        return res.status(404).json({ error: "Job não encontrado" });
      }
      res.json(job);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar job" });
    }
  });

  // Rota para listar todos os jobs de conversão
  app.get("/api/convert/jobs", async (req, res) => {
    try {
      const jobs = await storage.getAllConversionJobs();
      res.json(jobs);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar jobs" });
    }
  });

  // Rota para deletar uma rotina
  app.delete("/api/routines/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteRoutine(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "Rotina não encontrada" });
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Erro ao deletar rotina" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
