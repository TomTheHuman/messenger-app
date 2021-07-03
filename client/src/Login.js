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
import { makeStyles } from "@material-ui/core/styles";
import { clearSearchedUsers } from "./store/conversations";
import background from "./assets/bg-img.png";
import chatIcon from "./assets/chat-icon.png";

const useStyles = makeStyles((theme) => ({
  w100: {
    width: "100%",
  },
  container: {
    backgroundColor: "white",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "row",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
      height: "100%",
    },
  },
  flexCenter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  bgCtnr: {
    width: "40vw",
    height: "100vh",
    backgroundImage: `linear-gradient(rgba(58, 141, 255, 0.8), rgba(134, 185, 255, 0.5) ), url(${background})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "top left",
    backgroundSize: "cover",
    [theme.breakpoints.down("xs")]: {
      width: "100vw",
      height: "25vh",
    },
  },
  bgContent: {
    width: "75%",
    textAlign: "center",
    color: "white",
    marginBottom: "15vh",
    [theme.breakpoints.down("xs")]: {
      marginBottom: "0px",
    },
  },
  bgText: {
    fontWeight: "400",
    fontSize: "1.8em",
    marginTop: "30px",
    [theme.breakpoints.down("xs")]: {
      fontSize: "5vw",
      marginTop: "10px",
      marginBottom: "0px",
    },
  },
  interactCtnr: {
    width: "60%",
    backgroundColor: "white",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  contentCtnr: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    boxSizing: "border-box",
    [theme.breakpoints.down("xs")]: {
      padding: "25px",
    },
  },
  headerCtnr: {
    padding: "15px",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    boxSizing: "border-box",
    [theme.breakpoints.down("xs")]: {
      padding: "25px",
      width: "100%",
      flexDirection: "column",
      position: "absolute",
      bottom: "0",
      left: "0",
    },
  },
  headerText: {
    color: "#B0B0B0",
  },
  headBtnCtnr: {
    margin: "0px 15px",
    [theme.breakpoints.down("xs")]: {
      margin: "0px",
      width: "100%",
    },
  },
  formCtnr: {
    width: "100%",
    flexGrow: "1",
    flexDirection: "column",
    marginBottom: "15vh",
    [theme.breakpoints.down("xs")]: {
      height: "100%",
      marginTop: "2vh",
      marginBottom: "5vh",
    },
  },
  labelText: {
    width: "70%",
    maxWidth: "500px",
    textAlign: "left",
    fontSize: "1.6em",
    fontWeight: "600",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  form: {
    width: "70%",
    maxWidth: "500px",
    [theme.breakpoints.down("xs")]: {
      marginLeft: "0px",
      marginTop: "15px",
      width: "100%",
    },
  },
  formBtnCtnr: {
    margin: "0px 15px",
    [theme.breakpoints.down("xs")]: {
      margin: "0px",
      width: "100%",
    },
  },
  btn: {
    padding: "16px 40px",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  btnPrimary: {
    marginTop: "24px",
    backgroundColor: "#3A8DFF",
    color: "white",
    "&:hover": {
      backgroundColor: "#1C69D4",
    },
  },
  btnSecondary: {
    backgroundColor: "white",
    color: "#3A8DFF",
    marginLeft: "20px",
    "&:hover": {
      color: "#1C69D4",
    },
    [theme.breakpoints.down("xs")]: {
      marginLeft: "0px",
      marginTop: "15px",
    },
  },
}));

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
      <Box className={`${classes.bgCtnr} ${classes.flexCenter}`}>
        <Box className={classes.bgContent}>
          <img src={chatIcon} alt="chat bubble with ellipses"></img>
          <h1 className={classes.bgText}>
            Converse with anyone with any language
          </h1>
        </Box>
      </Box>
      <Box className={classes.interactCtnr}>
        <Box className={classes.contentCtnr}>
          <Grid container item className={classes.headerCtnr}>
            <Typography className={classes.headerText}>
              Need to register?
            </Typography>
            <Box className={classes.headBtnCtnr}>
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
          <Box className={`${classes.flexCenter} ${classes.formCtnr}`}>
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
                  className={`${classes.flexCenter} ${classes.formBtnCtnr}`}
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
          </Box>
        </Box>
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
