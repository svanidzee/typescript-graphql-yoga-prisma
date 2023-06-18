import { createYoga } from 'graphql-yoga';
import { createServer } from 'node:http';
import { schema } from './schema';

const yoga = createYoga({
  schema: schema,
});

const server = createServer(yoga);

const port = Number(process.env.API_PORT) || 4000;

server.listen(port, () => {
  console.info('Server is running on http://localhost:4000/graphql');
});
