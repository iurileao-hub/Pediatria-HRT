-- Production Database Export Script
-- Generated for HRT Pediatric Protocols Application
-- Date: August 28, 2025
-- Total Routines: 77
-- 
-- Instructions for use:
-- 1. Connect to your production database using Replit's database interface
-- 2. Execute this script to create tables and insert all routine data
-- 3. Verify the data was imported correctly

-- Create routines table (if it doesn't exist)
CREATE TABLE IF NOT EXISTS routines (
    id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    author TEXT,
    category TEXT,
    original_filename TEXT,
    html_content TEXT,
    conversion_method TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Clear any existing data (uncomment if you want to replace all data)
-- DELETE FROM routines;

-- IMPORTANT NOTES FOR MANUAL DATA TRANSFER:
-- Due to the large size of HTML content (some routines are 300KB+ with base64 images),
-- the complete INSERT statements would create a file over 50MB.
-- 
-- RECOMMENDED APPROACHES:

-- OPTION 1: Use pg_dump/pg_restore (Most Reliable)
-- In your development environment:
-- pg_dump $DATABASE_URL -t routines > routines_backup.sql
-- 
-- In your production environment:
-- psql $PRODUCTION_DATABASE_URL < routines_backup.sql

-- OPTION 2: Export/Import via CSV
-- Export development data:
-- COPY routines TO '/tmp/routines.csv' DELIMITER ',' CSV HEADER;
-- 
-- Import to production:
-- COPY routines FROM '/tmp/routines.csv' DELIMITER ',' CSV HEADER;

-- OPTION 3: Use the routine data metadata below to manually transfer
-- Here are the 77 routines in your development database:

-- Routine Summary (execute this to see what routines you have):
/*
SELECT 
    title,
    author,
    category,
    original_filename,
    LENGTH(html_content) as content_size_bytes,
    created_at,
    updated_at
FROM routines 
ORDER BY title;
*/

-- Sample routine structure (for reference):
/*
INSERT INTO routines (
    id, 
    title, 
    author, 
    category, 
    original_filename, 
    html_content, 
    conversion_method, 
    created_at, 
    updated_at
) VALUES (
    'fad976ba-c78c-483e-b49e-3795b3c82195',
    'ACIDENTES POR ANIMAIS PEÇONHENTOS',
    'Dr. Luiz Antônio',
    'Emergência',
    'ACIDENTES POR ANIMAIS PEÇONHENTOS ROTINAS HRT LUIZ ANTÔNIO.docx',
    '[LARGE HTML CONTENT WITH BASE64 IMAGES - 765KB]',
    'pandoc',
    '2025-08-18 19:52:40.143087',
    '2025-08-22 00:10:11.192906'
);
*/

-- Your 77 routines include:
-- Categories: Emergência, Infectologia, Gastroenterologia, Lactentes, HRN, 
--            Cardiologia, Neurologia, Endocrinologia, UTI, Pneumologia, Neonatologia
-- Authors: Dr. Luiz Antônio, Dr. Marco, Dra. Bárbara, Dra. Ana Luiza, Dr. Fabricio,
--          Dra. Ana Luísa, Dra. Luciany, Dra. Dania, Dra. Manuela, Dr. Renato,
--          Dr. Rafael, Dra. Ana Beatriz, Dr. Francisco, Dr. Sérgio, Dr. Fernando,
--          Dr. Kffuri, Dra. Cida, Dr. Carlos Henrique, Dr. Iúri, Dra. Roberta

-- Total content size: Approximately 15MB of HTML with embedded base64 images
-- All routines converted using Pandoc with embedded resources

-- For immediate transfer, I recommend using Replit's database interface
-- to export/import the data directly rather than executing large SQL statements.