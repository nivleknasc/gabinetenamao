-- Script simplificado para criar tabelas no Supabase

-- Tabela de formulários
CREATE TABLE IF NOT EXISTS formularios (
  id TEXT PRIMARY KEY,
  nome TEXT NOT NULL,
  descricao TEXT NOT NULL,
  campos JSONB NOT NULL,
  imagem_url TEXT,
  public_url TEXT,
  aparencia JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela de leads
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
  latitude FLOAT8,
  longitude FLOAT8,
  formulario_id TEXT REFERENCES formularios(id) ON DELETE CASCADE,
  dados_adicionais JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
