import { useEffect, useRef, useState } from 'react';
import ePub from 'epubjs';
import type { Book, Rendition } from 'epubjs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, Home, BookOpen } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface EpubViewerProps {
  epubPath: string;
  title?: string;
  onClose?: () => void;
}

export function EpubViewer({ epubPath, title, onClose }: EpubViewerProps) {
  const viewerRef = useRef<HTMLDivElement>(null);
  const [book, setBook] = useState<Book | null>(null);
  const [rendition, setRendition] = useState<Rendition | null>(null);
  const [currentLocation, setCurrentLocation] = useState<string>('');
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!viewerRef.current) return;

    const initializeEpub = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Criar o livro
        const newBook = ePub(epubPath);
        setBook(newBook);

        // Renderizar
        const newRendition = newBook.renderTo(viewerRef.current!, {
          width: '100%',
          height: '600px',
          spread: 'none'
        });

        setRendition(newRendition);

        // Exibir o livro
        await newRendition.display();

        // Configurar eventos de navegação
        newRendition.on('relocated', (location: any) => {
          setCurrentLocation(location.start.cfi);
          
          // Calcular progresso
          const percentage = newBook.locations.percentageFromCfi(location.start.cfi);
          setProgress(percentage * 100);
        });

        // Gerar localizações para navegação
        await newBook.ready;
        await newBook.locations.generate(1024);

        setIsLoading(false);
      } catch (err) {
        console.error('Erro ao carregar EPUB:', err);
        setError('Erro ao carregar o arquivo EPUB');
        setIsLoading(false);
      }
    };

    initializeEpub();

    // Cleanup
    return () => {
      if (rendition) {
        rendition.destroy();
      }
    };
  }, [epubPath]);

  const goNext = () => {
    if (rendition) {
      rendition.next();
    }
  };

  const goPrev = () => {
    if (rendition) {
      rendition.prev();
    }
  };

  if (error) {
    return (
      <Card className="max-w-4xl mx-auto m-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Erro na Visualização
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
          {onClose && (
            <Button onClick={onClose} variant="outline">
              <Home className="h-4 w-4 mr-2" />
              Voltar
            </Button>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header com título e controles */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              {title || 'Visualizador EPUB'}
            </CardTitle>
            {onClose && (
              <Button onClick={onClose} variant="outline" size="sm">
                <Home className="h-4 w-4 mr-2" />
                Voltar às Rotinas
              </Button>
            )}
          </div>
          
          {/* Barra de progresso */}
          {!isLoading && (
            <div className="space-y-2">
              <Progress value={progress} className="w-full" />
              <p className="text-sm text-muted-foreground">
                Progresso: {Math.round(progress)}%
              </p>
            </div>
          )}
        </CardHeader>
      </Card>

      {/* Área do visualizador */}
      <Card>
        <CardContent className="p-0">
          {isLoading && (
            <div className="flex items-center justify-center h-96">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                <p>Carregando EPUB...</p>
              </div>
            </div>
          )}
          
          <div 
            ref={viewerRef} 
            className={`epub-viewer ${isLoading ? 'hidden' : ''}`}
            style={{ minHeight: '600px' }}
          />
          
          {/* Controles de navegação */}
          {!isLoading && rendition && (
            <div className="flex justify-between items-center p-4 border-t">
              <Button onClick={goPrev} variant="outline" size="sm">
                <ChevronLeft className="h-4 w-4 mr-2" />
                Anterior
              </Button>
              
              <span className="text-sm text-muted-foreground">
                Use as setas do teclado ou clique nos botões para navegar
              </span>
              
              <Button onClick={goNext} variant="outline" size="sm">
                Próxima
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}