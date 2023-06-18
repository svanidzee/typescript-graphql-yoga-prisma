import SchemaBuilder from '@pothos/core';
import { DateResolver } from 'graphql-scalars';

export const builder = new SchemaBuilder<{
  // graphql does not have Date types, in this project createdAt field
  // we have to set that up by ourselves via graphql- scalars package
  Scalars: {
    // this tells pothos/core how to use Date types in schema
    Date: { Input: Date; Output: Date };
  };
}>({});

// add scalar type to builder
builder.addScalarType('Date', DateResolver, {});
