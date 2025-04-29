-- Criar tabela de formulários
CREATE TABLE IF NOT EXISTS formularios (
  id TEXT PRIMARY KEY,
  nome TEXT NOT NULL,
  descricao TEXT NOT NULL,
  campos JSONB NOT NULL,
  imagem_url TEXT,
  public_url TEXT,
  aparencia JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar índice para busca por nome
CREATE INDEX IF NOT EXISTS formularios_nome_idx ON formularios (nome);

-- Criar índice para ordenação por data de criação
CREATE INDEX IF NOT EXISTS formularios_created_at_idx ON formularios (created_at DESC);

-- Função para atualizar o campo updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para atualizar o campo updated_at
DROP TRIGGER IF EXISTS update_formularios_updated_at ON formularios;
CREATE TRIGGER update_formularios_updated_at
BEFORE UPDATE ON formularios
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Criar tabela de leads
CREATE TABLE IF NOT EXISTS leads (
  id TEXT PRIMARY KEY,
  nome TEXT NOT NULL,
  email TEXT NOT NULL,
  telefone TEXT,
  cidade TEXT,
  estado TEXT,
  bairro TEXT,
  cep TEXT,
  endereco TEXT,
  numero TEXT,
  complemento TEXT,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  formulario_id TEXT NOT NULL REFERENCES formularios(id) ON DELETE CASCADE,
  dados_adicionais JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar índices para busca
CREATE INDEX IF NOT EXISTS leads_nome_idx ON leads (nome);
CREATE INDEX IF NOT EXISTS leads_email_idx ON leads (email);
CREATE INDEX IF NOT EXISTS leads_formulario_id_idx ON leads (formulario_id);
CREATE INDEX IF NOT EXISTS leads_created_at_idx ON leads (created_at DESC);

-- Trigger para atualizar o campo updated_at
DROP TRIGGER IF EXISTS update_leads_updated_at ON leads;
CREATE TRIGGER update_leads_updated_at
BEFORE UPDATE ON leads
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Criar políticas de segurança (RLS)
-- Habilitar RLS nas tabelas
ALTER TABLE formularios ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Criar políticas para formulários
CREATE POLICY "Permitir acesso completo a formulários para usuários autenticados"
ON formularios
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Criar políticas para leads
CREATE POLICY "Permitir acesso completo a leads para usuários autenticados"
ON leads
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Permitir acesso anônimo para leitura de formulários públicos
CREATE POLICY "Permitir leitura de formulários públicos para anônimos"
ON formularios
FOR SELECT
TO anon
USING (public_url IS NOT NULL);

-- Permitir inserção de leads por anônimos
CREATE POLICY "Permitir inserção de leads por anônimos"
ON leads
FOR INSERT
TO anon
WITH CHECK (true);
