import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

export default function FlightTable(props) {
    const columns1 = [
        { id: 'name', label: 'Name', minWidth: 100 },
        { id: 'time', label: 'Time', minWidth: 200 },
        { id: 'from', label: 'From', minWidth: 170 },
        { id: 'to', label: 'To', minWidth: 170 },
        { id: 'airline', label: 'Airline', minWidth: 170 },
        { id: 'baggage', label: 'Baggage', minWidth: 170 },
        { id: 'gate', label: 'Gate', minWidth: 100 },
        { id: 'status','label':'Status',align:'center', minWidth: 50 }
      ];
      var columns = []
      for(let i = 0;i<columns1.length;i++){
        if(columns1[i]['id']=='baggage'&&props.value!=1){
          continue;
        }
        columns.push(columns1[i]);
      }
      //   {
      //     id: 'population',
      //     label: 'Population',
      //     minWidth: 170,
      //     align: 'right',
      //     format: (value) => value.toLocaleString('en-US'),
      //   },
      //   {
      //     id: 'size',
      //     label: 'Size\u00a0(km\u00b2)',
      //     minWidth: 170,
      //     align: 'right',
      //     format: (value) => value.toLocaleString('en-US'),
      //   },
      //   {
      //     id: 'density',
      //     label: 'Density',
      //     minWidth: 170,
      //     align: 'right',
      //     format: (value) => value.toFixed(2),
      //   },
      
      
      function createData(name, time,from, to, airline,baggage, gate, status) {
      //   const density = population / size;
      if(props.value==1) { 
        return { name,time, from, to, airline,baggage, gate, status }
      }
        return { name,time, from, to, airline, gate, status }
      }
       
      
      const rows = [
          
        //   createData("ABC","F","T","A","B","G","ef1")
      //   createData('India', 'IN', 1324171354, 3287263),
      //   createData('China', 'CN', 1403500365, 9596961),
      //   createData('Italy', 'IT', 60483973, 301340),
      //   createData('United States', 'US', 327167434, 9833520),
      //   createData('Canada', 'CA', 37602103, 9984670),
      //   createData('Australia', 'AU', 25475400, 7692024),
      //   createData('Germany', 'DE', 83019200, 357578),
      //   createData('Ireland', 'IE', 4857000, 70273),
      //   createData('Mexico', 'MX', 126577691, 1972550),
      //   createData('Japan', 'JP', 126317000, 377973),
      //   createData('France', 'FR', 67022000, 640679),
      //   createData('United Kingdom', 'GB', 67545757, 242495),
      //   createData('Russia', 'RU', 146793744, 17098246),
      //   createData('Nigeria', 'NG', 200962417, 923768),
      //   createData('Brazil', 'BR', 210147125, 8515767),
      ];
      props.data.map((value)=>
        {
            rows.push(createData(value.name,value.time,value.from,value.to,props.mapping[value.airline],value.baggage,value.gate,value.status))
        }
      )
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
      // rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
        rowsPerPageOptions={[{label: "Next 1 hour",value:props.time[0]}, {label: "Next 2 hours", value:props.time[1]},{label: "Next 4 hours", value: props.time[2]}]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
