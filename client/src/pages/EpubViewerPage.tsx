import { useRoute } from 'wouter';
import { EpubViewer } from '@/components/EpubViewer';
import { useLocation } from 'wouter';

export function EpubViewerPage() {
  const [, params] = useRoute('/epub/:filename*');
  const [, setLocation] = useLocation();
  
  if (!params?.['filename*']) {
    return (
      <div className="container mx-auto p-6">
        <h1>Arquivo não encontrado</h1>
      </div>
    );
  }

  const epubPath = `/public-objects/Rotinas/${decodeURIComponent(params['filename*'])}`;
  const title = decodeURIComponent(params['filename*']).replace('.epub', '');

  return (
    <EpubViewer
      epubPath={epubPath}
      title={title}
      onClose={() => setLocation('/routines')}
    />
  );
}