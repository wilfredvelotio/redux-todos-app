import { AppBar, Box, Button, CircularProgress, Container, Grid, List, SxProps, Typography } from "@mui/material";
import React, { Children } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { modalOpenPost, modalOpenTodo } from "src/redux/actions/action-creator";
import Item from "@mui/material/ListItem";
import { SVGWrapper } from "src/Components/Reusable/Components/SVGWrapper";
import { modalOpen } from "src/redux/actions/action-creator";
import { Theme } from "@mui/system";
import {
  appBarBackgroundCenter,
  appHeaderBody,
  boxShadow,
  cardHeight,
  centerComponentMargin,
  centerImage,
  df,
  df_flex_center_min_h,
  displayFlexCenter,
  displayFlexSpaceEvenly,
  gridContainerAlignCenter,
  gridContainerCenter,
  gridHeader,
  gridItemCenter,
  monteSerrat,
  noTextStyleAlignLeft,
} from "./Styles";

interface HeaderWrapperProps {
  uid: string;
  username: string;
}

interface DisplayWrapperProps {
  data: MyPostProps[] | MyTodosProps[];
  myref: (node?: Element | null | undefined) => void;
}

interface WhichDisplayWrapperProps {
  post: MyPostProps | MyTodosProps;
  handleMenu: (post: MyTodosProps | MyPostProps) => void;
}

type TodosDisplayDataProps = {
  post: MyTodosProps;
  handleMenu: (post: MyTodosProps) => void;
};

type PostsDisplayDataProps = {
  post: MyPostProps;
  handleMenu: (post: MyPostProps) => void;
};

interface GridProps {
  inView: boolean;
  myref: ((instance: HTMLDivElement | null) => void) | React.RefObject<HTMLDivElement> | null | undefined;
  users: Props[];
}

export const HeaderWrapper: React.FC<HeaderWrapperProps> = ({ uid, username, children }) => {
  return (
    <Box sx={centerComponentMargin}>
      <Box sx={displayFlexSpaceEvenly}>
        <Box sx={df}>
          <Link to={`/posts/${uid}`} style={noTextStyleAlignLeft}>
            <Button variant="outlined" disableElevation>
              <div>{`User ${username} Posts`}</div>
            </Button>
          </Link>
          <Link to={`/todos/${uid}`} style={noTextStyleAlignLeft}>
            <Button variant="contained" disableElevation>
              {`User ${username} Todos`}
            </Button>
          </Link>
        </Box>
      </Box>
      {children}
    </Box>
  );
};

export const DisplayWrapper: React.FC<DisplayWrapperProps> = ({ data, myref }) => {
  const dispatch = useDispatch();
  const handleMenu = (post: MyPostProps | MyTodosProps) => {
    if ("completed" in post) {
      dispatch(modalOpenTodo(post));
    } else {
      dispatch(modalOpenPost(post));
    }
  };

  return (
    <>
      <div>
        {data?.map((post, index) => {
          return (
            <div ref={myref} key={index} style={monteSerrat}>
              <WhichDisplayWrapper post={post} handleMenu={handleMenu} />
            </div>
          );
        })}
      </div>
    </>
  );
};

export const WhichDisplayWrapper: React.FC<WhichDisplayWrapperProps> = ({ post, handleMenu }) => {
  if ("completed" in post) return <TodosDisplayData post={post} handleMenu={handleMenu} />;
  else
    return (
      <>
        <PostDisplayData post={post} handleMenu={handleMenu} />
      </>
    );
};

export const PostDisplayData: React.FC<PostsDisplayDataProps> = ({ post, handleMenu }) => {
  const handleMenuEnable = () => {
    handleMenu(post);
  };
  return (
    <>
      <List>Title: {post.title}</List>
      <List>Body: {post.body}</List>
      <Button variant="outlined" onClick={handleMenuEnable}>
        Edit Post
      </Button>
    </>
  );
};

export const TodosDisplayData: React.FC<TodosDisplayDataProps> = ({ post, handleMenu }) => {
  const handleMenuEnable = () => {
    handleMenu(post);
  };
  return (
    <>
      <List>Title: {post.title}</List>
      <List>Completed: {`${post.completed} `}</List>
      <Button variant="outlined" onClick={handleMenuEnable}>
        Edit Todos
      </Button>
    </>
  );
};

export const GridContainer: React.FC<GridProps> = React.memo(({ inView, myref, users }) => {
  const dispatch = useDispatch();

  const handleMenu = (user: Props) => {
    dispatch(modalOpen(user));
  };

  return (
    <Container sx={gridHeader}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {users?.map((user, index) => {
          return (
            <Grid ref={myref} item xs={2} sm={4} md={4} key={index}>
              <Box sx={boxShadow}>
                <Box sx={gridContainerCenter} onClick={() => handleMenu(user)}>
                  <SVGWrapper />
                </Box>

                <Link to={`/posts/${user.id}`}>
                  <div style={gridContainerAlignCenter}>
                    <div style={cardHeight}>
                      <img src={`https://picsum.photos/500/300?random=${index}`} style={centerImage} />
                    </div>
                  </div>
                  <div>
                    <Item sx={gridItemCenter}>
                      <Typography variant="h6">{user.name}</Typography>
                    </Item>
                  </div>
                </Link>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
});

export const CenteredAppBar: React.FC<{ name: string }> = ({ name }) => {
  return (
    <Box sx={appHeaderBody}>
      <AppBar sx={appBarBackgroundCenter}>
        <Box sx={displayFlexCenter}>
          <div>{name}</div>
        </Box>
      </AppBar>
    </Box>
  );
};

export const Loader: React.FC<{ myView: boolean }> = React.memo(({ myView }) => {
  return (
    <>
      {!myView ? (
        <Box sx={df_flex_center_min_h}>
          <CircularProgress />{" "}
        </Box>
      ) : (
        <Box sx={df_flex_center_min_h} />
      )}
    </>
  );
});
