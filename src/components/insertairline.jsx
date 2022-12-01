import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import BasicSelect from './form';
import {useNavigate} from 'react-router-dom';
import { Fade } from '@mui/material';
import Alert from '@mui/material/Alert';
import ResponsiveAppBar from './navbar';

const d = {"Airline":"airlinelogin","Airport":"airportlogin"}
const theme = createTheme();

export default function InsertAirline() {
    const [status,setStatus] = React.useState("");
    const [message,setMessage] = React.useState("");
    const [choice,setChoice] = React.useState(true);
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    var a = {
        name: data.get('name'),
        country: data.get('country'),
        code:data.get("code")
      };
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(a)
    };
    fetch('/api/insertairline', requestOptions)
        .then(response => response.json())
        .then(data => 
            {
                if(data.status == "success"){
                    navigate('/', {replace: true});
                    window.location.reload(false);
                    // this.props.history.push("/");
                }
                setStatus("fail");
                setMessage(data.message);
                setChoice(false);                
            });
            
        // 
  };

  return (
    
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {(status === "fail")?
        <Fade in = {choice === false} timeout={3000}>
        <Alert severity="error">{message}</Alert>
                </Fade>:null}
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Insert Airline
          </Typography>
          <Box component="form" onSubmit={handleSubmit}  sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="country"
              label="Country"
              name="country"
              autoComplete="country"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="code"
              label="Code"
              type="code"
              id="code"
            />
           
           
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Insert Airline
            </Button>
            <Grid container>
              <Grid item xs>
              </Grid>
              <Grid item>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}