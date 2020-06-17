import React, { useState, useEffect } from "react";
import { Button, Icon, Label } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import { LIKE_POST_MUTATION } from "../../utils/graphql";
function LikeButton({ user, post: { id, likes, likeCount } }) {
  const [liked, setLiked] = useState(false);
  useEffect(() => {
    if (user && likes.find((like) => like.username === user.username)) {
      setLiked(true);
    }
  }, [user, likes]);
  const [likePost] = useMutation(LIKE_POST_MUTATION, {
    variables: { postId: id },
  });
  const likeButton = user ? (
    liked ? (
      <Button color="teal" onClick={likePost}>
        <Icon name="heart" />
      </Button>
    ) : (
      <Button color="teal" basic onClick={likePost}>
        <Icon name="heart" />
      </Button>
    )
  ) : (
    <Button as={Link} to="/login" color="teal" basic>
      <Icon name="heart" />
    </Button>
  );

  return (
    <Button as="div" labelPosition="right">
      {likeButton}
      <Label as="a" basic color="teal" pointing="left">
        {likeCount}
      </Label>
    </Button>
  );
}

export default LikeButton;
