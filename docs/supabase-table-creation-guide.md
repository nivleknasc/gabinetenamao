# Guia para Criar Tabelas no Supabase

Este guia mostra diferentes maneiras de criar tabelas no Supabase.

## Opção 1: Usando o SQL Editor

### Passo 1: Acessar o SQL Editor
- Faça login no [Supabase](https://app.supabase.com)
- Selecione seu projeto
- No menu lateral, procure por "SQL Editor" ou "Database" > "SQL"

![SQL Editor no Menu](https://i.imgur.com/example1.png)

### Passo 2: Criar uma Nova Query
- Procure por um botão "+" ou "New Query" na interface
- Pode estar no topo da página ou em um menu dropdown

![Novo Query](https://i.imgur.com/example2.png)

### Passo 3: Executar o Script SQL
- Cole o script SQL no editor
- Clique em "Run", "Execute" ou similar para executar o script

![Executar Script](https://i.imgur.com/example3.png)

## Opção 2: Usando o Table Editor

### Passo 1: Acessar o Table Editor
- No menu lateral, procure por "Table Editor" ou "Database" > "Tables"

![Table Editor](https://i.imgur.com/example4.png)

### Passo 2: Criar uma Nova Tabela
- Clique em "Create a new table" ou "New Table"

![Nova Tabela](https://i.imgur.com/example5.png)

### Passo 3: Definir a Estrutura da Tabela
- Defina o nome da tabela como "formularios"
- Adicione as colunas conforme necessário:
  - id (tipo: text, primary key)
  - nome (tipo: text, not null)
  - descricao (tipo: text, not null)
  - campos (tipo: jsonb, not null)
  - imagem_url (tipo: text)
  - public_url (tipo: text)
  - aparencia (tipo: jsonb)
  - created_at (tipo: timestamptz, default: now())
  - updated_at (tipo: timestamptz, default: now())

![Estrutura da Tabela](https://i.imgur.com/example6.png)

### Passo 4: Repetir para a Tabela de Leads
- Crie outra tabela chamada "leads" com a estrutura apropriada

## Opção 3: Usando a API do Supabase

Se você tiver problemas com as opções acima, podemos criar as tabelas programaticamente usando a API do Supabase:

```javascript
// Código para criar tabelas programaticamente
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'SUA_URL_DO_SUPABASE';
const supabaseKey = 'SUA_CHAVE_DE_SERVICO'; // Use a chave de serviço, não a anônima

const supabase = createClient(supabaseUrl, supabaseKey);

async function createTables() {
  // Criar tabela de formulários
  const { error: formError } = await supabase.rpc('create_formularios_table');
  
  if (formError) {
    console.error('Erro ao criar tabela de formulários:', formError);
  } else {
    console.log('Tabela de formulários criada com sucesso!');
  }
  
  // Criar tabela de leads
  const { error: leadsError } = await supabase.rpc('create_leads_table');
  
  if (leadsError) {
    console.error('Erro ao criar tabela de leads:', leadsError);
  } else {
    console.log('Tabela de leads criada com sucesso!');
  }
}

createTables();
```

## Verificação

Após criar as tabelas, verifique se elas foram criadas corretamente:

1. Vá para "Table Editor" ou "Database" > "Tables"
2. Você deve ver as tabelas "formularios" e "leads" na lista
3. Clique em cada tabela para verificar se a estrutura está correta

Se tiver problemas, entre em contato com o suporte do Supabase ou consulte a [documentação oficial](https://supabase.com/docs).
