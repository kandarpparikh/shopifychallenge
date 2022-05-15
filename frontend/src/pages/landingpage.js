 import React, { useEffect, useState } from 'react'
 import axios from 'axios';
 import baseURL from '../config';
 import {useNavigate} from 'react-router-dom';
 import { Button , Select} from "@mui/material";
 import InputLabel from '@mui/material/InputLabel';
  import MenuItem from '@mui/material/MenuItem';
  import FormControl from '@mui/material/FormControl';
  import TextField from "@mui/material/TextField";

 function Landingpage(props) {
    const navigate = useNavigate();
    const [api_url,setAPIUrl] = useState(baseURL+'/inventory/getallitems');
    const [city, setCity] = useState('city');
    const [results,setResults] = useState([]);
    const [temperature,setTemperature] = useState([]);
    const [search,setSearch] = useState('');
    const [itemName,setItemName] = useState('')
    const [quantity,setquantity] = useState('')
    const [category,setcategory] = useState('')
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
      }
    const [filters,setFilters] = useState({})

    const handleChange = (e) => {
      setCity(e.target.value);
      if(e.target.value.length>0)
      {
        setFilters(filters => ({ ...filters, "city": e.target.value}));
      }
      else{
        delete filters["city"]
      }
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

    const filterResults = (e)=> {
      console.log(filters)
      axios.post(baseURL+"/filter/products",{data : filters}).then((response) => {
      setResults(response.data)});
    }

    const SearchByItemName=(e)=>{
      setItemName(e.target.value)
      if(e.target.value.length>0)
      {
        setFilters(filters => ({ ...filters, "inventoryName": e.target.value}));
      }
      else{
        delete filters["inventoryName"]
      }
    };

    const SearchByQuantity=(e)=>{
      setquantity(e.target.value)
      if(e.target.value.length>0)
      {
        setFilters(filters => ({ ...filters, "quantity": e.target.value}));
      }
      else{
        delete filters["quantity"]
      }

      };
    const SearchByCategory=(e)=>{
      setcategory(e.target.value)
      if(e.target.value.length>0)
      {
        setFilters(filters => ({ ...filters, "category": e.target.value}));
      }
      else{
        delete filters["category"]
      }
      };

    useEffect(() => {
          axios.get(api_url,{headers: headers}).then((response) => {
              setResults(response.data);
          });
          axios.get(baseURL+"/inventory/gettemperatures",{headers: headers}).then((response) => {
            console.log(response.data)
            setTemperature(response.data);
        });
    },[search]);

   return (
       <div>
       <div style={{width: 'fit-content',margin: '0 auto'}}>
       
       <Button onClick={addInventory} variant="contained" style={{color: 'white', backgroundColor: "#1D3124",width:"250px", margin:"50px"}}> Add Inventory </Button>
       <Button onClick={deleteInventory} variant="contained" style={{color: 'white', backgroundColor: "#1D3124",width:"250px", margin:"50px"}}> Delete Inventory </Button>
       <Button onClick={editInventory} variant="contained" style={{color: 'white', backgroundColor: "#1D3124",width:"250px", margin:"50px"}}> Edit Inventory </Button>
       </div>
        
        <h1 style={{width: 'fit-content',margin: '0 auto'}}>Inventory</h1>

       <div style={{width: 'fit-content',margin: '0 auto'}}>
       <FormControl style={{width: '100px'}}>
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

      <TextField onBlur={SearchByItemName}  id="name-input" name="itemName" label="Search by Item Name" type="text"/>
      <TextField onBlur={SearchByQuantity}  id="name-input" name="quantity" label="Search by Quantity" type="text"/>
      <TextField onBlur={SearchByCategory}  id="name-input" name="category" label="Search by Category" type="text"/>
      <br></br>
      <div style={{width: 'fit-content',margin: '0 auto'}}>
        <Button onClick={filterResults} variant="contained" style={{color: 'white', backgroundColor: "#1D3124",width:"250px", margin:"50px"}}> Search </Button>
      </div>
       </div>

       {!search.length > 0 ? (results.map((r) => (
         <div>               
            <div style={{width: 'fit-content',margin: '0 auto'}}>
            <p> 
            Item Name : {r.inventoryName} |   
            Inventory Id: {r.inventoryId} |
            City : {r.city}               |
            Category : {r.category}       |
            Quantity : {r.quantity}       |
            Temperature of {r.city}: {temperature[r.city]} |
            </p>
            <p>--------------------------------------------------------------------------------------------------------------------------------------------------------</p>
            </div>
         </div>
       )))
       :null}
       </div>
   );
 }
 
 export default Landingpage;