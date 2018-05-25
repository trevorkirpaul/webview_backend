const { GraphQLServer } = require('graphql-yoga')
const { Prisma } = require('prisma-binding')

const resolvers = {
  Query: {
    user: (_, args, context, info) => {
      return context.prisma.query.user(
        {
          where: {
            id: args.id,
          },
        },
        info,
      )
    },
    signin: (_, args, context, info) => {
      console.log({ username: args.email, password: args.password })
      return context.prisma.query.users(
        {
          where: {
            AND: [
              {email: args.email},
              {password: args.password},
            ]
          },
        },
        info,
      )
    },
  },
  Mutation: {
    signup: (_, args, context, info) => {
      return context.prisma.mutation.createUser(
        {
          data: {
            email: args.email,
            firstName: args.firstName,
            lastName: args.lastName,
            city: args.city,
            state: args.state,
            country: args.country,
            zip: args.zip,
            phone: args.phone,
            dob: args.dob,
            password: args.password,
          },
        },
        info,
      )
    } ,
  },
}

const server = new GraphQLServer({
  typeDefs: 'src/schema.graphql',
  resolvers,
  resolverValidationOptions: {
    requireResolversForResolveType: false
  },
  context: req => ({
    ...req,
    prisma: new Prisma({
      typeDefs: 'src/generated/prisma.graphql',
      endpoint: 'http://localhost:4466'
    })
  })
})

server.start(() => console.log(`GraphQL server is running on http://localhost:4000`))