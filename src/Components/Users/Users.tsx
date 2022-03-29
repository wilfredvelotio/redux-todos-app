import React, { useCallback, useEffect } from "react";
import logo from "./logo.svg";
import { useDispatch, useSelector } from "react-redux";
import { ReduxState } from "src/redux/reducers";
import { useInView } from "react-intersection-observer";
import { FetchProps } from "src/redux/reducers/UserReducer";
import { fetchUsers, modalOpen } from "src/redux/actions/action-creator";
import MyForms from "src/Components/MyForms/MyForms";
import { CenteredAppBar, GridContainer, Loader } from "src/Components/Reusable/Components/Wrapper";

const User: React.FC = () => {
  const { ref, inView } = useInView({ threshold: 0.9, triggerOnce: true });
  const dispatch = useDispatch();
  const users: FetchProps = useSelector((state: ReduxState) => state.user);
  const url = `users?_start=${users.pageStart}&_limit=${users.pageLimit}`;

  useEffect(() => {
    if (inView || !users.didFirstLoad) {
      dispatch(fetchUsers(url, users.pageStart, users.pageLimit));
    }
  }, [inView, dispatch, url, users.pageStart, users.pageLimit, users.didFirstLoad]);
  return (
    <div>
      <CenteredAppBar name="Todos and Posts App" />
      <MyForms />
      <GridContainer inView={inView} myref={ref} users={users.data} />
      <Loader myView={inView} />
    </div>
  );
};

export default User;
