// Script para gerar leads aleatórios e inserir no Supabase
require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

// Configuração do Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ixnfhbvvlxnwqbvbhzjr.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml4bmZoYnZ2bHhud3FidmJoempyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM5NzI1NzYsImV4cCI6MjAyOTU0ODU3Nn0.Uh9cF_aTZfKcA_8k_1Cr8Tgz9Ggft0FCyHE7GdLKJKc';

console.log('URL do Supabase:', supabaseUrl);
console.log('Chave do Supabase:', supabaseKey);

const supabase = createClient(supabaseUrl, supabaseKey);

// Dados para geração aleatória
const nomes = [
  'Miguel', 'Arthur', 'Gael', 'Théo', 'Heitor', 'Ravi', 'Davi', 'Bernardo', 'Noah', 'Gabriel',
  'Samuel', 'Pedro', 'Anthony', 'Isaac', 'Benício', 'Benjamin', 'Matheus', 'Lucas', 'Joaquim', 'Nicolas',
  'Lucca', 'Lorenzo', 'Henrique', 'João Miguel', 'Rafael', 'Henry', 'Murilo', 'Levi', 'Guilherme', 'Vicente',
  'Felipe', 'Bryan', 'Matteo', 'Bento', 'João Pedro', 'Pietro', 'Leonardo', 'Daniel', 'Gustavo', 'Pedro Henrique',
  'João Lucas', 'Emanuel', 'João', 'Caleb', 'Davi Lucca', 'Antônio', 'Eduardo', 'Enrico', 'Caio', 'José',
  'Helena', 'Alice', 'Laura', 'Maria Alice', 'Sophia', 'Manuela', 'Maitê', 'Liz', 'Cecília', 'Isabella',
  'Luísa', 'Eloá', 'Heloísa', 'Júlia', 'Ayla', 'Maria Luísa', 'Isis', 'Elisa', 'Antonella', 'Valentina',
  'Maria Clara', 'Aurora', 'Maria Cecília', 'Maria Julia', 'Lívia', 'Esther', 'Giovanna', 'Sarah', 'Maria Helena', 'Lorena',
  'Beatriz', 'Rebeca', 'Luna', 'Olívia', 'Maria Eduarda', 'Mariana', 'Melissa', 'Yasmin', 'Isabelly', 'Lavínia',
  'Noa', 'Alícia', 'Clara', 'Ana Clara', 'Marina', 'Stella', 'Jade', 'Maria Liz', 'Ana Luísa', 'Ana Júlia'
];

const sobrenomes = [
  'Silva', 'Santos', 'Oliveira', 'Souza', 'Rodrigues', 'Ferreira', 'Alves', 'Pereira', 'Lima', 'Gomes',
  'Costa', 'Ribeiro', 'Martins', 'Carvalho', 'Almeida', 'Lopes', 'Soares', 'Fernandes', 'Vieira', 'Barbosa',
  'Rocha', 'Dias', 'Nascimento', 'Andrade', 'Moreira', 'Nunes', 'Marques', 'Machado', 'Mendes', 'Freitas',
  'Cardoso', 'Ramos', 'Gonçalves', 'Santana', 'Teixeira', 'Araújo', 'Pinto', 'Camargo', 'Correia', 'Moraes',
  'Garcia', 'Borges', 'Aparecido', 'Pinheiro', 'Monteiro', 'Azevedo', 'Batista', 'Leite', 'Cavalcante', 'Duarte'
];

