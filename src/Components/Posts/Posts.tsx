import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { LoaderHeight } from "../Users/Users";
import { Box, Button } from "@mui/material";
import { Props } from "../Users/UserTypes";
import { MyPostProps } from "./PostsTypes";
import { FetchAxios } from "../Posts/FetchGeneric";
import { HeaderWrapper, DisplayWrapper } from "../Reusable/Wrapper";
import { useInView } from "react-intersection-observer";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../redux/actions/action-creator";
import { ReduxState } from "../../redux/reducers";
import { FetchPosts } from "../../redux/reducers/PostsReducer";
import Loading from "../Loading/Loading";
import PostsForm from "../MyForms/Posts";

const Posts: React.FC = () => {
  const { uid } = useParams();
  const [state, setState] = useState<string>("Username");
  const fetchUserName = async () => {
    const { username } = await FetchAxios<Props>(`https://jsonplaceholder.typicode.com/users/${uid}`);
    setState((state) => username);
  };
  const { ref, inView } = useInView({ threshold: 0.9, triggerOnce: true });
  const dispatch = useDispatch();
  const posts: FetchPosts = useSelector((state: ReduxState) => state.posts);
  const url = `https://jsonplaceholder.typicode.com/users/${uid}/posts?_start=${posts.pageStart}&_limit=${posts.pageLimit}`;

  useEffect(() => {
    if (inView || !posts.didFirstLoad) {
      dispatch(fetchPosts(url, posts.pageStart, posts.pageLimit));
    }
  }, [inView]);

  useEffect(() => {
    fetchUserName();
  }, []);

  return (
    <>
      <PostsForm />
      <HeaderWrapper username={state} uid={uid}>
        <DisplayWrapper data={posts.data} myref={ref} />
      </HeaderWrapper>
      {!inView ? <Loading /> : <LoaderHeight />}
    </>
  );
};

export default Posts;
