export interface RoutineContent {
  type: 'paragraph' | 'heading' | 'list' | 'table' | 'alert';
  level?: 1 | 2 | 3 | 4; // For headings
  text?: string;
  items?: string[]; // For lists
  data?: TableData; // For tables
  alertType?: 'warning' | 'info' | 'success' | 'error'; // For alerts
}

export interface TableData {
  headers: string[];
  rows: string[][];
}

export interface RoutineData {
  id: string;
  title: string;
  author: string;
  category: string;
  content: RoutineContent[];
}