import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
} from "@material-ui/core";
import { login } from "./store/utils/thunkCreators";
import { clearSearchedUsers } from "./store/conversations";
import chatIcon from "./assets/chat-icon.png";
import useStyles from "./themes/entryTheme";

const Login = (props) => {
  const history = useHistory();
  const { user, login } = props;
  const classes = useStyles();
  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;
    await login({ username, password });
  };
  if (user.id) {
    return <Redirect to="/home" />;
  }
  return (
    <Grid container className={classes.container}>
      <Grid
        container
        alignItems="center"
        justify="center"
        className={classes.bgCtnr}
      >
        <Box className={classes.bgContent}>
          <img src={chatIcon} alt="chat bubble with ellipses"></img>
          <h1 className={classes.bgText}>
            Converse with anyone with any language
          </h1>
        </Box>
      </Grid>
      <Box className={classes.interactCtnr}>
        <Grid container alignItems="flex-start" className={classes.contentCtnr}>
          <Grid
            container
            item
            alignItems="center"
            justify="flex-end"
            className={classes.headerCtnr}
          >
            <Typography className={classes.headerText}>
              Need to register?
            </Typography>
            <Box mx={2} className={classes.headBtnCtnr}>
              <Button
                onClick={() => history.push("/register")}
                className={`${classes.btn} ${classes.btnSecondary}`}
                variant="contained"
                size="large"
              >
                Register
              </Button>
            </Box>
          </Grid>
          <Grid
            container
            alignItems="center"
            justify="center"
            className={classes.formCtnr}
          >
            <Typography className={classes.labelText}>Welcome back!</Typography>
            <form className={classes.form} onSubmit={handleLogin}>
              <Grid>
                <Grid>
                  <FormControl
                    className={classes.w100}
                    margin="normal"
                    required
                  >
                    <TextField
                      aria-label="username"
                      label="Username"
                      name="username"
                      type="text"
                    />
                  </FormControl>
                </Grid>
                <FormControl margin="normal" className={classes.w100} required>
                  <TextField
                    label="Password"
                    aria-label="password"
                    type="password"
                    name="password"
                  />
                </FormControl>
                <Grid
                  container
                  alignItems="center"
                  justify="center"
                  mx={2}
                  className={classes.formBtnCtnr}
                >
                  <Button
                    type="submit"
                    className={`${classes.btn} ${classes.btnPrimary}`}
                    variant="contained"
                    size="large"
                  >
                    Login
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
};
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    login: (credentials) => {
      dispatch(login(credentials));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
