// Types for the file-based routine system

export interface Routine {
  id: string;
  title: string;
  author: string;
  category: string;
  filename: string;
  htmlContent?: string;
}

export interface RoutineListItem {
  id: string;
  title: string;
  author: string;
  category: string;
}

export type Category = string;