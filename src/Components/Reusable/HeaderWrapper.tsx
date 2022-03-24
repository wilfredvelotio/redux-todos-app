import { Button } from "@mui/material";
import React, { Children } from "react";
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";
import { MyPostProps } from "../Posts/PostsTypes";
import { MyTodosProps } from "../Todos/TodosTypes";

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

interface DisplayWrapperProps<T> {
  data: T[];
  myref: (node?: Element | null | undefined) => void;
  myView: boolean;
  children?: React.ReactNode;
}
export const DisplayWrapper = <T extends MyPostProps | MyTodosProps>(props: DisplayWrapperProps<T>) => {
  return (
    <>
      <div>
        {props.data?.map((post, index) => {
          return (
            <div
              ref={props.myref}
              key={index}
              style={{
                fontFamily: `'Montserrat','sans-serif'`,
                minHeight: "200px",
              }}
            >
              {post.title}
            </div>
          );
        })}

        {props.children}
        {!props.myView ? <Loading /> : <LoaderHeight />}
      </div>
    </>
  );
};
export const LoaderHeight: React.FC = () => {
  return <div style={{ minHeight: "100px" }}></div>;
};
