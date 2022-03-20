import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../src/redux/actions/action-creator";
import { ReduxState } from "./redux/reducers";
import { Props } from "../Types/UserTypes";

function App() {
  const dispatch = useDispatch();
  const users: Props[] = useSelector((state: ReduxState) => state.user);
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);
  console.log(users);
  return (
    <div className="App">
      {users.map((element, index) => {
        return <div key={index}>{element.name}</div>;
      })}
    </div>
  );
}

export default App;
