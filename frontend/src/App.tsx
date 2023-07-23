import React from 'react';
import Login from "./pages/login";
import Register from "./pages/register";
import ProtectedRoutes from "./component/ProtectedRoutes";
import Home from "./pages/home";
import {  Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
        <Routes>
            <Route path='/' element={<ProtectedRoutes component={Home}/>}></Route>
            <Route path='/login' element={< Login />}></Route>
            <Route path='/register' element={< Register />}></Route>
        </Routes>
    </>
  );
}

export default App;
