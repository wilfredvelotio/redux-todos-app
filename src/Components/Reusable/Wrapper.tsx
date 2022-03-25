import { Button, List } from "@mui/material";
import React, { Children } from "react";
import { Link } from "react-router-dom";
import { MyPostProps } from "../Posts/PostsTypes";
import { MyTodosProps } from "../Todos/TodosTypes";
import { useDispatch, useSelector } from "react-redux";
import { ReduxState } from "../..//redux/reducers";
import { modalOpenPost } from "../../redux/actions/action-creator";

interface HeaderWrapperProps {
  uid: string | undefined;
  username: string | undefined;
  children?: React.ReactNode;
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
  data: MyPostProps[];
  myref: (node?: Element | null | undefined) => void;
}

export const DisplayWrapper: React.FC<DisplayWrapperProps> = ({ data, myref }) => {
  //
  const dispatch = useDispatch();
  const handleMenu = (post: MyPostProps) => {
    dispatch(modalOpenPost(post));
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
              <List>Title: {post.title}</List>
              <List>Body: {post.body}</List>
              <Button variant="outlined" onClick={() => handleMenu(post)}>
                Edit Post
              </Button>
            </div>
          );
        })}
      </div>
    </>
  );
};

interface DisplayWrapperPostProps {
  data: MyTodosProps[];
  myref: (node?: Element | null | undefined) => void;
}

export const DisplayWrapperTodos: React.FC<DisplayWrapperPostProps> = ({ data, myref }) => {
  //

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
              <List>Title: {post.title}</List>
              <List>Completed: {`${post.completed} `}</List>
            </div>
          );
        })}
      </div>
    </>
  );
};
