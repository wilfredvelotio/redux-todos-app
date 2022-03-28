import { AppBar, Box, Button, CircularProgress, Container, Grid, List, SxProps, Typography } from "@mui/material";
import React, { Children } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { modalOpenPost, modalOpenTodo } from "src/redux/actions/action-creator";
import Item from "@mui/material/ListItem";
import { SVGWrapper } from "src/Components/Reusable/SVGWrapper";
import { modalOpen } from "src/redux/actions/action-creator";
import { Theme } from "@mui/system";

interface HeaderWrapperProps {
  uid: string;
  username: string;
}

export const HeaderWrapper: React.FC<HeaderWrapperProps> = ({ uid, username, children }) => {
  return (
    <div style={{ maxWidth: "1080px", margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <div style={{ display: "flex" }}>
          <Link
            to={`/posts/${uid}`}
            style={{
              textDecoration: "none",
              marginLeft: "auto",
            }}
          >
            <Button variant="outlined" disableElevation>
              <div>{`User ${username} Posts`}</div>
            </Button>
          </Link>
          <Link
            to={`/todos/${uid}`}
            style={{
              textDecoration: "none",
              marginLeft: "auto",
            }}
          >
            <Button variant="contained" disableElevation>
              {`User ${username} Todos`}
            </Button>
          </Link>
        </div>
      </div>
      {children}
    </div>
  );
};

interface DisplayWrapperProps {
  data: MyPostProps[] | MyTodosProps[];
  myref: (node?: Element | null | undefined) => void;
}

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
            <div
              ref={myref}
              key={index}
              style={{
                fontFamily: `'Montserrat','sans-serif'`,
                minHeight: "200px",
              }}
            >
              <WhichDisplayWrapper post={post} handleMenu={handleMenu} />
            </div>
          );
        })}
      </div>
    </>
  );
};

interface WhichDisplayWrapperProps {
  post: MyPostProps | MyTodosProps;
  handleMenu: (post: MyTodosProps | MyPostProps) => void;
}
export const WhichDisplayWrapper: React.FC<WhichDisplayWrapperProps> = ({ post, handleMenu }) => {
  if ("completed" in post) return <TodosDisplayData post={post} handleMenu={handleMenu} />;
  else
    return (
      <>
        <PostDisplayData post={post} handleMenu={handleMenu} />
      </>
    );
};

type PostsDisplayDataProps = {
  post: MyPostProps;
  handleMenu: (post: MyPostProps) => void;
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
type TodosDisplayDataProps = {
  post: MyTodosProps;
  handleMenu: (post: MyTodosProps) => void;
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

interface GridProps {
  inView: boolean;
  myref: ((instance: HTMLDivElement | null) => void) | React.RefObject<HTMLDivElement> | null | undefined;
  users: Props[];
}

const gridHeader: SxProps<Theme> = {
  display: "flex",
  pt: 6,
  m: 0,
  mx: "auto",
  maxWidth: "md",
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
              <Box
                sx={{
                  boxShadow: 3,
                }}
              >
                <Box
                  sx={{
                    backgroundColor: "#8b5cf6 ",
                    height: " 45px",
                    width: " 47px",
                    display: " flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginLeft: "auto",
                    cursor: "pointer",
                  }}
                  style={{ display: "flex" }}
                  onClick={() => handleMenu(user)}
                >
                  <SVGWrapper />
                </Box>

                <Link to={`/posts/${user.id}`}>
                  <div
                    style={{
                      minHeight: "300px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <div style={{ height: "230px", width: "230px" }}>
                      <img
                        src={`https://picsum.photos/500/300?random=${index}`}
                        style={{
                          borderRadius: "50%",
                          height: "100%",
                          width: "100%",
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <Item
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        minHeight: "80px",
                      }}
                    >
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
    <Box sx={{ display: "flex", maxWidth: "1080px", height: "80px" }}>
      <AppBar
        sx={{
          backgroundColor: "#7c3aed",
          fontSize: "40px",
          justifyContent: "center",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <div>{name}</div>
        </Box>
      </AppBar>
    </Box>
  );
};

export const Loader: React.FC<{ myView: boolean }> = React.memo(({ myView }) => {
  return <>{!myView ? <CircularProgress sx={{ display: "flex", mx: "auto" }} /> : <Box sx={{ minWidth: 10 }} />}</>;
});
