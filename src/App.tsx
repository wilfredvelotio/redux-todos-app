import * as React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

const Users = React.lazy(() => import("./Components/Users/Users"));
const Posts = React.lazy(() => import("./Components/Posts/Posts"));
const Todos = React.lazy(() => import("./Components/Todos/Todos"));

const App: React.FC = () => {
  return (
    <>
      <Router>
        <Switch>
          <React.Suspense fallback={<CircularProgress />}>
            <Route exact path="/" component={Users} />
            <Route path="/posts/:uid" component={Posts} />
            <Route path="/todos/:uid" component={Todos} />
          </React.Suspense>
        </Switch>
      </Router>
    </>
  );
};

export default App;