// Cidades e bairros de São Paulo
const cidadesEBairros = {
  'São Paulo': [
    'Moema', 'Pinheiros', 'Vila Mariana', 'Itaim Bibi', 'Jardins', 'Perdizes', 'Morumbi', 'Tatuapé',
    'Santana', 'Lapa', 'Butantã', 'Ipiranga', 'Saúde', 'Jabaquara', 'Campo Belo', 'Brooklin',
    'Vila Madalena', 'Bela Vista', 'Consolação', 'Liberdade', 'Aclimação', 'Vila Olímpia', 'Cambuci',
    'Brás', 'Mooca', 'Belém', 'Penha', 'Vila Formosa', 'Aricanduva', 'São Mateus', 'Itaquera',
    'Guaianases', 'Cidade Tiradentes', 'São Miguel Paulista', 'Ermelino Matarazzo', 'Vila Curuçá',
    'Itaim Paulista', 'Jardim Helena', 'Sapopemba', 'Vila Prudente', 'São Lucas', 'Água Rasa',
    'Carrão', 'Cidade Líder', 'José Bonifácio', 'Parque do Carmo', 'Iguatemi', 'Lajeado',
    'Jardim Ângela', 'Jardim São Luís', 'Capão Redondo', 'Campo Limpo', 'Vila Andrade',
    'Cidade Dutra', 'Socorro', 'Grajaú', 'Parelheiros', 'Marsilac', 'Pedreira', 'Cidade Ademar',
    'Campo Grande', 'Santo Amaro', 'Jardim Paulista', 'Alto de Pinheiros', 'Jaguaré', 'Vila Leopoldina',
    'Jaguara', 'Pirituba', 'São Domingos', 'Jaraguá', 'Perus', 'Anhanguera', 'Tremembé',
    'Jaçanã', 'Vila Medeiros', 'Vila Maria', 'Vila Guilherme', 'Casa Verde', 'Cachoeirinha',
    'Limão', 'Freguesia do Ó', 'Brasilândia', 'Mandaqui', 'Tucuruvi', 'Vila Sônia', 'Raposo Tavares',
    'Rio Pequeno', 'Vila Matilde', 'Artur Alvim', 'Cangaíba', 'Vila Jacuí', 'Parque São Rafael',
    'São Rafael', 'Jardim Helena', 'Cidade Ademar', 'Pedreira', 'Cursino', 'Sacomã', 'Cidade Dutra',
    'Socorro', 'Grajaú', 'Parelheiros', 'Marsilac', 'Jardim Ângela', 'Jardim São Luís', 'Capão Redondo',
    'Campo Limpo', 'Vila Andrade', 'República', 'Santa Cecília', 'Bom Retiro', 'Sé', 'Barra Funda'
  ],
  'Guarulhos': [
    'Centro', 'Macedo', 'Vila Galvão', 'Taboão', 'Jardim Tranquilidade', 'Gopoúva', 'Vila Augusta',
    'Jardim Maia', 'Jardim Cumbica', 'Pimentas', 'Bonsucesso', 'Lavras', 'Itapegica', 'Cocaia',
    'Cabuçu', 'Jardim Presidente Dutra', 'Jardim São João', 'Jardim Bela Vista', 'Jardim Paraíso',
    'Jardim Acácio', 'Jardim Adriana', 'Jardim Alvorada', 'Jardim Ansalca', 'Jardim Arapongas'
  ],
  'Osasco': [
    'Centro', 'Jardim das Flores', 'Jardim D\'Abril', 'Jardim Piratininga', 'Vila Yara', 'Presidente Altino',
    'Bela Vista', 'Jardim Bussocaba', 'Jardim Veloso', 'Jardim Roberto', 'Jardim Conceição',
    'Jardim Novo Osasco', 'Jardim Rochdale', 'Jardim Padroeira', 'Jardim Baronesa', 'Jardim Belmonte',
    'Jardim Cipava', 'Jardim Elvira', 'Jardim Marieta', 'Jardim Oriental'
  ],
  'Campinas': [
    'Centro', 'Cambuí', 'Taquaral', 'Barão Geraldo', 'Sousas', 'Joaquim Egídio', 'Nova Campinas',
    'Jardim Chapadão', 'Jardim Proença', 'Jardim Flamboyant', 'Jardim Guarani', 'Jardim Aurélia',
    'Jardim Santa Genebra', 'Jardim São Fernando', 'Jardim Eulina', 'Jardim Santana', 'Jardim Primavera',
    'Jardim Campos Elíseos', 'Jardim Bela Vista', 'Jardim São Gabriel'
  ],
  'Santo André': [
    'Centro', 'Jardim', 'Vila Assunção', 'Vila Bastos', 'Vila Gilda', 'Campestre', 'Casa Branca',
    'Jardim Bela Vista', 'Jardim Jamaica', 'Jardim Las Vegas', 'Jardim Milena', 'Jardim Santo Alberto',
    'Jardim Santo Antônio', 'Jardim Stella', 'Parque das Nações', 'Parque Novo Oratório',
    'Santa Maria', 'Santa Teresinha', 'Vila Alpina', 'Vila Guiomar'
  ],
  'São Bernardo do Campo': [
    'Centro', 'Rudge Ramos', 'Assunção', 'Baeta Neves', 'Demarchi', 'Dos Casa', 'Ferrazópolis',
    'Independência', 'Jordanópolis', 'Nova Petrópolis', 'Paulicéia', 'Planalto', 'Santa Terezinha',
    'Taboão', 'Vila Euclides', 'Vila Gonçalves', 'Vila Marchi', 'Vila Mussolini', 'Vila São Pedro',
    'Jardim do Mar'
  ],
  'São Caetano do Sul': [
    'Centro', 'Barcelona', 'Boa Vista', 'Fundação', 'Jardim São Caetano', 'Mauá', 'Nova Gerty',
    'Olímpico', 'Oswaldo Cruz', 'Prosperidade', 'Santa Maria', 'Santa Paula', 'Santo Antônio',
    'São José', 'Cerâmica', 'Jardim', 'São José', 'Vila Gerty', 'Vila Barcelona', 'Vila Paula'
  ],
  'Diadema': [
    'Centro', 'Canhema', 'Casa Grande', 'Conceição', 'Eldorado', 'Inamar', 'Jardim Campanário',
    'Jardim Canhema', 'Jardim Ruyce', 'Piraporinha', 'Serraria', 'Taboão', 'Vila Conceição',
    'Vila Nogueira', 'Vila São José', 'Jardim Promissão', 'Jardim Rosinha', 'Jardim Santa Rita',
    'Jardim Sapopemba', 'Jardim Tamoio'
  ],
  'Mauá': [
    'Centro', 'Jardim Itapeva', 'Jardim Zaíra', 'Parque São Vicente', 'Vila Bocaina', 'Vila Magini',
    'Vila Santa Cecília', 'Vila Vitória', 'Jardim Camila', 'Jardim Estrela', 'Jardim Feital',
    'Jardim Guapituba', 'Jardim Haydee', 'Jardim Itapark', 'Jardim Mauá', 'Jardim Oratório',
    'Jardim Primavera', 'Jardim Santa Lídia', 'Jardim Sônia Maria', 'Jardim Universo'
  ],
  'Ribeirão Preto': [
    'Centro', 'Jardim Paulista', 'Jardim Irajá', 'Jardim Sumaré', 'Jardim Califórnia', 'Jardim Macedo',
    'Jardim Paulistano', 'Jardim América', 'Jardim Independência', 'Jardim Presidente Dutra',
    'Jardim Recreio', 'Jardim São Luiz', 'Jardim Nova Aliança', 'Jardim Botânico', 'Jardim Canadá',
    'Jardim Interlagos', 'Jardim Itaú', 'Jardim Jandaia', 'Jardim Manoel Penna', 'Jardim Marchesi'
  ],
  'Sorocaba': [
    'Centro', 'Jardim Europa', 'Jardim Gonçalves', 'Jardim Paulistano', 'Jardim Santa Rosália',
    'Jardim Simus', 'Jardim Vergueiro', 'Jardim Wanel Ville', 'Jardim Zulmira', 'Parque Campolim',
    'Parque São Bento', 'Vila Angélica', 'Vila Barão', 'Vila Carvalho', 'Vila Fiori',
    'Vila Gabriel', 'Vila Haro', 'Vila Hortência', 'Vila Jardini', 'Vila Santana'
  ]
};

