import React, { useEffect, useState } from 'react'
import axios from 'axios';
import baseURL from '../config';
import {useNavigate} from 'react-router-dom';
import { Button , Select} from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
 import MenuItem from '@mui/material/MenuItem';
 import FormControl from '@mui/material/FormControl';
 import TextField from "@mui/material/TextField";

function Addinventory(props) {
   const navigate = useNavigate();
   const [api_url,setAPIUrl] = useState(baseURL+'/inventory/getallitems');
   const [city, setCity] = useState('');
   const [itemName,setItemName] = useState('')
   const [quantity,setquantity] = useState('')
   const [category,setcategory] = useState('')
   const [data,setData] = useState({})
   const headers = {
     'Access-Control-Allow-Origin': '*',
     'Content-Type': 'application/json'
     }

    const SetItemName=(e)=>{
    setItemName(e.target.value)
    setData(data => ({ ...data, "inventoryName": e.target.value}));
    };
  
    const SetQuantity=(e)=>{
    setquantity(e.target.value) 
    setData(data => ({ ...data, "quantity": e.target.value})); 
    };

    const SetCategory=(e)=>{
    setcategory(e.target.value)
    setData(data => ({ ...data, "category": e.target.value}));
    };

    const handleChange = (e) => {
    setCity(e.target.value);
    setData(data => ({ ...data, "city": e.target.value}));
    };

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

    const addToDatabase = (e) =>{
        axios.post(baseURL+"/inventory/addinventory",{data : data}).then((response) => {
        alert("Added to inventory");
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
        
        <h1 style={{width: 'fit-content',margin: '0 auto'}}>Add New Inventory</h1>
       <br></br>
       <div style={{width: 'fit-content',margin: '0 auto'}}>
       <FormControl style={{width: '230px'}}>
        <InputLabel id="demo-simple-select-label">city</InputLabel>
        <Select
          value={city}
          label="city"
          onChange={handleChange}
        >
          <MenuItem value={"Toronto"}>Toronto</MenuItem>
          <MenuItem value={"Halifax"}>Halifax</MenuItem>
          <MenuItem value={"Vancouver"}>Vancouver</MenuItem>
          <MenuItem value={"Montreal"}>Montreal</MenuItem>
          <MenuItem value={"Windsor"}>Windsor</MenuItem>
        </Select>
      </FormControl>
    <br></br><TextField onBlur={SetItemName}  id="name-input" name="itemName" label="Set Item Name" type="text"/>
    <br></br><TextField onBlur={SetQuantity}  id="name-input" name="quantity" label="Set Quantity" type="text"/>
    <br></br><TextField onBlur={SetCategory}  id="name-input" name="category" label="Set Category" type="text"/>
    <br></br>
    <br></br><Button onClick={addToDatabase} variant="contained" style={{color: 'white', backgroundColor: "#1D3124",width:"230px"}}> create Inventory </Button>
      </div>
      </div>
  );
}

export default Addinventory;