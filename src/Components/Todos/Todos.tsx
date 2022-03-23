import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { LoaderHeight } from "../Users/Users";
import { Box, Button } from "@mui/material";
import { Props } from "../Users/UserTypes";
import { MyTodosProps } from "./TodosTypes";
import { FetchAxios } from "../Posts/FetchGeneric";
import { HeaderWrapper, DisplayWrapper } from "../Reusable/HeaderWrapper";
import { useInView } from "react-intersection-observer";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, fetchTodos } from "../../redux/actions/action-creator";
import { ReduxState } from "../../redux/reducers";
import { FetchPosts } from "../../redux/reducers/PostsReducer";

const Todos: React.FC = () => {
  const { uid } = useParams();
  const [state, setState] = useState<string>("Username");
  const fetchUserName = async () => {
    const { username } = await FetchAxios<Props>(`https://jsonplaceholder.typicode.com/users/${uid}`);
    setState((state) => username);
  };
  const { ref, inView } = useInView({ threshold: 0.9, triggerOnce: true });
  const dispatch = useDispatch();
  const todos: FetchPosts = useSelector((state: ReduxState) => state.todos);
  const url = `https://jsonplaceholder.typicode.com/users/${uid}/todos?_start=${todos.reference.pageStart}&_limit=${todos.reference.pageLimit}`;

  useEffect(() => {
    if (inView || !todos.didFirstLoad) {
      dispatch(fetchPosts(url, ref, todos.reference.pageStart, todos.reference.pageLimit, inView));
    }
  }, [inView]);

  console.log(todos);
  useEffect(() => {
    fetchUserName();
  }, []);
  console.log(todos);
  return (
    <>
      <HeaderWrapper post={false} username={state} uid={uid} />
      <DisplayWrapper data={todos.data} myView={inView} myref={ref} />
    </>
  );
};

export default Todos;
