const fs = require('fs');
const { exec } = require('child_process');

// Function to escape SQL strings
function escapeSQLString(str) {
    if (!str) return 'NULL';
    return "'" + str.replace(/'/g, "''") + "'";
}

// Function to generate INSERT statement for a routine
function generateInsertStatement(routine) {
    const id = escapeSQLString(routine.id);
    const title = escapeSQLString(routine.title);
    const author = escapeSQLString(routine.author);
    const category = escapeSQLString(routine.category);
    const originalFilename = escapeSQLString(routine.original_filename);
    const htmlContent = escapeSQLString(routine.html_content);
    const conversionMethod = escapeSQLString(routine.conversion_method);
    const createdAt = escapeSQLString(routine.created_at);
    const updatedAt = escapeSQLString(routine.updated_at);
    
    return `INSERT INTO routines (id, title, author, category, original_filename, html_content, conversion_method, created_at, updated_at) 
VALUES (${id}, ${title}, ${author}, ${category}, ${originalFilename}, ${htmlContent}, ${conversionMethod}, ${createdAt}, ${updatedAt});\n\n`;
}

// Create the SQL header
const sqlHeader = `-- Production Database Export Script
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

// Write the initial SQL file
fs.writeFileSync('production_data_export.sql', sqlHeader);
console.log('Created SQL export file with header');
console.log('To complete the export, we need to fetch the actual data...');