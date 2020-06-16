import gql from "graphql-tag";

export const LOGIN_USER_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(loginInput: { username: $username, password: $password }) {
      username
      createdAt
      email
      token
      id
    }
  }
`;
export const REGISTER_USER_MUTATION = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      username
      createdAt
      email
      token
      id
    }
  }
`;
export const FETCH_POST_QUERY = gql`
  {
    getPosts {
      id
      username
      body
      createdAt
      comments {
        id
        body
        createdAt
        username
      }
      likes {
        id
        createdAt
        username
      }
      likeCount
      commentCount
    }
  }
`;
