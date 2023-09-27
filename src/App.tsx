import React, { useEffect } from 'react';
import { Typography } from '@mui/material';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getLoginStatus } from './services/authService';
import { SET_LOGIN } from './redux/features/auth/authSlice';
import logo from './logo.svg';
import './App.css';
import Sidebar from './Components2/sidebar/Sidebar';
import Layout from './Components2/layout/layout';
import Dashboard from './Pages/dashboard/Dashboard';
import Home from './Pages/Home/Home';
import AddProduct from './Pages/addProduct/AddProduct';
import Login from './Pages/auth/Login';
import Register from './Pages/auth/Register';
import Forgot from './Pages/auth/Forgot';
import Reset from './Pages/auth/Reset';
import EditProduct from './Pages/editProduct/EditProduct';
import Home2 from './Pages/Home2/Home2';
import Home3 from './Pages/Home3/Home3';

axios.defaults.withCredentials = true;

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((store: any) => store.auth.isLoggedIn)
  useEffect(() => {
    async function loginStatus() {
      const status = await getLoginStatus()
      dispatch(SET_LOGIN(status));
    }
    loginStatus();
  }, [dispatch]);
  console.log("isLoggedIn: ",isLoggedIn)
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/Home2" element={<Home2 />} />
        <Route path="/Home3" element={<Home3 />} />
        <Route path="/restepassword/:resetToken" element={<Reset />} />
        <Route path="/dashboard" element={isLoggedIn ? (<Sidebar>
          <Layout>
            <Dashboard />
          </Layout>
        </Sidebar>) : (<Login />)

        } />
        <Route path="/add-product" element={
          <Sidebar>
            <Layout>
              <AddProduct />
            </Layout>
          </Sidebar>
        } />
        <Route path="/edit-product/:id" element={
          <Sidebar>
            <Layout>
              <EditProduct />
            </Layout>
          </Sidebar>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
