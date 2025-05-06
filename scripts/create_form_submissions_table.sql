-- Criar tabela para armazenar as submissões de formulários
CREATE TABLE IF NOT EXISTS form_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  formulario_id TEXT NOT NULL,
  dados JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Campos extraídos para facilitar consultas
  nome TEXT,
  email TEXT,
  telefone TEXT,
  cidade TEXT,
  estado TEXT,
  bairro TEXT,
  cep TEXT,
  endereco TEXT,
  
  -- Informações adicionais
  ip_address TEXT,
  user_agent TEXT
);

-- Criar índices para melhorar performance de consultas
CREATE INDEX IF NOT EXISTS idx_form_submissions_formulario_id ON form_submissions(formulario_id);
CREATE INDEX IF NOT EXISTS idx_form_submissions_created_at ON form_submissions(created_at);
CREATE INDEX IF NOT EXISTS idx_form_submissions_cidade ON form_submissions(cidade);
CREATE INDEX IF NOT EXISTS idx_form_submissions_estado ON form_submissions(estado);
CREATE INDEX IF NOT EXISTS idx_form_submissions_bairro ON form_submissions(bairro);

-- Adicionar políticas de segurança (RLS)
ALTER TABLE form_submissions ENABLE ROW LEVEL SECURITY;

-- Política para permitir inserção anônima (para formulários públicos)
CREATE POLICY insert_form_submissions_policy ON form_submissions
  FOR INSERT TO anon
  WITH CHECK (true);

-- Política para permitir leitura apenas para usuários autenticados
CREATE POLICY select_form_submissions_policy ON form_submissions
  FOR SELECT TO authenticated
  USING (true);

-- Comentários para documentação
COMMENT ON TABLE form_submissions IS 'Armazena as submissões de formulários públicos';
COMMENT ON COLUMN form_submissions.dados IS 'Dados completos enviados no formulário em formato JSON';
COMMENT ON COLUMN form_submissions.nome IS 'Nome do respondente, extraído dos dados para facilitar consultas';
COMMENT ON COLUMN form_submissions.email IS 'Email do respondente, extraído dos dados para facilitar consultas';
COMMENT ON COLUMN form_submissions.telefone IS 'Telefone do respondente, extraído dos dados para facilitar consultas';
COMMENT ON COLUMN form_submissions.cidade IS 'Cidade do respondente, extraído dos dados para facilitar consultas';
COMMENT ON COLUMN form_submissions.estado IS 'Estado do respondente, extraído dos dados para facilitar consultas';
COMMENT ON COLUMN form_submissions.bairro IS 'Bairro do respondente, extraído dos dados para facilitar consultas';
COMMENT ON COLUMN form_submissions.ip_address IS 'Endereço IP do respondente para análise e prevenção de fraudes';
COMMENT ON COLUMN form_submissions.user_agent IS 'User agent do navegador do respondente para análise';
