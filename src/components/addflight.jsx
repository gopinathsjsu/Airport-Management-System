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
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import { Fade,RadioGroup } from '@mui/material';
// import  from '@mui/material';
import Radio from '@mui/material/Radio';

  const theme = createTheme();
  
 
    
export default function Addflight(){
    const [value,setValue] = React.useState(null);
    const [status,setStatus] = React.useState("");
    const [message,setMessage] = React.useState("");
    const [choice,setChoice] = React.useState(true);
    const navigate = useNavigate();
    const [selectedValue, setSelectedValue] = React.useState(null);

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
       
        time:value['$D']+" "+(value['$M']+1)+" "+value['$y']%2000+" "+value["$H"]+" "+value["$m"],
        name:data.get('name'),
        from:data.get('from'),
        to:data.get('to'),
        status:selectedValue

      };
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(a)
    };
    fetch('/api/addflights', requestOptions)
    .then(response => response.json())
    .then(data => 
        {
            if(data.status == "success"){
                navigate('/modifyflight', {replace: true});
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
            Add flight
          </Typography>
          <Box component="form" onSubmit={handleSubmit}  sx={{ mt: 1 }}>
          <TextField
              margin="normal"
              required
              name="name"
              label="Name"
              type="number"
              id="name"
              autoComplete="current-password"
            />
            <TextField
              margin="normal"
              required
              id="From"
              label="From"
              name="from"
              autoComplete="from"
              
              autoFocus
            />
                <TextField
              margin="normal"
              required
              id="to"
              label="To"
              name="to"
              autoComplete="to"
              
              autoFocus
            />
           <RadioGroup required value={selectedValue} onChange={handleChange} row>
            <FormControlLabel
          value= {"A"}
          control={<Radio />}
          label="Arrival"
          labelPlacement="start"
          />
          <FormControlLabel
            value= {"D"}
            control={<Radio />}
            label="Departure"
            labelPlacement="start"
          />
          </RadioGroup>
            <DateTimePicker
          id = "time"
          name = "time"
          label=" Flight Time"
          renderInput={(params) => <TextField {...params}  />}
          required
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
        />
            {/* <ResponsiveDateTimePickers  time = {props.data[idx]['time']} ></ResponsiveDateTimePickers> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add flight
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
