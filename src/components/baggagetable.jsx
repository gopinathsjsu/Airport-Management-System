import * as React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(name, flight) {
  return { name, flight };
}


export default function BaggageTable(props){
        let  d = {};
        function sortOnKeys(dict) {

            var sorted = [];
            for(var key in dict) {
                sorted[sorted.length] = key;
            }
            sorted.sort();
        
            var tempDict = {};
            for(var i = 0; i < sorted.length; i++) {
                tempDict[sorted[i]] = dict[sorted[i]];
            }
        
            return tempDict;
        }

        for(let i =0;i<props.time;i++){
            if(d[props.data[i]['baggage']]==undefined && props.data[i]['baggage'][0]=="B" ){
                d[props.data[i]['baggage']] = props.data[i]['name']
            }
        }
        d = sortOnKeys(d);
        const rows = [];
        for (const [key, value] of Object.entries(d)) {
            rows.push(createData(key,value));
          }
    return (
        <div>
        <h2>Baggage Lists</h2>
            {(Object.keys(d).length)?
        <TableContainer style={{width:"300px"}} component={Paper}>
        <Table  aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Flight</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
              <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center">{row.flight}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>:<h5>No baggages found</h5>
    }
        </div>
        
    )
}
