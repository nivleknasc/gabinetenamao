-- Script para limpar TODOS os dados do banco de dados
-- ATENÇÃO: Este comando irá excluir TODOS os dados. Esta ação não pode ser desfeita.

-- Verificar tabelas existentes
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public';

-- Limpar a tabela de submissões de formulários (leads)
DELETE FROM form_submissions;

-- Limpar a tabela de leads (se existir)
DO $$
BEGIN
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'leads') THEN
        EXECUTE 'DELETE FROM leads';
    END IF;
END
$$;

-- Limpar a tabela de formulários (opcional - descomente se quiser limpar também)
-- DELETE FROM formularios;

-- Confirmar a limpeza
SELECT 'form_submissions', COUNT(*) FROM form_submissions;

DO $$
BEGIN
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'leads') THEN
        EXECUTE 'SELECT ''leads'', COUNT(*) FROM leads';
    END IF;
END
$$;
