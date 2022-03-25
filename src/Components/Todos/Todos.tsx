import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Props } from "src/Components/Users/UserTypes";
import { FetchAxios } from "src/Components/Posts/FetchGeneric";
import { HeaderWrapper, DisplayWrapperTodos } from "src/Components/Reusable/Wrapper";
import { useInView } from "react-intersection-observer";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos } from "src/redux/actions/action-creator";
import { ReduxState } from "src/redux/reducers";
import { FetchTodos } from "src/redux/reducers/TodosReducer";
import { Loader } from "src/Components/Users/Users";
import { useFetchUserName } from "src/Components/Reusable/useFetchUserName";

const Todos: React.FC = () => {
  const { uid } = useParams();
  const username = useFetchUserName(uid);
  const { ref, inView } = useInView({ threshold: 0.9, triggerOnce: true });
  const dispatch = useDispatch();
  const todos: FetchTodos = useSelector((state: ReduxState) => state.todos);
  const url = `https://jsonplaceholder.typicode.com/users/${uid}/todos?_start=${todos.pageStart}&_limit=${todos.pageLimit}`;

  useEffect(() => {
    if (inView || !todos.didFirstLoad) {
      dispatch(fetchTodos(url, todos.pageStart, todos.pageLimit));
    }
  }, [inView, dispatch, url, todos.pageStart, todos.pageLimit, todos.didFirstLoad]);

  return (
    <>
      <HeaderWrapper username={username} uid={uid}>
        <DisplayWrapperTodos data={todos.data} myref={ref} />
      </HeaderWrapper>
      <Loader myView={inView} />
    </>
  );
};

export default Todos;
