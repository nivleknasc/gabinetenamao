# Guia de Solução de Problemas do Supabase

Este guia ajudará você a solucionar problemas comuns de conexão com o Supabase.

## Problema: "supabaseUrl is required"

Este erro ocorre quando a URL do Supabase não está definida corretamente nas variáveis de ambiente.

### Solução:

1. **Verificar o arquivo `.env.local`**:
   - Abra o arquivo `.env.local` na raiz do projeto
   - Verifique se a variável `NEXT_PUBLIC_SUPABASE_URL` está definida corretamente
   - A URL deve começar com `https://` e terminar com `.supabase.co`
   - Exemplo: `NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijklm.supabase.co`

2. **Verificar se o arquivo `.env.local` está sendo carregado**:
   - Reinicie o servidor de desenvolvimento (pare o servidor atual e execute `npm run dev` novamente)
   - Acesse http://localhost:3000/api/test-env para verificar se as variáveis de ambiente estão sendo carregadas

3. **Verificar se não há espaços ou caracteres especiais**:
   - Certifique-se de que não há espaços antes ou depois do sinal de igual (=)
   - Certifique-se de que não há aspas ou outros caracteres especiais na URL

## Problema: Erro de conexão com o Supabase

Este erro ocorre quando a conexão com o Supabase falha.

### Solução:

1. **Verificar as credenciais**:
   - Verifique se a URL e a chave anônima estão corretas
   - Acesse o painel do Supabase e copie as credenciais novamente

2. **Verificar se o projeto Supabase está ativo**:
   - Acesse o painel do Supabase e verifique se o projeto está ativo
   - Se o projeto estiver pausado, reative-o

3. **Verificar se as tabelas foram criadas**:
   - Acesse o painel do Supabase e verifique se as tabelas `formularios` e `leads` existem
   - Se as tabelas não existirem, execute o script SQL novamente

4. **Verificar se há restrições de CORS**:
   - Acesse o painel do Supabase e verifique as configurações de CORS
   - Adicione `http://localhost:3000` à lista de origens permitidas

## Problema: Erro ao criar formulário

Este erro ocorre quando a criação de um formulário falha.

### Solução:

1. **Verificar se a tabela `formularios` existe**:
   - Acesse o painel do Supabase e verifique se a tabela `formularios` existe
   - Se a tabela não existir, execute o script SQL novamente

2. **Verificar se a estrutura da tabela está correta**:
   - Acesse o painel do Supabase e verifique se a tabela `formularios` tem as colunas corretas
   - As colunas devem incluir: `id`, `nome`, `descricao`, `campos`, `imagem_url`, `public_url`, `aparencia`, `created_at`, `updated_at`

3. **Verificar se há erros no console do navegador**:
   - Abra o console do navegador (F12 > Console)
   - Verifique se há erros relacionados ao Supabase

## Verificação Passo a Passo

1. **Verificar as variáveis de ambiente**:
   - Acesse http://localhost:3000/api/test-env
   - Verifique se as variáveis `supabaseUrl` e `supabaseKeyExists` estão definidas

2. **Verificar a conexão com o Supabase**:
   - Acesse http://localhost:3000/api/test-supabase
   - Verifique se a conexão foi estabelecida com sucesso

3. **Verificar as tabelas no Supabase**:
   - Acesse o painel do Supabase
   - Vá para "Table Editor" ou "Database" > "Tables"
   - Verifique se as tabelas `formularios` e `leads` existem

4. **Testar a criação de um formulário**:
   - Acesse http://localhost:3000/dashboard/formularios
   - Clique em "Novo Formulário"
   - Preencha os campos e clique em "Criar Formulário"
   - Verifique se o formulário aparece na lista após a criação

## Recursos Adicionais

- [Documentação do Supabase](https://supabase.com/docs)
- [Fórum do Supabase](https://github.com/supabase/supabase/discussions)
- [Suporte do Supabase](https://supabase.com/support)
