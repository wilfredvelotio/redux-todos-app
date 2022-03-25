import * as React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

const Users = React.lazy(() => import("./Components/Users/Users"));
const Posts = React.lazy(() => import("./Components/Posts/Posts"));
const Todos = React.lazy(() => import("./Components/Todos/Todos"));

const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <React.Suspense fallback={<CircularProgress />}>
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
