const { Client } = require('pg');
require('dotenv').config();

// Since the password in .env is encoded, we need to decode it for the pg client or just use the connection string.
// Actually, DATABASE_URL should work for pg client if passed directly.
const connectionString = process.env.DATABASE_URL;

const client = new Client({
    connectionString: connectionString,
});

async function run() {
    try {
        await client.connect();
        console.log('Successfully connected to the database!');
        const res = await client.query('SELECT NOW()');
        console.log('Current Time:', res.rows[0].now);
        await client.end();
    } catch (err) {
        console.error('Connection error:', err.stack);
        process.exit(1);
    }
}

run();
