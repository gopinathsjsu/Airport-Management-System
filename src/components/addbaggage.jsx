import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useNavigate } from 'react-router-dom';
import { Fade } from '@mui/material';
import Alert from '@mui/material/Alert';
  
  const theme = createTheme();
  
 
    
export default function AddBaggage(){
    const [value,setValue] = React.useState(null);
    const [status,setStatus] = React.useState("");
    const [message,setMessage] = React.useState("");
    const [choice,setChoice] = React.useState(true);
    const navigate = useNavigate();
    const handleSubmit = (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget); 

      let a = {
       
        name:data.get('name'),
       comments:data.get('comments')

      };
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(a)
    };
    fetch('/api/insertbaggage', requestOptions)
    .then(response => response.json())
    .then(data => 
        {
            if(data.status == "success"){
                navigate('/baggage', {replace: true});
                window.location.reload(false);
                // this.props.history.push("/");
            }
            setStatus("fail");
            setMessage(data.message);
            setChoice(false);
            
        });
    };
    // window.location.reload(false);
    let idx = -1
    // for(let i = 0;i<props.data.length;i++){
    //     if(props.data[i]['name'] == props.flight){
    //         idx = i;
    //         break;
    //     }
    // }
    return (
        <div>
            
             
                <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <CssBaseline />
        {(status === "fail")?
        <Fade in = {choice === false} timeout={3000}>
        <Alert severity="error">{message}</Alert>
                </Fade>:null}
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Add Baggage
          </Typography>
          <Box component="form" onSubmit={handleSubmit}  sx={{ mt: 1 }}>
          <TextField
              fullWidth
              margin="normal"
              required
              name="name"
              label="Name"
              type="name"
              id="name"
              autoComplete="current-password"
            />
            <TextField
              fullWidth
              margin="normal"
              required
              id="comments"
              label="Comments"
              name="comments"
              autoComplete="from"
              
              autoFocus
            />
                
           
            {/* <ResponsiveDateTimePickers  time = {props.data[idx]['time']} ></ResponsiveDateTimePickers> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add Baggage
            </Button>
            <Grid container>
            </Grid>
          </Box>
        </Box>
        </LocalizationProvider>
      </Container>
    </ThemeProvider>
          
           
        </div>
       
    );
}
