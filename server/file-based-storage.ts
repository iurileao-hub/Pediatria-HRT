import { readFileSync } from 'fs';
import { join } from 'path';
import routinesMetadata from './routines-metadata.json';

export interface Routine {
  id: string;
  title: string;
  author: string;
  category: string;
  filename: string;
  htmlContent?: string;
}

export class FileBasedStorage {
  private htmlDir: string;
  private routines: Map<string, Routine>;

  constructor() {
    this.htmlDir = join(process.cwd(), 'attached_assets', 'Rotinas', 'html-output');
    this.routines = new Map();
    this.loadRoutines();
  }

  private loadRoutines() {
    // Convert metadata to Routine objects with IDs
    Object.entries(routinesMetadata).forEach(([key, metadata]) => {
      const routine: Routine = {
        id: metadata.id,
        title: metadata.title,
        author: metadata.author,
        category: metadata.category,
        filename: metadata.filename
      };
      this.routines.set(routine.id, routine);
    });
  }

  async getAllRoutines(): Promise<Routine[]> {
    return Array.from(this.routines.values());
  }

  async getRoutine(id: string): Promise<Routine | undefined> {
    const routine = this.routines.get(id);
    if (!routine) return undefined;

    // Load HTML content on demand
    if (!routine.htmlContent) {
      try {
        const htmlPath = join(this.htmlDir, routine.filename);
        routine.htmlContent = readFileSync(htmlPath, 'utf-8');
      } catch (error) {
        console.error(`Error reading routine file: ${routine.filename}`, error);
        return undefined;
      }
    }

    return routine;
  }

  async getRoutinesByCategory(category: string): Promise<Routine[]> {
    const allRoutines = await this.getAllRoutines();
    return allRoutines.filter(routine => 
      routine.category.toLowerCase() === category.toLowerCase()
    );
  }

  async searchRoutines(query: string): Promise<Routine[]> {
    const allRoutines = await this.getAllRoutines();
    const searchTerm = query.toLowerCase();
    
    return allRoutines.filter(routine => 
      routine.title.toLowerCase().includes(searchTerm) ||
      routine.author.toLowerCase().includes(searchTerm) ||
      routine.category.toLowerCase().includes(searchTerm)
    );
  }

  getCategories(): string[] {
    const categories = new Set<string>();
    this.routines.forEach(routine => categories.add(routine.category));
    return Array.from(categories).sort();
  }
}

export const fileStorage = new FileBasedStorage();