/**
 * Serviço para buscar informações de endereço a partir do CEP
 */

interface EnderecoViaCEP {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
  erro?: boolean;
}

export interface Endereco {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
  ddd: string;
}

/**
 * Busca informações de endereço a partir do CEP usando a API ViaCEP
 * @param cep CEP a ser consultado (apenas números ou no formato 00000-000)
 * @returns Objeto com informações do endereço ou null em caso de erro
 */
export async function buscarEnderecoPorCEP(cep: string): Promise<Endereco | null> {
  // Remover caracteres não numéricos
  const cepLimpo = cep.replace(/\D/g, '');
  
  // Verificar se o CEP tem 8 dígitos
  if (cepLimpo.length !== 8) {
    return null;
  }
  
  try {
    const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
    const data: EnderecoViaCEP = await response.json();
    
    // Verificar se a API retornou erro
    if (data.erro) {
      return null;
    }
    
    // Mapear os dados para o formato da aplicação
    return {
      cep: data.cep,
      logradouro: data.logradouro,
      complemento: data.complemento,
      bairro: data.bairro,
      cidade: data.localidade,
      estado: data.uf,
      ddd: data.ddd
    };
  } catch (error) {
    console.error('Erro ao buscar CEP:', error);
    return null;
  }
}
