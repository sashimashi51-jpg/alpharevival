import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
// Also try loading from backend root .env if it exists
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const { Pool } = pg;

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
    console.error('❌ Error: DATABASE_URL is not set in environment variables.');
    process.exit(1);
}

const pool = new Pool({
    connectionString,
    // Force IPv4 to avoid ENETUNREACH in some environments
    allowExitOnIdle: true,
    ssl: {
        rejectUnauthorized: false // Required for Supabase/Render connections usually
    }
});

const createTableQuery = `
    CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        payment_intent_id TEXT NOT NULL,
        amount INTEGER NOT NULL,
        status TEXT NOT NULL DEFAULT 'pending',
        email TEXT,
        items JSONB,
        created_at TIMESTAMPTZ DEFAULT NOW()
    );
`;

const setupDatabase = async () => {
    try {
        console.log('🔌 Connecting to database...');
        const client = await pool.connect();
        console.log('✅ Connected.');

        console.log('🛠️ Creating "orders" table if not exists...');
        await client.query(createTableQuery);
        console.log('✅ Table "orders" verified/created.');

        // Optional: Create an index on payment_intent_id for faster lookups
        await client.query('CREATE INDEX IF NOT EXISTS idx_payment_intent_id ON orders(payment_intent_id);');
        console.log('✅ Index created.');

        client.release();
        await pool.end();
        console.log('🚀 Database initialization complete!');
    } catch (err) {
        console.error('❌ Database setup failed:', err);
        process.exit(1);
    }
};

setupDatabase();
