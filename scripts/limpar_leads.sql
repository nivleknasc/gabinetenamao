-- Script para limpar todos os leads do banco de dados
-- ATENÇÃO: Este comando irá excluir TODOS os leads. Esta ação não pode ser desfeita.

-- Limpar a tabela de submissões de formulários (leads)
DELETE FROM form_submissions;

-- Reiniciar a sequência (se houver)
-- ALTER SEQUENCE form_submissions_id_seq RESTART WITH 1;

-- Confirmar a limpeza
SELECT COUNT(*) FROM form_submissions;