// Coordenadas aproximadas das cidades (latitude, longitude)
const coordenadasCidades = {
  'São Paulo': [-23.5505, -46.6333],
  'Guarulhos': [-23.4543, -46.5337],
  'Osasco': [-23.5325, -46.7917],
  'Campinas': [-22.9056, -47.0608],
  'Santo André': [-23.6639, -46.5383],
  'São Bernardo do Campo': [-23.6944, -46.5654],
  'São Caetano do Sul': [-23.6229, -46.5548],
  'Diadema': [-23.6856, -46.6228],
  'Mauá': [-23.6677, -46.4613],
  'Ribeirão Preto': [-21.1775, -47.8103],
  'Sorocaba': [-23.5015, -47.4526]
};

// IDs dos formulários
const formulariosIds = ['1', '2', '3', '4', '5'];

// Função para gerar um número aleatório entre min e max
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Função para gerar um email aleatório
function gerarEmail(nome, sobrenome) {
  const dominios = ['gmail.com', 'hotmail.com', 'outlook.com', 'yahoo.com', 'uol.com.br', 'terra.com.br', 'icloud.com'];
  const nomeSemAcentos = nome.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const sobrenomeSemAcentos = sobrenome.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

  const tipos = [
    `${nomeSemAcentos}.${sobrenomeSemAcentos}@${dominios[randomInt(0, dominios.length - 1)]}`,
    `${nomeSemAcentos}${randomInt(1, 999)}@${dominios[randomInt(0, dominios.length - 1)]}`,
    `${nomeSemAcentos[0]}${sobrenomeSemAcentos}@${dominios[randomInt(0, dominios.length - 1)]}`,
    `${nomeSemAcentos}_${sobrenomeSemAcentos}@${dominios[randomInt(0, dominios.length - 1)]}`,
    `${sobrenomeSemAcentos}.${nomeSemAcentos}@${dominios[randomInt(0, dominios.length - 1)]}`
  ];

  return tipos[randomInt(0, tipos.length - 1)];
}

// Função para gerar um telefone aleatório
function gerarTelefone() {
  const ddd = randomInt(11, 19); // DDDs do estado de São Paulo
  const numero1 = randomInt(90000, 99999);
  const numero2 = randomInt(1000, 9999);
  return `(${ddd}) 9${numero1}-${numero2}`;
}

