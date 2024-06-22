import pool from '../../../lib/db';

export async function POST(request) {
  const { name, email } = await request.json();

  // Validate input
  if (!name || !email) {
    return new Response(JSON.stringify({ message: 'Name and email are required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      const queryText = 'INSERT INTO waitlist(name, email) VALUES($1, $2) RETURNING *';
      const res = await client.query(queryText, [name, email]);
      await client.query('COMMIT');

      return new Response(JSON.stringify({ message: 'Successfully added to waitlist', data: res.rows[0] }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ message: 'Error saving data', error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}