const { ApolloServer } = require("apollo-server");
const gql = require("graphql-tag");
const mongoose = require("mongoose");

const resolvers = require("./graphql/resolvers/index");
const typeDefs = require("./graphql/typeDefs");
const { MONGODB } = require("./config");

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

mongoose
  .connect(MONGODB, { useNewUrlParser: true })
  .then(() => {
    console.log("Database connected successfully");
    return server.listen({ port: 5000 });
  })
  .then((res) => {
    console.log(`server running at port ${res.url}`);
  });
