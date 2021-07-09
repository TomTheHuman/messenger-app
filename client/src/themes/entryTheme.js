import { makeStyles } from "@material-ui/core";
import background from "../assets/bg-img.png";

const useStyles = makeStyles((theme) => ({
  w100: {
    width: "100%",
  },
  container: {
    backgroundColor: "white",
    boxSizing: "border-box",
    flexWrap: "nowrap",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
      height: "100%",
    },
  },
  bgCtnr: {
    width: "40vw",
    height: "100vh",
    backgroundImage: `linear-gradient(rgba(58, 141, 255, 0.8), rgba(134, 185, 255, 0.8) ), url(${background})`,
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
      marginBottom: theme.spacing(0),
    },
  },
  bgText: {
    fontWeight: "400",
    variant: "1.8em",
    marginTop: theme.spacing(4),
    [theme.breakpoints.down("xs")]: {
      fontSize: "5vw",
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(0),
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
    flexDirection: "column",
    boxSizing: "border-box",
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(3),
    },
  },
  headerCtnr: {
    padding: theme.spacing(2),
    boxSizing: "border-box",
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(3),
      width: "100%",
      flexDirection: "column",
      position: "absolute",
      bottom: "0",
      left: "0",
    },
  },
  headerText: {
    color: theme.palette.secondary.main,
  },
  headBtnCtnr: {
    [theme.breakpoints.down("xs")]: {
      margin: theme.spacing(0),
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
    maxWidth: theme.spacing(62),
    textAlign: "left",
    fontSize: "1.6em",
    fontWeight: "600",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  form: {
    width: "70%",
    maxWidth: theme.spacing(62),
    [theme.breakpoints.down("xs")]: {
      marginLeft: theme.spacing(0),
      marginTop: theme.spacing(2),
      width: "100%",
    },
  },
  formBtnCtnr: {
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  btn: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingRight: theme.spacing(5),
    paddingLeft: theme.spacing(5),
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  btnPrimary: {
    marginTop: theme.spacing(3),
    backgroundColor: theme.palette.primary.main,
    color: "white",
    "&:hover": {
      backgroundColor: theme.palette.primary.hover,
    },
  },
  btnSecondary: {
    backgroundColor: "white",
    color: theme.palette.primary.main,
    marginLeft: theme.spacing(2.5),
    "&:hover": {
      color: theme.palette.primary.hover,
    },
    [theme.breakpoints.down("xs")]: {
      marginLeft: theme.spacing(0),
      marginTop: theme.spacing(2),
    },
  },
}));

export default useStyles;
