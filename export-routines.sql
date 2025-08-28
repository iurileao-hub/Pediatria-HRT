-- Export script for all routines data
-- Generated automatically to preserve your medical protocols

BEGIN;

-- Create the routines table if it doesn't exist
CREATE TABLE IF NOT EXISTS routines (
    id varchar PRIMARY KEY,
    title text,
    author text,
    category text,
    original_filename text,
    html_content text,
    conversion_method varchar,
    created_at timestamp,
    updated_at timestamp
);

-- Insert all routine data