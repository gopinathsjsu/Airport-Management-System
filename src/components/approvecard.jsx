import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Fade } from '@mui/material';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);


export default function ApproveCard(props) {
    const navigate = useNavigate();
      const [status,setStatus] = React.useState("");
    const [message,setMessage] = React.useState("");
    const [choice,setChoice] = React.useState(true);
     function handleClick(email){
    
    var a = {
        email:email
      };
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(a)
    };
    fetch('/api/approverequests', requestOptions)
        .then(response => response.json())
        .then(data => 
            {
                if(data.status == "success"){
                    setStatus("pass");
                setMessage(data.message);
                setChoice(false);
                window.location.reload(false);
                return
                }
                setStatus("fail");
                setMessage(data.message);
                setChoice(false);
            });
      };
  return (
    <div>
      {(status === "fail")?
        <Fade in = {choice === false} timeout={3000}>
        <Alert severity="error">{message}</Alert>
                </Fade>:null}
                {(status === "success")?
        <Fade in = {choice === false} timeout={3000}>
        <Alert severity="error">{message}</Alert>
                </Fade>:null}
        {props.data.map((data)=>
        <Button>
          <Card key = {data.email} sx={{ minWidth: 275 }}>
      <CardContent>
        {/* <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Word of the Day
        </Typography> */}
        <Typography variant="h5" component="div">
          {data.name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {data.email}
        </Typography>
      </CardContent>
      <CardActions>
      <Button onClick={() => handleClick(data.email)}>Approve</Button>
      </CardActions>
    </Card>
        </Button>
        
        )}
    </div>
    
    
  );
}
