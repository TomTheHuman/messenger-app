import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
  FormHelperText,
} from "@material-ui/core";
import { register } from "./store/utils/thunkCreators";
import chatIcon from "./assets/chat-icon.png";
import useStyles from "./themes/entryTheme";

const Signup = (props) => {
  const history = useHistory();
  const { user, register } = props;
  const [formErrorMessage, setFormErrorMessage] = useState({});
  const classes = useStyles();

  const handleRegister = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (password !== confirmPassword) {
      setFormErrorMessage({ confirmPassword: "Passwords must match" });
      return;
    }

    await register({ username, email, password });
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
                onClick={() => history.push("/login")}
                className={`${classes.btn} ${classes.btnSecondary}`}
                variant="contained"
                size="large"
              >
                Login
              </Button>
            </Box>
          </Grid>
          <Grid
            container
            alignItems="center"
            justify="center"
            className={classes.formCtnr}
          >
            <Typography className={classes.labelText}>
              Create an account.
            </Typography>
            <form className={classes.form} onSubmit={handleRegister}>
              <Grid>
                <Grid>
                  <FormControl className={classes.w100}>
                    <TextField
                      aria-label="username"
                      label="Username"
                      name="username"
                      type="text"
                      required
                    />
                  </FormControl>
                </Grid>
                <Grid>
                  <FormControl className={classes.w100}>
                    <TextField
                      label="E-mail Address"
                      aria-label="e-mail address"
                      type="email"
                      name="email"
                      required
                    />
                  </FormControl>
                </Grid>
                <Grid>
                  <FormControl
                    className={classes.w100}
                    error={!!formErrorMessage.confirmPassword}
                  >
                    <TextField
                      aria-label="password"
                      label="Password"
                      type="password"
                      inputProps={{ minLength: 6 }}
                      name="password"
                      required
                    />
                    <FormHelperText>
                      {formErrorMessage.confirmPassword}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid>
                  <FormControl
                    className={classes.w100}
                    error={!!formErrorMessage.confirmPassword}
                  >
                    <TextField
                      label="Confirm Password"
                      aria-label="confirm password"
                      type="password"
                      inputProps={{ minLength: 6 }}
                      name="confirmPassword"
                      required
                    />
                    <FormHelperText>
                      {formErrorMessage.confirmPassword}
                    </FormHelperText>
                  </FormControl>
                </Grid>
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
                    Create
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
    register: (credentials) => {
      dispatch(register(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
