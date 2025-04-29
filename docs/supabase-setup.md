# Configuração do Supabase para o Gabinete na Mão

Este guia explica como configurar o Supabase para o projeto Gabinete na Mão.

## 1. Criar uma conta no Supabase

1. Acesse [supabase.com](https://supabase.com/) e crie uma conta ou faça login.
2. Clique em "New Project" para criar um novo projeto.
3. Escolha um nome para o projeto (ex: "gabinete-na-mao").
4. Escolha uma senha forte para o banco de dados.
5. Escolha a região mais próxima de seus usuários (ex: "South America (São Paulo)").
6. Clique em "Create new project".

## 2. Configurar o banco de dados

Após a criação do projeto, você precisa configurar o banco de dados:

1. No painel do Supabase, vá para a seção "SQL Editor".
2. Clique em "New Query".
3. Cole o conteúdo do arquivo `supabase/migrations/20250430_create_formularios_table.sql`.
4. Clique em "Run" para executar o script SQL.

## 3. Obter as credenciais de API

Para conectar sua aplicação ao Supabase, você precisa das credenciais de API:

1. No painel do Supabase, vá para a seção "Settings" (ícone de engrenagem).
2. Clique em "API" no menu lateral.
3. Na seção "Project API keys", você encontrará:
   - **URL**: O URL do seu projeto Supabase
   - **anon public**: A chave anônima pública para acesso não autenticado
   - **service_role**: A chave de serviço (NÃO use esta no frontend)

## 4. Configurar as variáveis de ambiente

1. Abra o arquivo `.env.local` na raiz do projeto.
2. Atualize as seguintes variáveis:

```
NEXT_PUBLIC_SUPABASE_URL=sua_url_do_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima_do_supabase
```

Substitua `sua_url_do_supabase` pelo URL do seu projeto Supabase e `sua_chave_anonima_do_supabase` pela chave anônima pública.

## 5. Testar a conexão

Após configurar as variáveis de ambiente, reinicie o servidor de desenvolvimento e teste a conexão:

1. Acesse a página de formulários.
2. Tente criar um novo formulário.
3. Verifique se o formulário aparece na lista após a criação.

## 6. Configuração de autenticação (opcional)

Se você quiser implementar autenticação de usuários:

1. No painel do Supabase, vá para a seção "Authentication".
2. Configure os provedores de autenticação desejados (Email, Google, etc.).
3. Personalize os templates de email e as configurações de segurança.

## 7. Configuração de armazenamento (opcional)

Para armazenar imagens e outros arquivos:

1. No painel do Supabase, vá para a seção "Storage".
2. Crie um novo bucket chamado "formularios".
3. Configure as permissões de acesso conforme necessário.

## Solução de problemas

Se você encontrar problemas com a conexão ao Supabase:

1. Verifique se as variáveis de ambiente estão configuradas corretamente.
2. Verifique se o script SQL foi executado com sucesso.
3. Verifique os logs do console para mensagens de erro.
4. Certifique-se de que as políticas de segurança (RLS) estão configuradas corretamente.
