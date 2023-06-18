import { createYoga } from 'graphql-yoga';
import { createServer } from 'node:http';

import { schema } from './schema';

const port = Number(process.env.API_PORT) || 4000;

function main() {
  const yoga = createYoga({ schema });
  const server = createServer(yoga);
  server.listen(port, () => {
    console.info('Server is running on http://localhost:4000/graphql');
  });
}

main();
