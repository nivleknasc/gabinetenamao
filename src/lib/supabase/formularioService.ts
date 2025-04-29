import { supabase } from './supabaseClient';
import { Formulario } from './client';

// Mapeamento entre os nomes dos campos no código e no banco de dados
const dbFieldMapping = {
  imagemUrl: 'imagem_url',
  publicUrl: 'public_url',
};

/**
 * Serviço para gerenciar formulários no Supabase
 */

/**
 * Obtém todos os formulários
 */
export async function getFormularios(): Promise<Formulario[]> {
  try {
    const { data, error } = await supabase
      .from('formularios')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Erro ao buscar formulários:', error);
      return [];
    }

    // Mapear os campos do banco de dados para os campos do código
    return (data || []).map(item => ({
      id: item.id,
      nome: item.nome,
      descricao: item.descricao,
      campos: item.campos,
      imagemUrl: item.imagem_url,
      publicUrl: item.public_url,
      created_at: item.created_at,
      aparencia: item.aparencia
    }));
  } catch (error) {
    console.error('Erro ao buscar formulários:', error);
    return [];
  }
}

/**
 * Obtém um formulário pelo ID
 */
export async function getFormularioById(id: string): Promise<Formulario | null> {
  try {
    const { data, error } = await supabase
      .from('formularios')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error(`Erro ao buscar formulário ${id}:`, error);
      return null;
    }

    if (data) {
      // Mapear os campos do banco de dados para os campos do código
      return {
        id: data.id,
        nome: data.nome,
        descricao: data.descricao,
        campos: data.campos,
        imagemUrl: data.imagem_url,
        publicUrl: data.public_url,
        created_at: data.created_at,
        aparencia: data.aparencia
      };
    }

    return null;
  } catch (error) {
    console.error(`Erro ao buscar formulário ${id}:`, error);
    return null;
  }
}

/**
 * Cria um novo formulário
 */
export async function createFormulario(formulario: Omit<Formulario, 'id'>): Promise<Formulario | null> {
  try {
    // Gerar um ID único para o formulário
    const id = `form_${Date.now()}`;

    // Mapear os campos do código para os campos do banco de dados
    const newFormulario = {
      id,
      nome: formulario.nome,
      descricao: formulario.descricao,
      campos: formulario.campos,
      imagem_url: formulario.imagemUrl,
      public_url: formulario.publicUrl,
      aparencia: formulario.aparencia,
      created_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from('formularios')
      .insert([newFormulario])
      .select()
      .single();

    if (error) {
      console.error('Erro ao criar formulário:', error);
      return null;
    }

    // Mapear de volta para o formato do código
    if (data) {
      return {
        id: data.id,
        nome: data.nome,
        descricao: data.descricao,
        campos: data.campos,
        imagemUrl: data.imagem_url,
        publicUrl: data.public_url,
        created_at: data.created_at,
        aparencia: data.aparencia
      };
    }

    return null;
  } catch (error) {
    console.error('Erro ao criar formulário:', error);
    return null;
  }
}

/**
 * Atualiza um formulário existente
 */
export async function updateFormulario(id: string, formulario: Partial<Formulario>): Promise<Formulario | null> {
  try {
    // Mapear os campos do código para os campos do banco de dados
    const updateData: any = {};

    if (formulario.nome !== undefined) updateData.nome = formulario.nome;
    if (formulario.descricao !== undefined) updateData.descricao = formulario.descricao;
    if (formulario.campos !== undefined) updateData.campos = formulario.campos;
    if (formulario.imagemUrl !== undefined) updateData.imagem_url = formulario.imagemUrl;
    if (formulario.publicUrl !== undefined) updateData.public_url = formulario.publicUrl;
    if (formulario.aparencia !== undefined) updateData.aparencia = formulario.aparencia;

    const { data, error } = await supabase
      .from('formularios')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error(`Erro ao atualizar formulário ${id}:`, error);
      return null;
    }

    if (data) {
      // Mapear de volta para o formato do código
      return {
        id: data.id,
        nome: data.nome,
        descricao: data.descricao,
        campos: data.campos,
        imagemUrl: data.imagem_url,
        publicUrl: data.public_url,
        created_at: data.created_at,
        aparencia: data.aparencia
      };
    }

    return null;
  } catch (error) {
    console.error(`Erro ao atualizar formulário ${id}:`, error);
    return null;
  }
}

/**
 * Exclui um formulário
 */
export async function deleteFormulario(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('formularios')
      .delete()
      .eq('id', id);

    if (error) {
      console.error(`Erro ao excluir formulário ${id}:`, error);
      return false;
    }

    return true;
  } catch (error) {
    console.error(`Erro ao excluir formulário ${id}:`, error);
    return false;
  }
}

/**
 * Inicializa o banco de dados com dados de exemplo
 */
export async function initializeDatabase(): Promise<void> {
  try {
    // Verificar se já existem formulários
    const { count, error: countError } = await supabase
      .from('formularios')
      .select('*', { count: 'exact', head: true });

    if (countError) {
      console.error('Erro ao verificar formulários existentes:', countError);
      return;
    }

    // Se já existirem formulários, não inicializar
    if (count && count > 0) {
      return;
    }

    // Dados de exemplo para demonstração
    const mockFormularios = [
      {
        id: 'form_example_1',
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
        imagem_url: 'https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop',
        public_url: 'https://forms.gabinetemao.com.br/f/1',
        created_at: new Date().toISOString(),
        aparencia: {
          mostrarCabecalho: true,
          mostrarDescricaoInicio: true,
          mostrarDescricaoFim: false,
          corFundo: '#ffffff',
          corTexto: '#000000',
          corBotao: '#22c55e',
          fundoEscuro: false,
        },
      },
      {
        id: 'form_example_2',
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
        imagem_url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop',
        public_url: 'https://forms.gabinetemao.com.br/f/2',
        created_at: new Date().toISOString(),
        aparencia: {
          mostrarCabecalho: true,
          mostrarDescricaoInicio: true,
          mostrarDescricaoFim: false,
          corFundo: '#ffffff',
          corTexto: '#000000',
          corBotao: '#3b82f6',
          fundoEscuro: false,
        },
      },
    ];

    // Inserir dados de exemplo
    const { error: insertError } = await supabase
      .from('formularios')
      .insert(mockFormularios);

    if (insertError) {
      console.error('Erro ao inserir dados de exemplo:', insertError);
    }
  } catch (error) {
    console.error('Erro ao inicializar banco de dados:', error);
  }
}
