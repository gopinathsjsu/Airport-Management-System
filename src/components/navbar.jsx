import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Link } from 'react-router-dom';
import LocalAirportIcon from '@mui/icons-material/LocalAirport'

import {useResolvedPath, useMatch} from 'react-router-dom';
// const pages = ['Flights'];
 
const pages1 = {"Flights":'/flights',"Add Flight":"/addflight","Modify Flight":"/modifyflight","Baggage":"/baggage","Gates":"/gate","Approve Requests":"/approverequests","Insert Airline":"/insertairline"}

// if(localStorage.getItem("username")!= null){
//     settings.push("")
// }

// if(localStorage.getItem("attribute")=="Airport"){  
//         airportPages.map((element) => pages[element.]);
//     }
export default function ResponsiveAppBar() {
   
  const [attribute,setattribute] = React.useState(localStorage.getItem('attribute'));
  const [username,setusername] = React.useState(localStorage.getItem("username"));
  // setattribute();
  const pages = ['Flights']
const airlinePages = ["Add Flight","Modify Flight"];
const airportPages = ["Baggage","Gates","Approve Requests","Insert Airline"];
if(attribute==="Airline"){  
    airlinePages.map((item)=>pages.push(item));
}
if(attribute==="Airport"){  
    airportPages.map((item)=>pages.push(item));
}
const settings = ["logout"];
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  }; 
//   const navigate = useNavigate();
  const Logout = () =>{
    fetch('/api/logout')
    .then(response => response.json())
    .then(data => 
        {
            console.log(data);
        });
    localStorage.removeItem("username");
    localStorage.removeItem("attribute");
    setattribute(null);
    setusername(null);
    handleCloseUserMenu();
    // navigate('/', {replace: true});
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
        
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
          <LocalAirportIcon></LocalAirportIcon>
            SJU Airport
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center"><a href={pages1[page]}> {page}</a></Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          
          
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          ><LocalAirportIcon></LocalAirportIcon>
            SJU Airport
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <a style={ {textDecoration: 'none',"color":"white" }} href={pages1[page]}> {page}</a>
              </Button>
            ))}
          </Box>
          {((username!= null))?<Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Options">
              <IconButton style={ {textDecoration: 'none',"color":"white" }} onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" /> */}
                {localStorage.getItem("name")}
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={Logout}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>:
          <div>
          <Typography textAlign="center"> <CustomLink to = "login/airport" style={ {textDecoration: 'none',"color":"white" }}>Airport Login</CustomLink></Typography>
          <Typography textAlign="center"><CustomLink to = "login/airline" style={ {textDecoration: 'none',"color":"white" }}>Airline Login</CustomLink></Typography>
          </div> }
        </Toolbar>
      </Container>
    </AppBar>
  );
}
function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })

  return (
    
      <Link to={to} {...props}>
        {children}
      </Link>

  )
}
// export default ResponsiveAppBar;
