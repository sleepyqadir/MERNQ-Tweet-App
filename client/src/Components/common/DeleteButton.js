import React, { useState, Fragment } from "react";
import { Button, Icon, Confirm, Popup } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import {
  DELETE_POST_MUTATION,
  FETCH_POST_QUERY,
  DELETE_COMMENT_MUTATION,
} from "../../utils/graphql";
function DeleteButton(props) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const mutation = props.commentId
    ? DELETE_COMMENT_MUTATION
    : DELETE_POST_MUTATION;
  const content = props.commentId ? "delete comment" : "delete post";

  const [deletePostOrComment] = useMutation(mutation, {
    update(proxy) {
      setConfirmOpen(false);
      if (!props.commentId) {
        const data = proxy.readQuery({
          query: FETCH_POST_QUERY,
        });
        data.getPosts = data.getPosts.filter(
          (post) => post.id !== props.postId
        );
        proxy.writeQuery({ query: FETCH_POST_QUERY, data });
      }
      if (props.callBack) {
        props.callBack();
      }
      // TODO: remove post from cache
    },
    variables: {
      postId: props.postId,
      commentId: props.commentId,
    },
  });
  return (
    <Fragment>
      <Popup
        content={content}
        trigger={
          <Button
            as="div"
            color="red"
            onClick={() => {
              setConfirmOpen(true);
            }}
            floated="right"
          >
            {" "}
            <Icon name="trash" style={{ margin: "0" }} />
          </Button>
        }
      />
      <Confirm
        open={confirmOpen}
        onCancel={() => {
          setConfirmOpen(false);
        }}
        onConfirm={() => {
          deletePostOrComment();
        }}
      ></Confirm>
    </Fragment>
  );
}

export default DeleteButton;
