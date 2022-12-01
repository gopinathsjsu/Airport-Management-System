import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useNavigate } from 'react-router-dom';
import { Fade, RadioGroup } from '@mui/material';
import Radio from '@mui/material/Radio';
import Alert from '@mui/material/Alert';

  
  const theme = createTheme();
  
 
    
  
export default function ModifyGateForm(props){
    const [value,setValue] = React.useState(null);
    const [status,setStatus] = React.useState("");
    const [message,setMessage] = React.useState("");
    const [choice,setChoice] = React.useState(true);
    const navigate = useNavigate();
    const [selectedValue, setSelectedValue] = React.useState();

    const handleChange = (event) => {
      setSelectedValue(event.target.value);
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget); 
      if(selectedValue == null){
            alert("enter a value");
            return 
        }

      let a = {
       
        status: selectedValue,
        name:props.data[idx]['name'],
        comments: data.get("comments")

      };
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(a)
    };
    if(props.force!=null){
      fetch('/api/forceclosegate', requestOptions)
    .then(response => response.json())
    .then(data => 
        {
            if(data.status == "success"){
                navigate('/gate', {replace: true});
                window.location.reload(false);
                alert("Modified successfully")
                // this.props.history.push("/");
            }
            setStatus("fail");
            setMessage(data.message);
            setChoice(false);
            
        });
    }
    else{
      fetch('/api/modifygate', requestOptions)
    .then(response => response.json())
    .then(data => 
        {
            if(data.status == "success"){
                navigate('/gate', {replace: true});
                window.location.reload(false);
                alert("Modified successfully")
                // this.props.history.push("/");
            }
            setStatus("fail");
            setMessage(data.message);
            setChoice(false);
            
        });
    }
    
    };
    // window.location.reload(false);
    let idx = -1
    for(let i = 0;i<props.data.length;i++){
        if(props.data[i]['name'] == props.gate){
            idx = i;
            break;
        }
    }
    return (
        <div>
             {(idx!=-1)?
             
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
           {(props.force!==null)?"Emergency closure":" Modify Gate"} <b>{props.data[idx]['name']}</b>
          </Typography>
          <Box component="form" onSubmit={handleSubmit}  sx={{ mt: 1 }}>
          
          <div>
          <RadioGroup value={selectedValue} onChange={handleChange} row>
            <FormControlLabel
          value= {1}
          control={<Radio />}
          label="ON"
          labelPlacement="start"
          />
          <FormControlLabel
            value= {0}
            control={<Radio />}
            label="OFF"
            labelPlacement="start"
          />
          </RadioGroup>
          
          </div>
            <TextField
              margin="normal"
              required
              fullWidth
              name="comments"
              label="Comments"
              type="comments"
              id="comments"
              autoComplete="current-password"
            />
           
            {/* <ResponsiveDateTimePickers  time = {props.data[idx]['time']} ></ResponsiveDateTimePickers> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Modify
            </Button>
            <Grid container>
            </Grid>
          </Box>
        </Box>
        </LocalizationProvider>
      </Container>
    </ThemeProvider>
          
           
        :console.log(props,"hef")}
        </div>
       
    );
};