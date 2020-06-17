import React, { useContext } from "react";
import { Card, Image, Icon, Label, Button } from "semantic-ui-react";
import moment from "moment";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/auth";
import LikeButton from "./common/LikeButton";
import DeleteButton from "./common/DeleteButton";
function PostCard({
  post: { username, likes, body, likeCount, commentCount, createdAt, id },
}) {
  const { user } = useContext(AuthContext);
  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/steve.jpg"
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`posts/${id}`}>
          {body}
        </Card.Meta>
        <Card.Description>{moment(createdAt).fromNow()}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <LikeButton user={user} post={{ id, likes, likeCount }} />
        <Button as="div" labelPosition="right" as={Link} to={`/posts/${id}`}>
          <Button basic color="olive">
            <Icon name="comments" />
          </Button>
          <Label basic color="olive" pointing="left">
            {commentCount}
          </Label>
        </Button>
        {user && user.username === username && <DeleteButton postId={id} />}
      </Card.Content>
    </Card>
  );
}

export default PostCard;
