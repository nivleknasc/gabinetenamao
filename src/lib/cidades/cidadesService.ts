/**
 * Serviço para buscar cidades por estado usando a API do IBGE
 */

export interface Cidade {
  id: number;
  nome: string;
}

/**
 * Cache de cidades por UF para evitar múltiplas requisições
 */
const cidadesCache: Record<string, Cidade[]> = {};

/**
 * Busca a lista de cidades de um estado
 * @param uf Sigla do estado (UF)
 * @returns Array com as cidades do estado
 */
export async function buscarCidadesPorEstado(uf: string): Promise<Cidade[]> {
  // Verificar se já temos as cidades em cache
  if (cidadesCache[uf]) {
    return cidadesCache[uf];
  }
  
  try {
    const response = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`);
    const data = await response.json();
    
    // Mapear os dados para o formato da aplicação
    const cidades = data.map((cidade: any) => ({
      id: cidade.id,
      nome: cidade.nome
    }));
    
    // Armazenar em cache
    cidadesCache[uf] = cidades;
    
    return cidades;
  } catch (error) {
    console.error(`Erro ao buscar cidades do estado ${uf}:`, error);
    return [];
  }
}
