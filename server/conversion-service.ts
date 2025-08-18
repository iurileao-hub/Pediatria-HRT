import mammoth from "mammoth";
import { exec } from "child_process";
import { promisify } from "util";
import { writeFile, readFile, unlink } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

const execAsync = promisify(exec);

export interface ConversionResult {
  success: boolean;
  htmlContent?: string;
  error?: string;
  method: 'mammoth' | 'pandoc';
  filename: string;
}

export class DocumentConverter {
  private tempDir = '/tmp';

  async convertWithMammoth(buffer: Buffer, filename: string): Promise<ConversionResult> {
    try {
      const result = await mammoth.convertToHtml({ buffer });
      
      return {
        success: true,
        htmlContent: result.value,
        method: 'mammoth',
        filename
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro desconhecido no Mammoth',
        method: 'mammoth',
        filename
      };
    }
  }

  async convertWithPandoc(buffer: Buffer, filename: string): Promise<ConversionResult> {
    const tempId = randomUUID();
    const inputPath = path.join(this.tempDir, `${tempId}.docx`);
    const outputPath = path.join(this.tempDir, `${tempId}.html`);

    try {
      // Salva o arquivo temporário
      await writeFile(inputPath, buffer);

      // Executa o Pandoc
      const command = `pandoc "${inputPath}" -t html --extract-media="${this.tempDir}" -o "${outputPath}"`;
      await execAsync(command);

      // Lê o resultado
      const htmlContent = await readFile(outputPath, 'utf-8');

      // Limpa arquivos temporários
      await Promise.all([
        unlink(inputPath).catch(() => {}),
        unlink(outputPath).catch(() => {})
      ]);

      return {
        success: true,
        htmlContent,
        method: 'pandoc',
        filename
      };
    } catch (error) {
      // Limpa arquivos temporários em caso de erro
      await Promise.all([
        unlink(inputPath).catch(() => {}),
        unlink(outputPath).catch(() => {})
      ]);

      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro desconhecido no Pandoc',
        method: 'pandoc',
        filename
      };
    }
  }

  async convertDocument(
    buffer: Buffer, 
    filename: string, 
    method: 'mammoth' | 'pandoc' = 'mammoth'
  ): Promise<ConversionResult> {
    if (method === 'mammoth') {
      return this.convertWithMammoth(buffer, filename);
    } else {
      return this.convertWithPandoc(buffer, filename);
    }
  }

  async convertBatch(
    files: Array<{ buffer: Buffer; filename: string }>,
    method: 'mammoth' | 'pandoc' = 'mammoth',
    onProgress?: (processed: number, total: number) => void
  ): Promise<ConversionResult[]> {
    const results: ConversionResult[] = [];
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const result = await this.convertDocument(file.buffer, file.filename, method);
      results.push(result);
      
      if (onProgress) {
        onProgress(i + 1, files.length);
      }
    }
    
    return results;
  }

  // Método para extrair metadados básicos do título
  extractMetadataFromFilename(filename: string) {
    // Remove extensão
    const nameWithoutExt = filename.replace(/\.(docx?|doc)$/i, '');
    
    // Tenta extrair informações do nome do arquivo
    const parts = nameWithoutExt.split(/[-_\s]+/);
    
    return {
      title: nameWithoutExt.replace(/[-_]/g, ' ').trim(),
      category: parts.length > 1 ? parts[0] : 'Geral',
      author: 'HRT', // Valor padrão
      originalFilename: filename
    };
  }
}

export const documentConverter = new DocumentConverter();