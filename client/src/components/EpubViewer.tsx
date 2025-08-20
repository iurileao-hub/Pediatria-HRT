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

        console.log('Iniciando carregamento do EPUB:', epubPath);
        
        // Verificar se o arquivo existe
        const checkResponse = await fetch(epubPath, { method: 'HEAD' });
        if (!checkResponse.ok) {
          throw new Error(`Arquivo não encontrado: ${checkResponse.status}`);
        }

        // Criar o livro com configurações básicas
        const newBook = ePub(epubPath);
        setBook(newBook);

        // Aguardar o livro estar pronto
        await newBook.ready;
        
        console.log('Livro pronto. Metadados:', {
          title: newBook.packaging?.metadata?.title,
          creator: newBook.packaging?.metadata?.creator,
          spine: newBook.spine?.length
        });

        // Renderizar com configurações explícitas
        const newRendition = newBook.renderTo(viewerRef.current!, {
          width: '100%',
          height: '600px',
          spread: 'none'
        });

        setRendition(newRendition);

        // Configurar eventos primeiro
        newRendition.on('displayed', (section: any) => {
          console.log('Seção exibida:', section.href, section);
          
          // Debug: tentar inspecionar o conteúdo
          setTimeout(() => {
            const iframe = viewerRef.current?.querySelector('iframe');
            console.log('Iframe encontrado:', !!iframe);
            
            if (iframe) {
              console.log('Iframe src:', iframe.src);
              console.log('Iframe dimensions:', iframe.offsetWidth, 'x', iframe.offsetHeight);
              
              // Forçar altura do iframe se estiver com altura zero
              if (iframe.offsetHeight === 0) {
                console.log('Iframe com altura zero, forçando altura');
                iframe.style.height = '600px !important';
                iframe.style.minHeight = '600px !important';
                iframe.style.display = 'block !important';
                iframe.style.width = '100% !important';
                
                // Aguardar um pouco e verificar novamente
                setTimeout(() => {
                  console.log('Verificando altura após forçar:', iframe.offsetHeight);
                  if (iframe.offsetHeight === 0) {
                    // Tentar recriar o rendition
                    console.log('Ainda com altura zero, tentando resize manual');
                    newRendition.resize('100%', '600px');
                  }
                }, 500);
              }
              
              try {
                const doc = iframe.contentDocument || iframe.contentWindow?.document;
                if (doc) {
                  console.log('Document acessível');
                  console.log('Body innerHTML length:', doc.body?.innerHTML?.length || 0);
                  console.log('Body textContent length:', doc.body?.textContent?.length || 0);
                  
                  // Aplicar estilos mais agressivos
                  const style = doc.createElement('style');
                  style.innerHTML = `
                    * { 
                      color: #000000 !important; 
                      background: #ffffff !important;
                      visibility: visible !important;
                      display: block !important;
                    }
                    body { 
                      color: #000000 !important; 
                      background: #ffffff !important; 
                      font-family: Arial, sans-serif !important;
                      font-size: 18px !important;
                      padding: 20px !important;
                      margin: 0 !important;
                      min-height: 100vh !important;
                    }
                    p, div, span, h1, h2, h3, h4, h5, h6 {
                      color: #000000 !important;
                      display: block !important;
                      visibility: visible !important;
                    }
                    p {
                      margin: 15px 0 !important;
                      line-height: 1.6 !important;
                    }
                  `;
                  doc.head.appendChild(style);
                  
                  // Forçar texto para debug se necessário
                  if (doc.body && doc.body.textContent?.length === 0) {
                    console.log('Body vazio, tentando forçar conteúdo de debug');
                    const debugDiv = doc.createElement('div');
                    debugDiv.innerHTML = '<h1>Teste de Renderização</h1><p>Se você vê isto, o iframe está funcionando mas o conteúdo EPUB não está carregando.</p>';
                    debugDiv.style.cssText = 'color: red !important; font-size: 20px !important; padding: 20px !important;';
                    doc.body.appendChild(debugDiv);
                  }
                  
                  console.log('CSS aplicado diretamente no iframe');
                } else {
                  console.log('Não foi possível acessar documento do iframe');
                }
              } catch (e) {
                console.log('Cross-origin restriction no iframe:', e);
              }
            }
            
            // Método alternativo: usar sistema de temas do ePub.js
            try {
              newRendition.themes.default({
                'html': { 'background': '#ffffff !important' },
                'body': {
                  'color': '#000000 !important',
                  'background-color': '#ffffff !important',
                  'font-family': 'Arial, sans-serif !important',
                  'font-size': '18px !important',
                  'line-height': '1.6 !important',
                  'padding': '30px !important',
                  'margin': '0 !important'
                },
                'p': {
                  'color': '#000000 !important',
                  'margin': '15px 0 !important'
                },
                'div': { 'color': '#000000 !important' },
                'span': { 'color': '#000000 !important' },
                'h1, h2, h3, h4, h5, h6': { 'color': '#000000 !important' }
              });
              console.log('Tema aplicado via ePub.js');
            } catch (e) {
              console.error('Erro ao aplicar tema:', e);
            }
          }, 500);
        });

        newRendition.on('relocated', (location: any) => {
          console.log('Relocated event:', location);
          setCurrentLocation(location.start.cfi);
          
          // Calcular progresso básico
          if (newBook.spine && newBook.spine.length > 0) {
            try {
              if (newBook.locations && newBook.locations.length > 0) {
                const percentage = newBook.locations.percentageFromCfi(location.start.cfi);
                console.log('Progresso via locations:', percentage * 100);
                setProgress(percentage * 100);
              } else {
                // Fallback: usar posição na spine
                const currentSpine = newBook.spine.get(location.start.cfi);
                if (currentSpine) {
                  const percentage = (currentSpine.index / newBook.spine.length) * 100;
                  console.log('Progresso via spine:', percentage);
                  setProgress(percentage);
                } else {
                  // Fallback ainda mais básico - incrementar/decrementar manualmente
                  console.log('Usando fallback de progresso manual');
                }
              }
            } catch (e) {
              console.log('Erro ao calcular progresso:', e);
            }
          }
        });

        // Exibir primeira página
        await newRendition.display();
        
        // Tentar gerar localizações para progresso mais preciso
        try {
          await newBook.locations.generate(1024);
          console.log('Localizações geradas:', newBook.locations.length);
        } catch (e) {
          console.log('Não foi possível gerar localizações:', e);
        }

        console.log('EPUB carregado com sucesso');
        setIsLoading(false);

      } catch (err) {
        console.error('Erro ao carregar EPUB:', err);
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
        setIsLoading(false);
      }
    };

    initializeEpub();

    // Cleanup
    return () => {
      if (rendition) {
        rendition.destroy();
      }
      if (book) {
        book.destroy();
      }
    };
  }, [epubPath]);

  const nextPage = () => {
    if (rendition) {
      rendition.next();
    }
  };

  const prevPage = () => {
    if (rendition) {
      rendition.prev();
    }
  };

  if (error) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-600">
            <BookOpen className="h-5 w-5" />
            Erro ao carregar EPUB
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-600 mb-4">{error}</p>
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
    <div className="w-full max-w-6xl mx-auto p-4 space-y-4">
      {/* Header */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              {title || 'Visualizador EPUB'}
            </CardTitle>
            {onClose && (
              <Button onClick={onClose} variant="outline" size="sm">
                <Home className="h-4 w-4 mr-2" />
                Voltar
              </Button>
            )}
          </div>
          
          {/* Progress bar */}
          <div className="space-y-2">
            <Progress value={progress} className="w-full" />
            <p className="text-sm text-muted-foreground">
              Progresso: {Math.round(progress)}%
            </p>
          </div>
        </CardHeader>
      </Card>

      {/* Controls */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-center gap-4">
            <Button 
              onClick={prevPage} 
              variant="outline" 
              disabled={isLoading}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Página Anterior
            </Button>
            
            <Button 
              onClick={nextPage} 
              variant="outline" 
              disabled={isLoading}
              className="flex items-center gap-2"
            >
              Próxima Página
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Viewer */}
      <Card>
        <CardContent className="p-0">
          {isLoading && (
            <div className="flex items-center justify-center p-8">
              <div className="text-center space-y-2">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                <p className="text-sm text-muted-foreground">Carregando EPUB...</p>
              </div>
            </div>
          )}
          
          <div 
            ref={viewerRef} 
            className={`epub-viewer ${isLoading ? 'hidden' : ''}`}
            style={{ 
              height: '600px',
              minHeight: '600px',
              width: '100%',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              overflow: 'hidden',
              backgroundColor: '#ffffff',
              display: 'block'
            }}
          />
        </CardContent>
      </Card>

      {/* Debug info */}
      {!isLoading && (
        <Card>
          <CardContent className="pt-6">
            <div className="text-xs text-muted-foreground space-y-1">
              <p>URL do EPUB: {epubPath}</p>
              <p>Status: {book ? 'Livro carregado' : 'Aguardando'}</p>
              <p>Renderização: {rendition ? 'Ativa' : 'Inativa'}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}