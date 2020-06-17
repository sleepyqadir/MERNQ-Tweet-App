import React, { useContext, useState, useRef } from "react";
import {
  FETCH_SINGLE_POST_QUERY,
  SUBMIT_COMMENT_MUTATION,
} from "../utils/graphql";
import { useQuery, useMutation } from "@apollo/react-hooks";
import {
  Grid,
  Image,
  Card,
  Button,
  Icon,
  Label,
  Form,
} from "semantic-ui-react";
import moment from "moment";
import LikeButton from "../Components/common/LikeButton";
import { AuthContext } from "../Context/auth";
import DeleteButton from "../Components/common/DeleteButton";
function SinglePost(props) {
  const postId = props.match.params.postId;
  const { user } = useContext(AuthContext);
  const formInputReference = useRef(null);
  const { loading, data } = useQuery(FETCH_SINGLE_POST_QUERY, {
    variables: {
      postId,
    },
  });
  const [comment, setComment] = useState("");
  const [createComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
    variables: {
      postId,
      body: comment,
    },
    update() {
      setComment("");
      formInputReference.current.blur();
    },
    onError: (err) => {
      console.log(err);
    },
  });

  let postMarkup;
  function deleteButtonCallback() {
    props.history.push("/");
  }
  if (loading) {
    postMarkup = <h2>loading...</h2>;
  } else {
    const {
      id,
      username,
      likes,
      comments,
      createdAt,
      likeCount,
      commentCount,
      body,
    } = data.getPost;
    postMarkup = (
      <Grid>
        <Grid.Row>
          <Grid.Column width={2}>
            <Image
              src="https://react.semantic-ui.com/images/avatar/large/steve.jpg"
              size="small"
              float="right"
            />
          </Grid.Column>
          <Grid.Column width={10}>
            <Card fluid>
              <Card.Content>
                <Card.Header>{username}</Card.Header>
                <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                <Card.Description>{body}</Card.Description>
              </Card.Content>
              <hr />
              <Card.Content extra>
                <LikeButton user={user} post={{ id, likeCount, likes }} />
                <Button
                  as="div"
                  labelPosition="right"
                  onClick={() => {
                    console.log("comennt...");
                  }}
                >
                  <Button basic color="olive">
                    <Icon name="comments" />
                  </Button>
                  <Label basic color="olive" pointing="left">
                    {commentCount}
                  </Label>
                </Button>
                {user && user.username === username && (
                  <DeleteButton postId={id} callBack={deleteButtonCallback} />
                )}
              </Card.Content>
            </Card>
            {user && (
              <Card fluid style={{ padding: "20px" }}>
                <p>Post a comment</p>
                <Form>
                  <div className="ui action input fluid">
                    <input
                      type="text"
                      placeholder="coment..."
                      name="comment"
                      value={comment}
                      onChange={(event) => setComment(event.target.value)}
                      ref={formInputReference}
                    />

                    <button
                      type="submit"
                      className="ui button teal"
                      disabled={comment.trim() === "" ? true : false}
                      onClick={createComment}
                    >
                      Comment
                    </button>
                  </div>
                </Form>
              </Card>
            )}
            {comments.map((comment) => {
              return (
                <Card fluid key={comment.id}>
                  <Card.Content>
                    {user && user.username === username && (
                      <DeleteButton postId={id} commentId={comment.id} />
                    )}
                    <Card.Header>{comment.username}</Card.Header>
                    <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
                    <Card.Description>{comment.body}</Card.Description>
                  </Card.Content>
                </Card>
              );
            })}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
  return <div>{postMarkup}</div>;
}

export default SinglePost;
