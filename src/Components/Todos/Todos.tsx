import React, { useEffect, useState } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { getAxios } from "src/Components/Reusable/Network/AxiosAllMethods";
import { HeaderWrapper, DisplayWrapper } from "src/Components/Reusable/Components/Wrapper";
import { useInView } from "react-intersection-observer";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos } from "src/redux/actions/action-creator";
import { ReduxState } from "src/redux/reducers";
import { FetchTodos } from "src/redux/reducers/TodosReducer";
import { Loader } from "src/Components/Reusable/Components/Wrapper";
import { useFetchUserName } from "src/Components/Reusable/Network/useFetchUserName";
import TodosForm from "src/Components/MyForms/Todos";

type TypeParam = { uid: string };
const Todos: React.FC<RouteComponentProps<TypeParam>> = ({ match }) => {
  const uid = match.params.uid;
  const username = useFetchUserName(uid);
  const { ref, inView } = useInView({ threshold: 0.9, triggerOnce: true });
  const dispatch = useDispatch();
  const todos: FetchTodos = useSelector((state: ReduxState) => state.todos);
  const url = `users/${uid}/todos?_start=${todos.pageStart}&_limit=${todos.pageLimit}`;

  useEffect(() => {
    if (inView || !todos.didFirstLoad) {
      dispatch(fetchTodos(url, todos.pageStart, todos.pageLimit));
    }
  }, [inView, dispatch, url, todos.pageStart, todos.pageLimit, todos.didFirstLoad]);

  return (
    <>
      <TodosForm />
      <HeaderWrapper username={username} uid={uid}>
        <DisplayWrapper data={todos.data} myref={ref} />
      </HeaderWrapper>
      <Loader myView={inView} />
    </>
  );
};

export default Todos;
