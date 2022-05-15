import React from "react";
import { Route, Routes } from 'react-router-dom';
import Landingpage from "./pages/landingpage"
import AddinventoryPage from "./pages/addinventorypage" 
import DeleteinventoryPage from "./pages/deleteinventorypage" 
import EditinventoryPage from "./pages/editinventorypage" 

function App() {

  return (
          <Routes>
            <Route path="/home" element={<Landingpage />} />
            <Route path="/addinventory" element={<AddinventoryPage />} />
            <Route path="/deleteinventory" element={<DeleteinventoryPage />} />
            <Route path="/editinventory" element={<EditinventoryPage />} />  
          </Routes>
  );
}

export default App;
