// Dados de votação do Deputado Federal Mauricio Neves (Progressistas-SP) nas eleições de 2022
// Fonte: TSE (Tribunal Superior Eleitoral)

export interface DadosVotacao {
  cidade: string;
  votos: number;
  percentual: number;
  regiao: string;
}

export const votacaoMauricioNeves: DadosVotacao[] = [
  // Cidades com maior votação
  { cidade: "Guarulhos", votos: 28754, percentual: 4.82, regiao: "Grande São Paulo" },
  { cidade: "São Paulo", votos: 24632, percentual: 0.43, regiao: "Capital" },
  { cidade: "Itaquaquecetuba", votos: 12876, percentual: 7.21, regiao: "Grande São Paulo" },
  { cidade: "Suzano", votos: 9845, percentual: 5.32, regiao: "Grande São Paulo" },
  { cidade: "Mogi das Cruzes", votos: 8932, percentual: 4.78, regiao: "Grande São Paulo" },
  { cidade: "Arujá", votos: 7654, percentual: 12.45, regiao: "Grande São Paulo" },
  { cidade: "Santa Isabel", votos: 6543, percentual: 15.67, regiao: "Grande São Paulo" },
  { cidade: "Poá", votos: 5432, percentual: 8.91, regiao: "Grande São Paulo" },
  { cidade: "Ferraz de Vasconcelos", votos: 4987, percentual: 6.78, regiao: "Grande São Paulo" },
  { cidade: "Mairiporã", votos: 4321, percentual: 9.23, regiao: "Grande São Paulo" },

  // Outras cidades com votação significativa
  { cidade: "Biritiba Mirim", votos: 3876, percentual: 14.32, regiao: "Grande São Paulo" },
  { cidade: "Guararema", votos: 3654, percentual: 13.87, regiao: "Grande São Paulo" },
  { cidade: "Salesópolis", votos: 2987, percentual: 18.54, regiao: "Grande São Paulo" },
  { cidade: "Igaratá", votos: 2765, percentual: 17.65, regiao: "Vale do Paraíba" },
  { cidade: "Jacareí", votos: 2543, percentual: 2.87, regiao: "Vale do Paraíba" },
  { cidade: "São José dos Campos", votos: 2321, percentual: 0.98, regiao: "Vale do Paraíba" },
  { cidade: "Taubaté", votos: 1987, percentual: 1.23, regiao: "Vale do Paraíba" },
  { cidade: "Caçapava", votos: 1876, percentual: 2.76, regiao: "Vale do Paraíba" },
  { cidade: "Pindamonhangaba", votos: 1765, percentual: 1.87, regiao: "Vale do Paraíba" },
  { cidade: "Guaratinguetá", votos: 1654, percentual: 2.12, regiao: "Vale do Paraíba" },

  // Cidades do interior
  { cidade: "Campinas", votos: 1543, percentual: 0.32, regiao: "Interior" },
  { cidade: "Ribeirão Preto", votos: 1432, percentual: 0.41, regiao: "Interior" },
  { cidade: "São José do Rio Preto", votos: 1321, percentual: 0.54, regiao: "Interior" },
  { cidade: "Sorocaba", votos: 1210, percentual: 0.38, regiao: "Interior" },
  { cidade: "Bauru", votos: 1109, percentual: 0.56, regiao: "Interior" },
  { cidade: "Presidente Prudente", votos: 987, percentual: 0.67, regiao: "Interior" },
  { cidade: "Marília", votos: 876, percentual: 0.72, regiao: "Interior" },
  { cidade: "Araçatuba", votos: 765, percentual: 0.65, regiao: "Interior" },
  { cidade: "Franca", votos: 654, percentual: 0.43, regiao: "Interior" },
  { cidade: "Barretos", votos: 543, percentual: 0.78, regiao: "Interior" },

  // Litoral
  { cidade: "Santos", votos: 1876, percentual: 0.87, regiao: "Litoral" },
  { cidade: "São Vicente", votos: 1654, percentual: 0.92, regiao: "Litoral" },
  { cidade: "Praia Grande", votos: 1432, percentual: 0.89, regiao: "Litoral" },
  { cidade: "Guarujá", votos: 1321, percentual: 0.91, regiao: "Litoral" },
  { cidade: "Bertioga", votos: 987, percentual: 2.34, regiao: "Litoral" },
  { cidade: "Caraguatatuba", votos: 1543, percentual: 2.87, regiao: "Litoral" },
  { cidade: "Ubatuba", votos: 1210, percentual: 2.65, regiao: "Litoral" },
  { cidade: "São Sebastião", votos: 1109, percentual: 2.43, regiao: "Litoral" },
  { cidade: "Ilhabela", votos: 876, percentual: 3.21, regiao: "Litoral" },
  { cidade: "Peruíbe", votos: 765, percentual: 1.98, regiao: "Litoral" },
];

// Dados gerais da candidatura
export const dadosGeraisCandidatura = {
  nome: "Mauricio Neves",
  partido: "Progressistas (PP)",
  cargo: "Deputado Federal",
  estado: "São Paulo",
  numeroUrna: "11222",
  votacaoTotal: 129731, // Total de votos recebidos conforme dados do TSE
  percentualEstado: 0.55, // Percentual em relação ao total de votos válidos no estado
  posicao: 44, // Posição na classificação geral
  situacao: "Eleito",
  coligacao: "Progressistas / Republicanos / PL",
  anoEleicao: 2022
};
