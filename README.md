# GraphQL backend

## Prisma, GraphQL-Yoga, AWS Cognito features

This backend was build with Prisma, a powerful CLI tool that, along with Docker, will create your database and create all the GraphQL queries and mutations necessary for CRUD functionality.

Afterwards, GraphQL-Yoga, a very lightweight express lib, is used to extend user facing endpoints in it's own server.

This repo also has code showing how to call Cognito methods in JavaScript using the `Amazon Cognito Identity NPM Package`.

You can find all of the Cognito functions, converted to promised based helpers, in `src/cognitoMethods/`

I'll be using them in the GraphQL resolvers. This will showcase how versatile GraphQL is as well as its supporting libraries.