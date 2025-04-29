# Guia Passo a Passo para Configurar o Supabase

Este guia detalhado irá ajudá-lo a configurar o Supabase para o projeto Gabinete na Mão.

## 1. Obter as Credenciais do Supabase

1. Acesse o painel do seu projeto Supabase em https://app.supabase.com
2. Selecione seu projeto na lista
3. No menu lateral, clique em "Settings" (ícone de engrenagem)
4. No submenu, clique em "API"
5. Na seção "Project API keys", você encontrará:
   - **Project URL**: A URL do seu projeto (começa com https:// e termina com .supabase.co)
   - **anon public**: A chave anônima pública (começa com eyJ...)

## 2. Configurar as Variáveis de Ambiente

1. Abra o arquivo `.env.local` na raiz do projeto
2. Substitua os valores de exemplo pelas suas credenciais reais:
   ```
   NEXT_PUBLIC_SUPABASE_URL=sua-url-do-projeto-aqui
   NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anonima-aqui
   ```
3. Salve o arquivo
4. Reinicie o servidor de desenvolvimento (pare o servidor atual e execute `npm run dev` novamente)

## 3. Criar as Tabelas no Supabase

### Opção 1: Usando o SQL Editor

1. No painel do Supabase, clique em "SQL Editor" no menu lateral (ou "Database" > "SQL")
2. Clique em "New Query" ou no botão "+" para criar uma nova consulta
3. Cole o seguinte código SQL:

```sql
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
```

4. Clique em "Run" ou "Execute" para executar o script

### Opção 2: Usando o Table Editor

Se você não conseguir encontrar o SQL Editor, pode criar as tabelas manualmente:

1. No menu lateral, clique em "Table Editor" ou "Database" > "Tables"
2. Clique em "Create a new table" ou "New Table"
3. Defina o nome da tabela como "formularios"
4. Adicione as seguintes colunas:
   - id (tipo: text, primary key)
   - nome (tipo: text, not null)
   - descricao (tipo: text, not null)
   - campos (tipo: jsonb, not null)
   - imagem_url (tipo: text)
   - public_url (tipo: text)
   - aparencia (tipo: jsonb)
   - created_at (tipo: timestamptz, default: now())
   - updated_at (tipo: timestamptz, default: now())
5. Clique em "Save" ou "Create"
6. Repita o processo para a tabela "leads" com as colunas apropriadas

## 4. Verificar a Conexão

1. Acesse a página de formulários em http://localhost:3000/dashboard/formularios
2. Verifique se não há erros no console do navegador (F12 > Console)
3. Tente criar um novo formulário
4. Verifique se o formulário aparece na lista após a criação

## 5. Verificar os Dados no Supabase

1. No painel do Supabase, vá para "Table Editor" ou "Database" > "Tables"
2. Clique na tabela "formularios"
3. Verifique se os dados do formulário que você criou estão lá

## Solução de Problemas

Se você encontrar problemas, verifique:

1. **Erro "supabaseUrl is required"**:
   - Verifique se as variáveis de ambiente estão configuradas corretamente no arquivo `.env.local`
   - Certifique-se de que o servidor foi reiniciado após a alteração do arquivo `.env.local`

2. **Erro ao criar tabelas**:
   - Verifique se você tem permissões para criar tabelas no seu projeto Supabase
   - Tente executar cada comando SQL separadamente

3. **Erro ao criar formulário**:
   - Verifique se as tabelas foram criadas corretamente
   - Verifique se há erros no console do navegador

4. **Erro de CORS**:
   - Verifique se a URL do seu projeto está correta
   - Verifique se a chave anônima está correta

Se você continuar enfrentando problemas, entre em contato com o suporte do Supabase ou consulte a [documentação oficial](https://supabase.com/docs).
