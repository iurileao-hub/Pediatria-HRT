import { useState, useEffect } from 'react';
import type { RoutineIndex, Routine } from '@/types/routine';

// Hook para carregar o índice de rotinas
export function useRoutinesIndex() {
  const [routines, setRoutines] = useState<RoutineIndex[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadRoutines = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/data/routines-index.json');

        if (!response.ok) {
          throw new Error('Falha ao carregar rotinas');
        }

        const data = await response.json();
        setRoutines(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Erro desconhecido'));
      } finally {
        setIsLoading(false);
      }
    };

    loadRoutines();
  }, []);

  return { data: routines, isLoading, error };
}

// Hook para carregar uma rotina específica
export function useRoutine(id: string | undefined) {
  const [routine, setRoutine] = useState<Routine | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!id) {
      setIsLoading(false);
      return;
    }

    const loadRoutine = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/data/routines/${id}.json`);

        if (!response.ok) {
          throw new Error('Rotina não encontrada');
        }

        const data = await response.json();
        setRoutine(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Erro desconhecido'));
        setRoutine(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadRoutine();
  }, [id]);

  return { data: routine, isLoading, error };
}
