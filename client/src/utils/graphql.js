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
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      comments {
        id
        username
        createdAt
        body
      }
      commentCount
    }
  }
`;

export const LIKE_POST_MUTATION = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        username
      }
      likeCount
    }
  }
`;

export const FETCH_SINGLE_POST_QUERY = gql`
  query($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      comments {
        id
        username
        createdAt
        body
      }
      commentCount
    }
  }
`;

export const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

export const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      comments {
        id
        username
        createdAt
        body
      }
      commentCount
    }
  }
`;

export const SUBMIT_COMMENT_MUTATION = gql`
  mutation createComment($postId: ID!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      comments {
        id
        username
        createdAt
        body
      }
      commentCount
    }
  }
`;
