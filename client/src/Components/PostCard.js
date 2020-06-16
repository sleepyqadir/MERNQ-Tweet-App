import React from "react";
import { Card, Image, Icon, Label, Button } from "semantic-ui-react";
import moment from "moment";
import { Link } from "react-router-dom";
function PostCard({
  post: { username, body, likeCount, commentCount, createdAt ,id},
}) {
  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/steve.jpg"
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`posts/${id}`}>{body}</Card.Meta>
        <Card.Description>{moment(createdAt).fromNow()}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button as="div" labelPosition="right">
          <Button color="teal" basic>
            <Icon name="heart" />
          </Button>
          <Label as="a" basic color="teal" pointing="left">
            {likeCount}
          </Label>
        </Button>
        <Button as="div" labelPosition="right">
          <Button basic color="olive">
            <Icon name="comments" />
          </Button>
          <Label as={Link} to={`posts/${id}`} basic color="olive" pointing="left">
            {commentCount}
          </Label>
        </Button>
      </Card.Content>
    </Card>
  );
}

export default PostCard;
