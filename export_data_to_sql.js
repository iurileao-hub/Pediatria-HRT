import { neon } from '@neondatabase/serverless';
import fs from 'fs';

const sql = neon(process.env.DATABASE_URL);

async function exportToSQL() {
    try {
        console.log('Starting SQL export generation...');
        
        // Get all routines data
        const routines = await sql`
            SELECT 
                id, 
                title, 
                author, 
                category, 
                original_filename, 
                html_content,
                conversion_method, 
                created_at, 
                updated_at
            FROM routines 
            ORDER BY title
        `;
        
        console.log(`Found ${routines.length} routines to export`);
        
        // Function to escape SQL strings properly
        function escapeSQLString(str) {
            if (!str || str === null || str === undefined) return 'NULL';
            const stringValue = String(str);
            return `'${stringValue.replace(/'/g, "''")}'`;
        }
        
        // Create SQL header
        let sqlContent = `-- Production Database Export Script
-- Generated for HRT Pediatric Protocols Application
-- Date: ${new Date().toISOString().split('T')[0]}
-- Total Routines: ${routines.length}
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
`;

        // Add each routine as an INSERT statement
        for (let i = 0; i < routines.length; i++) {
            const routine = routines[i];
            console.log(`Processing routine ${i + 1}/${routines.length}: ${routine.title}`);
            
            const insertSQL = `
INSERT INTO routines (id, title, author, category, original_filename, html_content, conversion_method, created_at, updated_at) 
VALUES (
    ${escapeSQLString(routine.id)},
    ${escapeSQLString(routine.title)},
    ${escapeSQLString(routine.author)},
    ${escapeSQLString(routine.category)},
    ${escapeSQLString(routine.original_filename)},
    ${escapeSQLString(routine.html_content)},
    ${escapeSQLString(routine.conversion_method)},
    ${escapeSQLString(routine.created_at)},
    ${escapeSQLString(routine.updated_at)}
);
`;
            sqlContent += insertSQL;
        }
        
        // Write to file
        fs.writeFileSync('complete_production_export.sql', sqlContent);
        
        console.log(`✅ Complete SQL export generated: complete_production_export.sql`);
        console.log(`📊 File contains ${routines.length} routines with full HTML content`);
        console.log(`📁 Approximate file size: ${(sqlContent.length / 1024 / 1024).toFixed(2)} MB`);
        
    } catch (error) {
        console.error('Error generating SQL export:', error);
    }
}

exportToSQL();