import pool from '../../../lib/db';

export async function POST(request) {
  const { email } = await request.json();

  // Validate input
  if (!email) {
    return new Response(JSON.stringify({ message: 'email is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      const queryText = 'INSERT INTO waitlist(email) VALUES($1) RETURNING *';
      const res = await client.query(queryText, [email]);
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