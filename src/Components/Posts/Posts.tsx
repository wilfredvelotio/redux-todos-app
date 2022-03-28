import React, { useCallback, useEffect, useState } from "react";
import { Link, Route, RouteComponentProps } from "react-router-dom";
import { Box, Button } from "@mui/material";
import { getAxios } from "src/Components/Reusable/AxiosAllMethods";
import { HeaderWrapper, DisplayWrapper } from "src/Components/Reusable/Wrapper";
import { useInView } from "react-intersection-observer";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "src/redux/actions/action-creator";
import { ReduxState } from "src/redux/reducers";
import { FetchPosts } from "src/redux/reducers/PostsReducer";
import PostsForm from "src/Components/MyForms/Posts";
import { Loader } from "src/Components/Reusable/Wrapper";
import { useFetchUserName } from "src/Components/Reusable/useFetchUserName";

type TypeParam = { uid: string };

const Posts: React.FC<RouteComponentProps<TypeParam>> = ({ match }) => {
  const uid = match.params.uid;
  const username = useFetchUserName(uid);
  const { ref, inView } = useInView({ threshold: 0.9, triggerOnce: true });
  const dispatch = useDispatch();
  const posts: FetchPosts = useSelector((state: ReduxState) => state.posts);
  const url = `users/${uid}/posts?_start=${posts.pageStart}&_limit=${posts.pageLimit}`;

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
