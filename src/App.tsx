import * as React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Link, useRoutes } from "react-router-dom";
import Loading from "./Components/Loading/Loading";
import Posts from "./Components/Posts/Posts";
import Todos from "./Components/Todos/Todos";
const Users = React.lazy(() => import("./Components/Users/Users"));

const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <React.Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Users />} />
            <Route path="/posts/:uid" element={<Posts />} />
            <Route path="/todos/:uid" element={<Todos />} />
          </Routes>
        </React.Suspense>
      </BrowserRouter>
    </>
  );
};

export default App;
