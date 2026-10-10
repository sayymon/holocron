-- Migration: 20261010_002_rename_progress_nomenclature.sql
-- Corrige a nomenclatura do domínio: o nível superior é "disciplina"
-- e o nível interno é "módulo" (antes gravado como module / unit).

ALTER TABLE progress RENAME COLUMN module TO disciplina;
ALTER TABLE progress RENAME COLUMN unit TO modulo;
ALTER TABLE progress ALTER COLUMN disciplina TYPE TEXT USING disciplina::text;
