/**
 * Serviço para armazenar formulários localmente usando localStorage
 */
import { Formulario } from '@/lib/supabase/client';

const STORAGE_KEY = 'gabinetenamao_formularios';

/**
 * Obtém todos os formulários armazenados
 */
export function getFormularios(): Formulario[] {
  if (typeof window === 'undefined') {
    return [];
  }
  
  try {
    const storedData = localStorage.getItem(STORAGE_KEY);
    if (!storedData) {
      return [];
    }
    
    return JSON.parse(storedData);
  } catch (error) {
    console.error('Erro ao obter formulários do localStorage:', error);
    return [];
  }
}

/**
 * Salva um novo formulário
 */
export function saveFormulario(formulario: Formulario): Formulario {
  if (typeof window === 'undefined') {
    return formulario;
  }
  
  try {
    const formularios = getFormularios();
    formularios.push(formulario);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formularios));
    return formulario;
  } catch (error) {
    console.error('Erro ao salvar formulário no localStorage:', error);
    return formulario;
  }
}

/**
 * Exclui um formulário pelo ID
 */
export function deleteFormulario(id: string): boolean {
  if (typeof window === 'undefined') {
    return false;
  }
  
  try {
    const formularios = getFormularios();
    const newFormularios = formularios.filter(form => form.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newFormularios));
    return true;
  } catch (error) {
    console.error('Erro ao excluir formulário do localStorage:', error);
    return false;
  }
}

/**
 * Obtém um formulário pelo ID
 */
export function getFormularioById(id: string): Formulario | null {
  if (typeof window === 'undefined') {
    return null;
  }
  
  try {
    const formularios = getFormularios();
    return formularios.find(form => form.id === id) || null;
  } catch (error) {
    console.error('Erro ao obter formulário do localStorage:', error);
    return null;
  }
}

/**
 * Inicializa o armazenamento com dados de exemplo se estiver vazio
 */
export function initializeStorage(): void {
  if (typeof window === 'undefined') {
    return;
  }
  
  try {
    const formularios = getFormularios();
    
    // Se já existirem formulários, não inicializar
    if (formularios.length > 0) {
      return;
    }
    
    // Dados de exemplo para demonstração
    const mockFormularios: Formulario[] = [
      {
        id: '1',
        nome: 'Formulário de Contato',
        descricao: 'Formulário para captação de leads interessados em nossos produtos',
        campos: [
          {
            id: 'campo_1',
            nome: 'Nome',
            tipo: 'texto',
            obrigatorio: true,
          },
          {
            id: 'campo_2',
            nome: 'Email',
            tipo: 'email',
            obrigatorio: true,
          },
          {
            id: 'campo_3',
            nome: 'Telefone',
            tipo: 'telefone',
            obrigatorio: true,
          },
          {
            id: 'campo_4',
            nome: 'Cidade',
            tipo: 'texto',
            obrigatorio: true,
          },
          {
            id: 'campo_5',
            nome: 'Estado',
            tipo: 'select',
            obrigatorio: true,
            opcoes: ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'],
          },
        ],
        imagemUrl: 'https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop',
        publicUrl: 'https://forms.gabinetemao.com.br/f/1',
        created_at: new Date().toISOString(),
      },
      {
        id: '2',
        nome: 'Pesquisa de Satisfação',
        descricao: 'Formulário para avaliar a satisfação dos clientes',
        campos: [
          {
            id: 'campo_1',
            nome: 'Nome',
            tipo: 'texto',
            obrigatorio: true,
          },
          {
            id: 'campo_2',
            nome: 'Email',
            tipo: 'email',
            obrigatorio: true,
          },
          {
            id: 'campo_3',
            nome: 'Telefone',
            tipo: 'telefone',
            obrigatorio: false,
          },
          {
            id: 'campo_4',
            nome: 'Cidade',
            tipo: 'texto',
            obrigatorio: true,
          },
          {
            id: 'campo_5',
            nome: 'Estado',
            tipo: 'select',
            obrigatorio: true,
            opcoes: ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'],
          },
          {
            id: 'campo_6',
            nome: 'Avaliação',
            tipo: 'radio',
            obrigatorio: true,
            opcoes: ['Excelente', 'Bom', 'Regular', 'Ruim', 'Péssimo'],
          },
          {
            id: 'campo_7',
            nome: 'Comentários',
            tipo: 'texto',
            obrigatorio: false,
          },
        ],
        imagemUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop',
        publicUrl: 'https://forms.gabinetemao.com.br/f/2',
        created_at: new Date().toISOString(),
      },
    ];
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockFormularios));
  } catch (error) {
    console.error('Erro ao inicializar storage:', error);
  }
}
