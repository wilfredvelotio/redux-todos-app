import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { LoaderHeight } from "../Users/Users";
import { Box, Button } from "@mui/material";
import { Props } from "../Users/UserTypes";
import { FetchAxios } from "../Posts/FetchGeneric";
import { HeaderWrapper, DisplayWrapper } from "../Reusable/HeaderWrapper";
import { useInView } from "react-intersection-observer";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos } from "../../redux/actions/action-creator";
import { ReduxState } from "../../redux/reducers";
import { FetchTodos } from "../../redux/reducers/TodosReducer";

const Todos: React.FC = () => {
  const { uid } = useParams();
  const [state, setState] = useState<string>("Username");
  const fetchUserName = async () => {
    const { username } = await FetchAxios<Props>(`https://jsonplaceholder.typicode.com/users/${uid}`);
    setState((state) => username);
  };
  const { ref, inView } = useInView({ threshold: 0.9, triggerOnce: true });
  const dispatch = useDispatch();
  const todos: FetchTodos = useSelector((state: ReduxState) => state.todos);
  const url = `https://jsonplaceholder.typicode.com/users/${uid}/todos?_start=${todos.reference.pageStart}&_limit=${todos.reference.pageLimit}`;

  useEffect(() => {
    if (inView || !todos.didFirstLoad) {
      dispatch(fetchTodos(url, ref, todos.reference.pageStart, todos.reference.pageLimit, inView));
    }
  }, [inView]);

  useEffect(() => {
    fetchUserName();
  }, []);

  console.log(todos);
  return (
    <>
      <HeaderWrapper username={state} uid={uid} />
      <DisplayWrapper data={todos.data} myView={inView} myref={ref} />
    </>
  );
};

export default Todos;
