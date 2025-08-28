// Script to generate complete SQL export for production database
const fs = require('fs');

// This script will be used to generate INSERT statements
// We'll fetch the data and create the SQL file

console.log('Creating production export script...');

// Base SQL content
const baseSql = `-- Production Database Export Script
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

-- Insert all routine data
-- Note: HTML content contains base64 encoded images and complete styling

`;

fs.writeFileSync('production_data_export_base.sql', baseSql);
console.log('Base SQL file created. Now we need to add the actual data...');