import SchemaBuilder from '@pothos/core';
import { DateResolver } from 'graphql-scalars';
import PrismaPlugin from '@pothos/plugin-prisma';
import type PrismaTypes from '@pothos/plugin-prisma/generated';

import { prisma } from './db';

// 1.prisma manages db schema(shape of our data in db)
// 2.pothos use types generated from @pothos/plugin-prisma/generated to let us know how to build graphql api

export const builder = new SchemaBuilder<{
  // graphql does not have Date types: in this project createdAt field
  // we have to set that up by ourselves via graphql-scalars package
  Scalars: {
    // this tells pothos/core how to use Date types in schema
    Date: { Input: Date; Output: Date };
  };
  // prisma types should follow types that we generated via @pothos/plugin-prisma/generated
  PrismaTypes: PrismaTypes;
}>({
  plugins: [PrismaPlugin],
  prisma: {
    client: prisma,
  },
});

// create type Query entry point to your graphql api like this:
/*
type Query {
    
}
*/
builder.queryType({});

// add scalar type to builder
builder.addScalarType('Date', DateResolver, {});
