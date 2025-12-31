import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const { Pool } = pg;

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
    console.error('❌ Error: DATABASE_URL is not set.');
    process.exit(1);
}

const pool = new Pool({
    connectionString,
    allowExitOnIdle: true,
    ssl: {
        rejectUnauthorized: false
    }
});

const runTests = async () => {
    const testId = `test_pi_${Date.now()}`;

    try {
        const client = await pool.connect();

        // 1. Insert
        console.log(`🧪 Testing INSERT (ID: ${testId})...`);
        const insertRes = await client.query(
            `INSERT INTO orders (payment_intent_id, amount, status, email, items)
             VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [testId, 1000, 'test_status', 'test@example.com', JSON.stringify([{ id: 'test', qty: 1 }])]
        );

        if (insertRes.rowCount === 1) {
            console.log('✅ INSERT successful.');
        } else {
            throw new Error('Insert failed to return a row.');
        }

        // 2. Select
        console.log('🧪 Testing SELECT...');
        const selectRes = await client.query(
            `SELECT * FROM orders WHERE payment_intent_id = $1`,
            [testId]
        );

        if (selectRes.rows.length > 0 && selectRes.rows[0].email === 'test@example.com') {
            console.log('✅ SELECT successful.');
        } else {
            throw new Error('Select failed or returned wrong data.');
        }

        // 3. Delete
        console.log('🧪 Testing DELETE...');
        const deleteRes = await client.query(
            `DELETE FROM orders WHERE payment_intent_id = $1`,
            [testId]
        );

        if (deleteRes.rowCount === 1) {
            console.log('✅ DELETE successful.');
        } else {
            throw new Error('Delete failed.');
        }

        client.release();
        await pool.end();
        console.log('🎉 All database tests passed!');

    } catch (err) {
        console.error('❌ Database test failed:', err);
        process.exit(1);
    }
};

runTests();
