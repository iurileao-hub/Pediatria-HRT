/**
 * Shared category color mappings for routine categories
 */

export interface CategoryColor {
  color: string;
  rgba: string;
}

export const categoryColorMap: Record<string, CategoryColor> = {
  "all": { color: "bg-slate-500/40", rgba: "rgba(100, 116, 139, 0.4)" },
  "Infectologia": { color: "bg-green-500/40", rgba: "rgba(34, 197, 94, 0.4)" },
  "Emergência": { color: "bg-red-500/40", rgba: "rgba(239, 68, 68, 0.4)" },
  "HRN": { color: "bg-blue-500/40", rgba: "rgba(59, 130, 246, 0.4)" },
  "Gastroenterologia": { color: "bg-amber-500/40", rgba: "rgba(245, 158, 11, 0.4)" },
  "Neonatologia": { color: "bg-pink-500/40", rgba: "rgba(236, 72, 153, 0.4)" },
  "Cardiologia": { color: "bg-rose-500/40", rgba: "rgba(244, 63, 94, 0.4)" },
  "Neurologia": { color: "bg-indigo-500/40", rgba: "rgba(99, 102, 241, 0.4)" },
  "Lactentes": { color: "bg-cyan-500/40", rgba: "rgba(6, 182, 212, 0.4)" },
  "UTI": { color: "bg-orange-500/40", rgba: "rgba(249, 115, 22, 0.4)" },
  "Endocrinologia": { color: "bg-teal-500/40", rgba: "rgba(20, 184, 166, 0.4)" },
  "Pneumologia": { color: "bg-sky-500/40", rgba: "rgba(14, 165, 233, 0.4)" }
};

/**
 * Get the Tailwind color class for a category
 */
export function getCategoryColor(category: string): string {
  return categoryColorMap[category]?.color || "bg-slate-500/40";
}

/**
 * Get the RGBA color value for a category
 */
export function getCategoryRgba(category: string): string {
  return categoryColorMap[category]?.rgba || "rgba(100, 116, 139, 0.4)";
}

/**
 * Get all available categories
 */
export function getAllCategories(): string[] {
  return Object.keys(categoryColorMap).filter(key => key !== "all");
}
