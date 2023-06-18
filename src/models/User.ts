import { builder } from '../builder';
import { prisma } from '../db';

// graphql schema defines shape of data in your api
// prisma schema defines shape of data in db

// create graphql schema
// create User custom object type, to describe users
builder.prismaObject('User', {
  // helper fn to configure fields
  fields: (t) => ({
    id: t.exposeID('id'),
    name: t.exposeString('name'),
    messages: t.relation('messages'),
  }),
});

// same if we write schema type via sdl
/*
type User {
  id: ID!
  messages: [Message!]!
  name: String!
}
*/

builder.queryField('users', (t) =>
  t.prismaField({
    // adds a field to the GraphQL schema's query type: users: [User]
    type: ['User'],
    // resolver function
    resolve: async (query, root, args, ctx, info) => {
      return prisma.user.findMany({ ...query });
    },
  }),
);
