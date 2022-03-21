import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../src/redux/actions/action-creator";
import { ReduxState } from "./redux/reducers";
import { Props } from "../Types/UserTypes";
import { useInView } from "react-intersection-observer";
import { FetchProps } from "./redux/reducers/UserReducer";
import axios from "axios";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Item from "@mui/material/ListItem";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Loading from "./Components/Loading/Loading";
import { Link } from "react-router-dom";
import styles from "./Users.module.scss";

interface GridProps {
  inView: boolean;
  myref:
    | ((instance: HTMLDivElement | null) => void)
    | React.RefObject<HTMLDivElement>
    | null
    | undefined;
  users: Props[];
}

const App: React.FC = () => {
  const { ref, inView } = useInView({ threshold: 0.9, triggerOnce: true });
  const dispatch = useDispatch();
  const users: FetchProps = useSelector((state: ReduxState) => state.user);
  useEffect(() => {
    if (inView || !users.didURLChange) {
      console.log(
        `https://jsonplaceholder.typicode.com/users?_start=${users.reference.pageStart}&_limit=${users.reference.pageLimit}`
      );
      dispatch(
        fetchProducts(
          `https://jsonplaceholder.typicode.com/users?_start=${users.reference.pageStart}&_limit=${users.reference.pageLimit}`
        )
      );
    }
  }, [inView]);
  console.log(users);
  return (
    <div className={styles.content}>
      <CenteredAppBar />
      <GridContainer inView={inView} myref={ref} users={users.data} />
      {!inView ? <Loading /> : <LoaderHeight />}
    </div>
  );
};

export const CenteredAppBar: React.FC = () => {
  return (
    <div style={{ minHeight: "80px", fontSize: "30px" }}>
      <AppBar
        style={{ backgroundColor: "#7c3aed" }}
        sx={{ height: "50px", fontSize: "40px" }}
      >
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div>Todos And Posts App</div>
        </div>
      </AppBar>
    </div>
  );
};

const GridContainer: React.FC<GridProps> = React.memo(
  ({ inView, myref, users }) => {
    return (
      <div>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {users?.map((user, index) => {
            return (
              <Grid ref={myref} item xs={2} sm={4} md={4} key={index}>
                <Box
                  sx={{
                    boxShadow: 3,
                  }}
                >
                  <div style={{ display: "flex" }}>
                    <Link
                      to="/forms"
                      style={{
                        textDecoration: "none",
                        marginLeft: "auto",
                      }}
                    >
                      <div className={styles.div__svg__fill}>
                        <svg
                          viewBox="-30 -2 180 75"
                          width="35"
                          height="30"
                          style={{
                            fill: "#fefefe",
                            boxShadow: "inset 0 0 0 2px #fefefe",
                          }}
                        >
                          <rect width="120" height="10"></rect>
                          <rect y="30" width="120" height="10"></rect>
                          <rect y="60" width="120" height="10"></rect>
                        </svg>
                      </div>
                    </Link>
                  </div>

                  <Link to={`${user.id}/posts`}>
                    <div
                      style={{
                        minHeight: "300px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <div style={{ height: "230px", width: "230px" }}>
                        <img
                          src={`https://picsum.photos/500/300?random=${index}`}
                          style={{
                            borderRadius: "50%",
                            height: "100%",
                            width: "100%",
                          }}
                        />
                      </div>
                    </div>
                    <div>
                      <Item
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          minHeight: "80px",
                        }}
                      >
                        <Typography variant="h6">{user.name}</Typography>
                      </Item>
                    </div>
                  </Link>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </div>
    );
  }
);

export const LoaderHeight: React.FC = () => {
  return <div style={{ minHeight: "100px" }}></div>;
};

export default App;
