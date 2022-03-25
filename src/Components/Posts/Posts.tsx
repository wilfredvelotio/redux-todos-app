import React, { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Box, Button } from "@mui/material";
import { Props } from "src/Components/Users/UserTypes";
import { MyPostProps } from "src/Components/Posts/PostsTypes";
import { FetchAxios } from "src/Components/Posts/FetchGeneric";
import { HeaderWrapper, DisplayWrapper } from "../Reusable/Wrapper";
import { useInView } from "react-intersection-observer";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "src/redux/actions/action-creator";
import { ReduxState } from "src/redux/reducers";
import { FetchPosts } from "src/redux/reducers/PostsReducer";
import PostsForm from "src/Components/MyForms/Posts";
import { Loader } from "src/Components/Users/Users";
import { useFetchUserName } from "src/Components/Reusable/useFetchUserName";

const Posts: React.FC = () => {
  const { uid } = useParams();
  const username = useFetchUserName(uid);
  const { ref, inView } = useInView({ threshold: 0.9, triggerOnce: true });
  const dispatch = useDispatch();
  const posts: FetchPosts = useSelector((state: ReduxState) => state.posts);
  const url = `https://jsonplaceholder.typicode.com/users/${uid}/posts?_start=${posts.pageStart}&_limit=${posts.pageLimit}`;

  useEffect(() => {
    if (inView || !posts.didFirstLoad) {
      dispatch(fetchPosts(url, posts.pageStart, posts.pageLimit));
    }
  }, [dispatch, inView, url, posts.pageStart, posts.pageLimit, posts.didFirstLoad]);

  return (
    <>
      <PostsForm />
      <HeaderWrapper username={username} uid={uid}>
        <DisplayWrapper data={posts.data} myref={ref} />
      </HeaderWrapper>
      <Loader myView={inView} />
    </>
  );
};

export default Posts;
