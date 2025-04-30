-- Script para limpar todos os leads do banco de dados
-- ATENÇÃO: Este comando irá excluir TODOS os leads. Esta ação não pode ser desfeita.

-- Limpar a tabela de leads
DELETE FROM leads;

-- Reiniciar a sequência (se houver)
-- ALTER SEQUENCE leads_id_seq RESTART WITH 1;

-- Confirmar a limpeza
SELECT COUNT(*) FROM leads;
