import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./Table.css";
import { useState, useEffect } from 'react';
import { Buffer } from 'buffer';
import { Box, Button } from "@mui/material";
import DropdownButton from '../../Shared/dropDown'
import Popup from '../../Shared/commonPopUp'

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
    const [selectedRow, setselectedRow] = React.useState([]);
    const [state, setState] = useState({
        oneRowSelected: false,
        buttonClicked:false,
    })
    const getButtonName = (role, tab) => {
        if (role == "Expert") {
            return tab == "Solved" ? "View Answer" : "Update Answer";
        }
        else if (role == "Admin") {
            if (tab == "Expert")
                return "Revoke Expert";
            if (tab == "RevokeExpert")
                return "Reactive Expert";
            if (tab == "Unsolved")
                return "Assign Expert";
            if (tab == "Solved")
                return "View Answer";
            if (tab == "Customer")
                return "Check Details"
        }   
    }
    const getHeaderName = (role, tab) => {
        if (role == "Expert") {
            if (tab == "Solved")
                return (
                   <span> Solved Questions</span>
                )
            if (tab == "UnSolved")
                return (
                    <span> Un-Solved Questions</span>
                )
        }
        else if (role == "Admin") {
            if (tab == "Expert")
                return <span>All Experts</span>;
            if (tab == "RevokeExpert")
                return <span>Revoked Experts</span>;
            if (tab == "Unsolved")
                return <span> Un-Solved Questions</span>
            if (tab == "Solved")
                return <span> Solved Questions</span>
            if (tab == "Customer")
                return <span>All Cutomers</span>
            if (tab == "InProgress")
                return <span>In-Progress Questions</span>
        }
    }
    const viewButtonClick = async () => {
        if (props.role == "Expert") {
            if (props.tab == "Solved") {
                setState({
                    ...state,
                    buttonClicked: true,
                })
            } else if (props.tab == "UnSolved") {
                setState({
                    ...state,
                    buttonClicked: true,
                })
            }
        } else if (props.role == "Admin") {
            if (props.tab == "Expert" || props.tab == "RevokeExpert") {
                setState({
                    ...state,
                    buttonClicked: true,
                })
            } else if (props.tab == "Unsolved") {
                setState({
                    ...state,
                    buttonClicked: true,
                })

            } else if (props.tab == "Solved") {
                setState({
                    ...state,
                    buttonClicked: true,
                })
            } else if (props.tab == "Customer") {
                setState({
                    ...state,
                    buttonClicked: true,
                })
            }
        }
    }
    const handleClose = () => {
        setState({
            ...state,
            buttonClicked: false,
        })
    }
    return (
        isLoaded ?
            <div style = {{ margin:"30px" }}>
            <div >{state.buttonClicked ? <Popup handleClose={handleClose} selectedRow={selectedRow} role={props.role} tab={props.tab} /> : <></>}</div>
            < div className="Table" >
                    
          <h1>
          
                {getHeaderName (props.role, props.tab)}
              
            </h1>
            {props.role=="Expert"?<DropdownButton expertData={props.expertData}/>:<></>}
          <Box sx={{ height: 400, width: "100%" }}>
             <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10]}
              checkboxSelection
              disableSelectionOnClick
              experimentalFeatures={{ newEditingApi: true }}
              onSelectionModelChange={(newSelection) => {
                  if (newSelection.length == 1) {
                      setselectedRow(rows.find(x => x.id == newSelection))
                      setState({
                          ...state,
                          oneRowSelected:true
                       })
                  } else {
                      setState({
                          ...state,
                          oneRowSelected: false
                      })
                  }
                  
              }}
            />
            </Box>
                {state.oneRowSelected == true ? <Button variant="contained" color={props.role == "Admin" && props.tab == "Expert"?"error":"success"} style={{ marginTop: "8px" }} onClick={viewButtonClick}>
                {
                    getButtonName(props.role, props.tab)          
                }
            </Button> : <></>}

            </div>
        </div>
       :<></>
  );
}
