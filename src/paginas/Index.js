import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Dashboard from "./Dashboard";
import Logout from "./Logout";
import SignUp from "./Signup";
import Login from "./Login";
import getFirebase from "../firebase/firebaseconfiguration";

import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}),
);

const AppBar = styled(MuiAppBar, {
shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
transition: theme.transitions.create(['margin', 'width'], {
  easing: theme.transitions.easing.sharp,
  duration: theme.transitions.duration.leavingScreen,
}),
...(open && {
  width: `calc(100% - ${drawerWidth}px)`,
  marginLeft: `${drawerWidth}px`,
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.easeOut,
    duration: theme.transitions.duration.enteringScreen,
  }),
}),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
display: 'flex',
alignItems: 'center',
padding: theme.spacing(0, 1),
// necessary for content to be below app bar
...theme.mixins.toolbar,
justifyContent: 'flex-end',
}));

export default function Index(props) {

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const firebase = getFirebase();

  const socialLogin = async (props) => {
    await firebase
      .auth()
      .signInWithPopup(props)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const signOut = async () => {
    try {
      if (firebase) {
        await firebase.auth().signOut();
        alert("Successfully signed out!");
      }
    } catch (error) {
      alert(error.message);
    }
    props.history.push("/");
  };

  const loginSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log(props);
    try {
      if (props) {
        console.log("iniciando");
        const user = await firebase
          .auth()
          .signInWithEmailAndPassword(data.get("email"), data.get("password"));
        //console.log("user", user);
        props.history.push("/");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const signupSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    try {
      if (firebase) {
        const user = await firebase
          .auth()
          .createUserWithEmailAndPassword(
            data.get("email"),
            data.get("password")
          );
        console.log("user", user);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    
    <Router>
      <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Welcome!
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem button key={0} component={Link} to='/'>
          
            <ListItemIcon >
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary={"Dashboard"} />
          </ListItem>
          <ListItem button key={1} component={Link} to='/logout'>
          
            <ListItemIcon >
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary={"Logout"} />
          </ListItem>
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        
      </Main>
    </Box>
      {props.currentUser ? (
        <Switch>
          <Route
            exact
            path={"/"}
            render={() => (
              <Dashboard
                Link={Link}
                firebase={props.firebase}
                signupSubmit={signupSubmit}
                history={props.history}
              />
            )}
          ></Route>
          <Route
            path={"/logout"}
            render={() => (
              <Logout
                signOut={signOut}
                firebase={props.firebase}
                history={props.history}
              />
            )}
          ></Route>
        </Switch>
      ) : (
        <Switch>
          <Route
            exact
            path={"/"}
            render={() => (
              <Login
                firebase={props.firebase}
                loginSubmit={loginSubmit}
                history={props.history}
                socialLogin={socialLogin}
              />
            )}
          ></Route>
          <Route
            path={"/signup"}
            render={() => (
              <SignUp
                firebase={props.firebase}
                signupSubmit={signupSubmit}
                history={props.history}
              />
            )}
          ></Route>
        </Switch>
      )}
    </Router>
  );
}