// Função para gerar uma data aleatória nos últimos 90 dias
function gerarDataRecente() {
  const hoje = new Date();
  const diasAtras = randomInt(0, 90);
  const dataAleatoria = new Date(hoje);
  dataAleatoria.setDate(hoje.getDate() - diasAtras);

  // Adicionar horas, minutos e segundos aleatórios
  dataAleatoria.setHours(randomInt(8, 22));
  dataAleatoria.setMinutes(randomInt(0, 59));
  dataAleatoria.setSeconds(randomInt(0, 59));

  return dataAleatoria.toISOString();
}

// Função para gerar coordenadas aleatórias próximas a um ponto central
function gerarCoordenadas(cidade) {
  const [latBase, lngBase] = coordenadasCidades[cidade];
  // Variação de até ~2km
  const latVariacao = (Math.random() - 0.5) * 0.04;
  const lngVariacao = (Math.random() - 0.5) * 0.04;

  return [latBase + latVariacao, lngBase + lngVariacao];
}

// Função para gerar um lead aleatório
function gerarLead(id) {
  const nome = nomes[randomInt(0, nomes.length - 1)];
  const sobrenome = sobrenomes[randomInt(0, sobrenomes.length - 1)];
  const nomeCompleto = `${nome} ${sobrenome}`;

  // Selecionar uma cidade aleatória
  const cidades = Object.keys(cidadesEBairros);
  const cidade = cidades[randomInt(0, cidades.length - 1)];

  // Selecionar um bairro aleatório da cidade
  const bairros = cidadesEBairros[cidade];
  const bairro = bairros[randomInt(0, bairros.length - 1)];

  // Gerar coordenadas baseadas na cidade
  const [latitude, longitude] = gerarCoordenadas(cidade);

  // Data de captação e criação
  const dataCaptacao = gerarDataRecente();

  return {
    id: id.toString(),
    nome: nomeCompleto,
    email: gerarEmail(nome, sobrenome),
    telefone: gerarTelefone(),
    cidade: cidade,
    estado: 'SP',
    bairro: bairro,
    latitude: latitude,
    longitude: longitude,
    data_captacao: dataCaptacao,
    formulario_id: formulariosIds[randomInt(0, formulariosIds.length - 1)],
    created_at: dataCaptacao
  };
}

// Função principal para gerar e inserir leads
async function gerarEInserirLeads(quantidade) {
  console.log(`Gerando ${quantidade} leads aleatórios...`);

  // Verificar o último ID na tabela
  const { data: ultimoLead, error: erroConsulta } = await supabase
    .from('leads')
    .select('id')
    .order('id', { ascending: false })
    .limit(1);

  if (erroConsulta) {
    console.error('Erro ao consultar o último ID:', erroConsulta);
    return;
  }

  let ultimoId = 0;
  if (ultimoLead && ultimoLead.length > 0) {
    ultimoId = parseInt(ultimoLead[0].id);
  }

  console.log(`Último ID encontrado: ${ultimoId}`);

  // Gerar leads em lotes para evitar sobrecarga
  const tamanhoDosLotes = 100;
  const numeroLotes = Math.ceil(quantidade / tamanhoDosLotes);

  for (let lote = 0; lote < numeroLotes; lote++) {
    const inicioLote = lote * tamanhoDosLotes;
    const fimLote = Math.min((lote + 1) * tamanhoDosLotes, quantidade);
    const quantidadeLote = fimLote - inicioLote;

    console.log(`Gerando lote ${lote + 1}/${numeroLotes} (${inicioLote + 1} a ${fimLote})...`);

    const leads = [];
    for (let i = 0; i < quantidadeLote; i++) {
      const novoId = ultimoId + inicioLote + i + 1;
      leads.push(gerarLead(novoId));
    }

    // Inserir lote no Supabase
    const { error } = await supabase.from('leads').insert(leads);

    if (error) {
      console.error(`Erro ao inserir lote ${lote + 1}:`, error);
    } else {
      console.log(`Lote ${lote + 1} inserido com sucesso!`);
    }

    // Pequena pausa entre lotes para não sobrecarregar a API
    if (lote < numeroLotes - 1) {
      console.log('Aguardando 1 segundo antes do próximo lote...');
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  console.log(`Processo concluído! ${quantidade} leads foram gerados e inseridos.`);
}

// Executar o script
const QUANTIDADE_LEADS = 3500;
gerarEInserirLeads(QUANTIDADE_LEADS)
  .catch(erro => {
    console.error('Erro durante a execução do script:', erro);
    process.exit(1);
  });
