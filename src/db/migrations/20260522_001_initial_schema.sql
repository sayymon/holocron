-- Migration: 20260522_001_initial_schema.sql
-- Descrição: Schema inicial do Holocron AI Engineer

-- Extensões
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "vector";

-- Alunos
CREATE TABLE students (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Progresso por módulo/unidade
CREATE TABLE progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES students(id),
  module INT NOT NULL,
  unit INT NOT NULL,
  status TEXT DEFAULT 'not_started',
  score NUMERIC,
  completed_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(student_id, module, unit)
);

-- Interações com agentes
CREATE TABLE interactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES students(id),
  agent TEXT NOT NULL,
  input TEXT NOT NULL,
  output TEXT NOT NULL,
  context JSONB,
  feedback TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Embeddings dos documentos da KB
CREATE TABLE document_embeddings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  document_path TEXT NOT NULL,
  chunk_index INT NOT NULL,
  content TEXT NOT NULL,
  embedding vector(1536),
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(document_path, chunk_index)
);

-- Índice para busca vetorial
CREATE INDEX ON document_embeddings USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);
