import React from "react";
import { Form, Button } from "semantic-ui-react";
import { useForm } from "../utils/hooks";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { FETCH_POST_QUERY } from "../utils/graphql";

const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      createdAt
      username
      likes {
        id
        username
        createdAt
      }
      likeCount
      commentCount
      comments {
        id
        body
        username
        createdAt
      }
    }
  }
`;

function PostForm() {
  const { values, onHandleSubmit, onHandleChange } = useForm(
    createPostCallback,
    {
      body: "",
    }
  );

  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_POST_QUERY,
      });
      data.getPosts = [result.data.createPost, ...data.getPosts];
      console.log(data, proxy);
      proxy.writeQuery({
        query: FETCH_POST_QUERY,
        variables: { id: result.data.createPost.id },
        data,
      });
      values.body = "";
    },
    onError: (err) => {
      console.log(err);
    },
  });
  console.log(error);
  function createPostCallback() {
    createPost();
  }

  return (
    <div className="app_form">
      <Form onSubmit={onHandleSubmit}>
        <h2>Create new post:</h2>
        <Form.Field>
          <Form.Input
            placeholder="Hi world!"
            name="body"
            error={error ? true : false}
            onChange={onHandleChange}
            value={values.body}
          />
        </Form.Field>
        <Button type="submit" color="teal">
          Post
        </Button>
      </Form>
      {error && (
        <div className="ui error message">
          <ul className="list">
            <li>{error.graphQLErrors[0].message}</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default PostForm;
