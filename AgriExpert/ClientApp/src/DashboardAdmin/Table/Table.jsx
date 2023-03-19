import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import "./Table.css";
import { useState, useEffect } from 'react';
import { Buffer } from 'buffer';

var rows = [];
var columns = [];
export default function DataGridDemo(props) {
  
  const [isLoaded, setisLoaded] = useState(false);
    useEffect(() => {
        columns = props.columns;
        rows = props.data[0] == undefined ? [] : props.data; 
        if (rows.length > 0) {
            rows.map(row => {
                if (row.role == "Expert") {
                    row.id = getRandomName(row.expertsId)
                } else if (row.customersId != null && row.customerPhone != null) {
                    row.id = getRandomName(row.customersId)
                    row.packagesInfo = row.packages.packageName
                } else if (row.questionsId != null && row.questionContext !== null) {
                    row.id = getRandomName(row.questionsId)
                    row.answeredBy = row.experts?.expertFullName
                }

            })
        }
      setisLoaded(true);
  }, []);
    const getRandomName = (hexString) => {
        hexString = hexString.replace(/-/g, "");
        let base64String = Buffer.from(hexString, 'hex').toString('base64')
        return base64String;
    }
    return (
        isLoaded ? < div className = "Table" >
          <h1>
            Ex<span>per</span>ts
          </h1>
          <Box sx={{ height: 400, width: "100%" }}>
             <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10]}
              checkboxSelection
              disableSelectionOnClick
              experimentalFeatures={{ newEditingApi: true }}
            />
          </Box>
         </div>
       :<></>
  );
}
