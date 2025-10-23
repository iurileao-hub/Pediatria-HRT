// Tipos para as rotinas médicas
export interface Routine {
  id: string;
  title: string;
  author: string;
  category: string;
  htmlContent?: string;
  originalFilename?: string;
  conversionMethod?: string;
  createdAt?: string;
  updatedAt?: string;
  dataFile?: string;
}

export interface RoutineIndex {
  id: string;
  title: string;
  author: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  dataFile: string;
}
