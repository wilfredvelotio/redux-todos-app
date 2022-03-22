import * as React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Loading from "./Components/Loading/Loading";

const Users = React.lazy(() => import("./Components/Users/Users"));

const Hello: React.FC = () => {
  return <>helo</>;
};
const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <React.Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Users />} />
            <Route path="/hello" element={<Hello />} />
          </Routes>
        </React.Suspense>
      </BrowserRouter>
    </>
  );
};

export default App;
