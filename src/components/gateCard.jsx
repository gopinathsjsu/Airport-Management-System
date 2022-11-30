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

export default function BasicGateCard(props) {
  return (
  
    props.data.map((data,idx)=>
    <Button>
       <Card sx={{ minWidth: 275,maxWidth:500 }}>
     <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {data.name}
        </Typography>
        <Typography variant="h5" component="div">
          Status - {(data.status)?"ON":"OFF"}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
         Last Assigned Flight - {(data.lastassignedflight != "")?data.lastassignedflight:"None"}
        </Typography>
       
      </CardContent>
      <CardActions>
        <Button as = "a" href = {"/modifygate/"+data.name} size="small">Modify</Button>
        <Button as = "a" href = {"/modifygateforce/"+data.name} size="small">Emergency Closure</Button>
      </CardActions>
    </Card>
    </Button>
    
    )
  );
}
