import { neon } from '@neondatabase/serverless';
import fs from 'fs';

// You'll need to set your production database URL
// Either set PRODUCTION_DATABASE_URL environment variable
// or replace the line below with your actual production database URL
const PRODUCTION_DB_URL = process.env.PRODUCTION_DATABASE_URL || process.env.DATABASE_URL;

if (!PRODUCTION_DB_URL) {
    console.error('❌ Please set PRODUCTION_DATABASE_URL environment variable');
    process.exit(1);
}

const sql = neon(PRODUCTION_DB_URL);

async function importFromJSON() {
    try {
        console.log('🚀 Starting JSON import to production database...');
        
        // Read the JSON file (adjust the filename if needed)
        const jsonFile = 'routines_export.json'; // Change this to your actual JSON filename
        
        if (!fs.existsSync(jsonFile)) {
            console.error(`❌ File ${jsonFile} not found. Please make sure the JSON file is in the current directory.`);
            console.log('💡 If your file has a different name, update the jsonFile variable in this script.');
            return;
        }
        
        const jsonData = JSON.parse(fs.readFileSync(jsonFile, 'utf8'));
        console.log(`📊 Found data for ${jsonData.length} routines`);
        
        // Create the table if it doesn't exist
        console.log('🔧 Creating routines table if it doesn\'t exist...');
        await sql`
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
            )
        `;
        
        // Check if data already exists
        const existingCount = await sql`SELECT COUNT(*) as count FROM routines`;
        const currentCount = existingCount[0].count;
        
        if (currentCount > 0) {
            console.log(`⚠️  Production database already has ${currentCount} routines.`);
            console.log('❓ Do you want to:');
            console.log('   1. Skip import (to avoid duplicates)');
            console.log('   2. Clear existing data and import fresh');
            console.log('   3. Add new data alongside existing');
            console.log('');
            console.log('💡 Uncomment one of the options below and run again:');
            console.log('   // Option 2: await sql`DELETE FROM routines`;');
            console.log('   // Option 3: Continue with import (may create duplicates)');
            return;
        }
        
        // Import each routine
        console.log('📥 Starting import...');
        let successCount = 0;
        let errorCount = 0;
        
        for (let i = 0; i < jsonData.length; i++) {
            const routine = jsonData[i];
            try {
                console.log(`Processing ${i + 1}/${jsonData.length}: ${routine.title}`);
                
                await sql`
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
                        ${routine.id},
                        ${routine.title},
                        ${routine.author},
                        ${routine.category},
                        ${routine.original_filename},
                        ${routine.html_content},
                        ${routine.conversion_method},
                        ${routine.created_at},
                        ${routine.updated_at}
                    )
                `;
                
                successCount++;
            } catch (error) {
                console.error(`❌ Error importing routine ${routine.title}:`, error.message);
                errorCount++;
            }
        }
        
        // Verify the import
        const finalCount = await sql`SELECT COUNT(*) as count FROM routines`;
        
        console.log('\n✅ Import completed!');
        console.log(`📊 Results:`);
        console.log(`   - Successfully imported: ${successCount} routines`);
        console.log(`   - Errors: ${errorCount} routines`);
        console.log(`   - Total in production database: ${finalCount[0].count} routines`);
        
        // Show a few sample records
        const sample = await sql`SELECT title, author, category FROM routines LIMIT 5`;
        console.log('\n📋 Sample imported records:');
        sample.forEach(record => {
            console.log(`   - ${record.title} (${record.author} - ${record.category})`);
        });
        
    } catch (error) {
        console.error('❌ Import failed:', error);
    }
}

importFromJSON();