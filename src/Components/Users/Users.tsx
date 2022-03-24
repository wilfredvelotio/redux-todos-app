import React, { useEffect } from "react";
import logo from "./logo.svg";
import { useDispatch, useSelector } from "react-redux";
import { ReduxState } from "../..//redux/reducers";
import { Props } from "./UserTypes";
import { useInView } from "react-intersection-observer";
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
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";
import styles from "./Users.module.scss";
import { StyledEngineProvider } from "@mui/material";
import { FetchProps } from "../../redux/reducers/UserReducer";
import { fetchUsers } from "../../redux/actions/action-creator";
import MyForms from "../MyForms/MyForms";

interface GridProps {
  inView: boolean;
  myref: ((instance: HTMLDivElement | null) => void) | React.RefObject<HTMLDivElement> | null | undefined;
  users: Props[];
}

const Loader: React.FC<{ myView: boolean }> = React.memo(({ myView }) => {
  return <>{!myView ? <Loading /> : <LoaderHeight />}</>;
});

const User: React.FC = () => {
  const { ref, inView } = useInView({ threshold: 0.9, triggerOnce: true });
  const dispatch = useDispatch();
  const users: FetchProps = useSelector((state: ReduxState) => state.user);
  const url = `https://jsonplaceholder.typicode.com/users?_start=${users.reference.pageStart}&_limit=${users.reference.pageLimit}`;

  useEffect(() => {
    if (inView || !users.didFirstLoad) {
      dispatch(fetchUsers(url, ref, users.reference.pageStart, users.reference.pageLimit, inView));
    }
  }, [inView]);

  return (
    <div className={styles.content}>
      <CenteredAppBar />
      <GridContainer inView={inView} myref={ref} users={users.data} />
      <Loader myView={inView} />
    </div>
  );
};

export const CenteredAppBar: React.FC = () => {
  return (
    <StyledEngineProvider injectFirst>
      <div className={styles.appbar__custom__div}>
        <AppBar className={styles.appbar__custom__header}>
          <div className={styles.divflex__justify__center}>
            <div>Todos And Posts App</div>
          </div>
        </AppBar>
      </div>
    </StyledEngineProvider>
  );
};

const GridContainer: React.FC<GridProps> = React.memo(({ inView, myref, users }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const handleMenu = () => {
    handleOpen();
  };
  return (
    <div>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {users?.map((user, index) => {
          return (
            <Grid ref={myref} item xs={2} sm={4} md={4} key={index}>
              <Box
                sx={{
                  boxShadow: 3,
                }}
              >
                <div style={{ display: "flex" }}>
                  <div className={styles.div__svg__fill}>
                    <MyForms
                      modalName="Edit User"
                      name={user.name}
                      userName={user.username}
                      email={user.email}
                      phone={user.phone}
                      website={user.website}
                      userIdProp={index}
                    />
                  </div>
                </div>

                <Link to={`/posts/${user.id}`}>
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
});

export const LoaderHeight: React.FC = () => {
  return <div style={{ minHeight: "100px" }}></div>;
};

export default User;
