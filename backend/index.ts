import fastify from 'fastify';

const server = fastify();

import { Pool } from 'pg';

const pool = new Pool({
  host: 'postgres',
  database: 'postgres_db',
  user: 'postgres',
  password: 'password',
  port: 54321,
});

server.get('/', async (request, reply) => {
  const { rows } = await pool.query('select * from users');
  console.log(rows);
  return reply.send(rows);
});

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
