import { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { 
  Upload, 
  FileText, 
  CheckCircle, 
  XCircle, 
  Download, 
  Loader2,
  AlertCircle,
  Trash2,
  Eye,
  RefreshCw
} from "lucide-react";
import { Link } from "wouter";

interface ConversionJob {
  id: string;
  status: string;
  method: string;
  totalFiles: string;
  processedFiles: string;
  results?: {
    successful: number;
    failed: number;
    errors: Array<{ filename: string; error: string }>;
  };
  createdAt: string;
  completedAt?: string;
}

interface Routine {
  id: string;
  title: string;
  author: string;
  category: string;
  originalFilename: string;
  conversionMethod: string;
  createdAt: string;
}

export default function Converter() {
  const [files, setFiles] = useState<File[]>([]);
  const [method, setMethod] = useState<'mammoth' | 'pandoc'>('mammoth');
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Query para buscar jobs de conversão
  const { data: jobs, isLoading: jobsLoading } = useQuery<ConversionJob[]>({
    queryKey: ['/api/convert/jobs'],
    refetchInterval: 5000 // Atualiza a cada 5 segundos
  });

  // Query para buscar rotinas
  const { data: routines, isLoading: routinesLoading } = useQuery<Routine[]>({
    queryKey: ['/api/routines']
  });

  // Mutation para conversão única
  const singleConvertMutation = useMutation({
    mutationFn: async (data: { file: File; method: string }) => {
      const formData = new FormData();
      formData.append('file', data.file);
      formData.append('method', data.method);
      
      const response = await fetch('/api/convert/single', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Erro na conversão');
      }
      
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Conversão concluída",
        description: "Arquivo convertido com sucesso!"
      });
      setFiles([]);
      queryClient.invalidateQueries({ queryKey: ['/api/routines'] });
      queryClient.invalidateQueries({ queryKey: ['/api/convert/jobs'] });
    },
    onError: (error: Error) => {
      toast({
        title: "Erro na conversão",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  // Mutation para conversão em lote
  const batchConvertMutation = useMutation({
    mutationFn: async (data: { files: File[]; method: string }) => {
      const formData = new FormData();
      data.files.forEach(file => {
        formData.append('files', file);
      });
      formData.append('method', data.method);
      
      const response = await fetch('/api/convert/batch', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Erro na conversão em lote');
      }
      
      return response.json();
    },
    onSuccess: (data) => {
      const { summary } = data;
      toast({
        title: "Conversão em lote concluída",
        description: `${summary.successful} arquivos convertidos com sucesso, ${summary.failed} com erro.`
      });
      setFiles([]);
      queryClient.invalidateQueries({ queryKey: ['/api/routines'] });
      queryClient.invalidateQueries({ queryKey: ['/api/convert/jobs'] });
    },
    onError: (error: Error) => {
      toast({
        title: "Erro na conversão em lote",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  // Mutation para deletar rotina
  const deleteRoutineMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/routines/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Erro ao deletar rotina');
      }
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Rotina deletada",
        description: "A rotina foi removida com sucesso."
      });
      queryClient.invalidateQueries({ queryKey: ['/api/routines'] });
    },
    onError: (error: Error) => {
      toast({
        title: "Erro ao deletar",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files).filter(
      file => file.name.toLowerCase().endsWith('.docx')
    );
    
    if (droppedFiles.length === 0) {
      toast({
        title: "Arquivo inválido",
        description: "Apenas arquivos .docx são aceitos",
        variant: "destructive"
      });
      return;
    }
    
    setFiles(prev => [...prev, ...droppedFiles]);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setFiles(prev => [...prev, ...selectedFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleConvert = () => {
    if (files.length === 0) {
      toast({
        title: "Nenhum arquivo selecionado",
        description: "Selecione pelo menos um arquivo DOCX",
        variant: "destructive"
      });
      return;
    }

    if (files.length === 1) {
      singleConvertMutation.mutate({ file: files[0], method });
    } else {
      batchConvertMutation.mutate({ files, method });
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const isConverting = singleConvertMutation.isPending || batchConvertMutation.isPending;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-rose-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Conversor de Documentos DOCX
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Converta arquivos DOCX para HTML usando Mammoth.js ou Pandoc
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upload Section */}
          <div className="lg:col-span-2">
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  Upload de Arquivos
                </CardTitle>
                <CardDescription>
                  Selecione arquivos DOCX para conversão
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Método de conversão */}
                <div className="space-y-3">
                  <Label>Método de Conversão</Label>
                  <RadioGroup value={method} onValueChange={(value: 'mammoth' | 'pandoc') => setMethod(value)}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="mammoth" id="mammoth" />
                      <Label htmlFor="mammoth" className="cursor-pointer">
                        Mammoth.js (Recomendado para formatação simples)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="pandoc" id="pandoc" />
                      <Label htmlFor="pandoc" className="cursor-pointer">
                        Pandoc (Melhor para documentos complexos)
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Área de upload */}
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                    dragActive 
                      ? 'border-blue-400 bg-blue-50 dark:bg-blue-950' 
                      : 'border-gray-300 dark:border-gray-600'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-600 dark:text-gray-300 mb-2">
                    Arraste arquivos DOCX aqui ou clique para selecionar
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept=".docx"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  <Button 
                    variant="outline" 
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isConverting}
                  >
                    Selecionar Arquivos
                  </Button>
                </div>

                {/* Lista de arquivos */}
                {files.length > 0 && (
                  <div className="space-y-2">
                    <Label>Arquivos Selecionados ({files.length})</Label>
                    <ScrollArea className="h-40 border rounded p-2">
                      {files.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded">
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-blue-500" />
                            <div>
                              <p className="text-sm font-medium">{file.name}</p>
                              <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFile(index)}
                            disabled={isConverting}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </ScrollArea>
                  </div>
                )}

                {/* Botão de conversão */}
                <Button 
                  onClick={handleConvert} 
                  disabled={files.length === 0 || isConverting}
                  className="w-full"
                  size="lg"
                >
                  {isConverting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Convertendo...
                    </>
                  ) : (
                    `Converter ${files.length} arquivo${files.length !== 1 ? 's' : ''}`
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Jobs e Status */}
          <div className="space-y-6">
            {/* Jobs recentes */}
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <RefreshCw className="w-5 h-5" />
                    Jobs Recentes
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => queryClient.invalidateQueries({ queryKey: ['/api/convert/jobs'] })}
                  >
                    <RefreshCw className="w-4 h-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {jobsLoading ? (
                  <div className="flex items-center justify-center py-4">
                    <Loader2 className="w-6 h-6 animate-spin" />
                  </div>
                ) : jobs && jobs.length > 0 ? (
                  <div className="space-y-3">
                    {jobs.slice(0, 5).map((job) => (
                      <div key={job.id} className="border rounded p-3 space-y-2">
                        <div className="flex items-center justify-between">
                          <Badge variant={job.status === 'completed' ? 'default' : 'secondary'}>
                            {job.status}
                          </Badge>
                          <span className="text-xs text-gray-500">
                            {job.method}
                          </span>
                        </div>
                        <div className="text-sm">
                          {job.processedFiles}/{job.totalFiles} arquivos
                        </div>
                        {job.status === 'processing' && (
                          <Progress 
                            value={(parseInt(job.processedFiles) / parseInt(job.totalFiles)) * 100} 
                            className="h-2"
                          />
                        )}
                        {job.results && (
                          <div className="flex gap-2 text-xs">
                            <span className="text-green-600 flex items-center gap-1">
                              <CheckCircle className="w-3 h-3" />
                              {job.results.successful}
                            </span>
                            <span className="text-red-600 flex items-center gap-1">
                              <XCircle className="w-3 h-3" />
                              {job.results.failed}
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-gray-500 py-4">
                    Nenhum job encontrado
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Rotinas Convertidas */}
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Rotinas Convertidas ({routines?.length || 0})
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => queryClient.invalidateQueries({ queryKey: ['/api/routines'] })}
              >
                <RefreshCw className="w-4 h-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {routinesLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-8 h-8 animate-spin" />
              </div>
            ) : routines && routines.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {routines.map((routine) => (
                  <div key={routine.id} className="border rounded-lg p-4 space-y-3">
                    <div>
                      <h3 className="font-medium text-sm">{routine.title}</h3>
                      <p className="text-xs text-gray-500">{routine.category}</p>
                    </div>
                    
                    <div className="space-y-1 text-xs text-gray-600">
                      <div>Autor: {routine.author}</div>
                      <div>Método: {routine.conversionMethod}</div>
                      <div>Arquivo: {routine.originalFilename}</div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="flex-1"
                      >
                        <Link href={`/routine/${routine.id}`}>
                          <Eye className="w-3 h-3 mr-1" />
                          Ver
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteRoutineMutation.mutate(routine.id)}
                        disabled={deleteRoutineMutation.isPending}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <FileText className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-500 mb-2">Nenhuma rotina convertida ainda</p>
                <p className="text-sm text-gray-400">
                  Faça upload de arquivos DOCX para começar
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}