import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Grid, CssBaseline, Button } from "@material-ui/core";
import { SidebarContainer } from "./Sidebar";
import { ActiveChat } from "./ActiveChat";
import { logout, fetchConversations } from "../store/utils/thunkCreators";
import { clearOnLogout } from "../store/index";

const styles = (theme) => ({
  logout: {
    height: "5vh",
  },
  main: {
    height: "95vh",
    [theme.breakpoints.down("sm")]: {
      flexWrap: "wrap",
    },
  },
});

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.user.id !== prevProps.user.id) {
      this.setState({
        isLoggedIn: true,
      });
    }
  }

  componentDidMount() {
    this.props.fetchConversations();
  }

  handleLogout = async () => {
    const convoIds = this.props.conversations.map((convo) => convo.id);
    await this.props.logout(this.props.user.id, convoIds);
  };

  render() {
    const { classes } = this.props;
    if (!this.props.user.id) {
      // If we were previously logged in, redirect to login instead of register
      if (this.state.isLoggedIn) return <Redirect to="/login" />;
      return <Redirect to="/register" />;
    }
    return (
      <>
        {/* logout button will eventually be in a dropdown next to username */}
        <Grid container>
          <Button className={classes.logout} onClick={this.handleLogout}>
            Logout
          </Button>
          <Grid
            container
            flexGrow={1}
            wrap="nowrap"
            component="main"
            className={classes.main}
          >
            <CssBaseline />
            <SidebarContainer />
            <ActiveChat />
          </Grid>
        </Grid>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    conversations: state.conversations,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: (id, convoIds) => {
      dispatch(logout(id, convoIds));
      dispatch(clearOnLogout());
    },
    fetchConversations: () => {
      dispatch(fetchConversations());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Home));
