import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import BasicCard from './card';
const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function BasicFlightCard(props) {
  return (
  
    props.data.map((data,idx)=>
    <Button>
      <Card sx={{ minWidth: 275,maxWidth:500 }}>
     <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {data.name}
        </Typography>
        <Typography variant="h5" component="div">
          {data.from} - {data.to}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {data.time}
        </Typography>
        <Typography variant="body2">
          Gate {(data.gate!="")?data.gate:"NA"}
          <br />
          Status {(data.status=='A')?"Arrival":"Departure"}
          <br/>
          Baggage {data.baggage}
        </Typography>
      </CardContent>
      <CardActions>
        {((data.gate =="" || props.time>data.time)?<Button as = "a" href = {"/modifyflight/"+data.name} size="small">Modify</Button>:null)}
      </CardActions>
    </Card>
    </Button>
    
    
    )
  );
}
