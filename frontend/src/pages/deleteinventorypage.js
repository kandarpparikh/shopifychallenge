import React, { useEffect, useState } from 'react'
import axios from 'axios';
import baseURL from '../config';
import {useNavigate} from 'react-router-dom';
import { Button , Select} from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
 import MenuItem from '@mui/material/MenuItem';
 import FormControl from '@mui/material/FormControl';
 import TextField from "@mui/material/TextField";

function Editinventory(props) {
   const navigate = useNavigate();
   const [inventoryid,setinventoryid] = useState('')
   const [data,setData] = useState({})

    const addInventory = (e) => {
        navigate(`/addinventory/`);
      }
    const deleteInventory = (e) => {
    navigate(`/deleteinventory/`);
    }
    const editInventory = (e) => {
    navigate(`/editinventory/`);
    }
    const gotohome = (e) => {
    navigate(`/home/`);
    }
    const setInventoryId = (e) => {
    setinventoryid(e.target.value);
    setData(data => ({ ...data, "inventoryId": e.target.value}));
    }

    const addToDatabase = (e) =>{
        axios.post(baseURL+"/inventory/deleteinventory",{data : data}).then((response) => {
        console.log(response.data.message)
        alert(response.data.message);
        window.location.reload();
        });
    }

  return (
      <div>
       <div style={{width: 'fit-content',margin: '0 auto'}}>
       
       <Button onClick={addInventory} variant="contained" style={{color: 'white', backgroundColor: "#1D3124",width:"250px", margin:"30px"}}> Add Inventory </Button>
       <Button onClick={deleteInventory} variant="contained" style={{color: 'white', backgroundColor: "#1D3124",width:"250px", margin:"30px"}}> Delete Inventory </Button>
       <Button onClick={editInventory} variant="contained" style={{color: 'white', backgroundColor: "#1D3124",width:"250px", margin:"30px"}}> Edit Inventory </Button>
       <Button onClick={gotohome} variant="contained" style={{color: 'white', backgroundColor: "#1D3124",width:"250px", margin:"30px"}}> Home </Button>
       </div>
        
       <h1 style={{width: 'fit-content',margin: '0 auto'}}>Delete Inventory</h1>
       <br></br>
       <div style={{width: 'fit-content',margin: '0 auto'}}>
       <br></br><TextField onBlur={setInventoryId}  id="name-input" name="inventoryid" label="Enter Inventory Id" type="text"/>
       <hr></hr>

    <br></br><Button onClick={addToDatabase} variant="contained" style={{color: 'white', backgroundColor: "#1D3124",width:"230px"}}> Delete Inventory </Button>
    </div>
    </div>
  );
}

export default Editinventory;