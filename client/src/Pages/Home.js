import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Grid } from "semantic-ui-react";
import PostCard from "../Components/PostCard";
import { AuthContext } from "../Context/auth";
import PostForm from "../Components/PostForm";
import { FETCH_POST_QUERY } from "../utils/graphql"; 
function Home() {
  const { loading, data, error } = useQuery(FETCH_POST_QUERY);
  const { user } = useContext(AuthContext);
  return (
    <div>
      <Grid columns="three">
        {user && (
          <Grid.Row className="page_title">
            <PostForm />
          </Grid.Row>
        )}
        <Grid.Row className="page_title">
          <h1>Recent Posts</h1>
        </Grid.Row>
        <Grid.Row>
          {loading ? (
            <h1>loading...</h1>
          ) : (
            data.getPosts &&
            data.getPosts.map((post) => {
              return (
                <Grid.Column key={post.id} style={{ marginBottom: "15px" }}>
                  <PostCard post={post} />
                </Grid.Column>
              );
            })
          )}
        </Grid.Row>
      </Grid>
    </div>
  );
}

export default Home;
