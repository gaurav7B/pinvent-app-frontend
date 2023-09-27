import React, { useState } from 'react';
import logo from './logo.svg';
import { Typography, Stack, Button, AppBar, TextField } from '@mui/material';
import styles from "./auth.module.css";
import Card from '../../Components2/Card/Card';
import LoginIcon from '@mui/icons-material/Login';
import { Link, useNavigate } from 'react-router-dom';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { toast } from "react-toastify";
import { registerUser, validateEmail } from '../../services/authService';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import "./Home.css";
import { useDispatch } from 'react-redux';
import { SET_LOGIN, SET_NAME } from '../../redux/features/auth/authSlice';

function Register() {
  const initialState = {
    name: "",
    email: "",
    password: "",
    password2: "",
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setformData] = useState(initialState)
  const { name, email, password, password2 } = formData

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value })
  };

  const register = async (e: any) => {
    e.preventDefault();

    if (!name || !email || !password) {
      return toast.error("All fields are required");
    }
    if (password.length < 6) {
      return toast.error("Passwords must be greater than 6 characters");
    }
    if (password !== password2) {
      return toast.error("Passwords don't match");
    }
    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email");
    }

    const userData = {
      name, email, password
    }
    setIsLoading(true)
    try {
      const data = await registerUser(userData)
      await dispatch(SET_LOGIN(true));
      await dispatch(SET_NAME(data.name));
      navigate("/");
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      console.log(error.message);
    }
  };

  const OnlineStatusIcon = () => (
    <img
      src="https://www.mandsconsulting.com/wp-content/uploads/MS-Logo-Web-H-500x164-White-White.svg"  // Replace with the actual path to your icon image
      alt="Online Icon"
      style={{
        width: '70px',   // Set the desired width
        height: '70px',  // Set the desired height
        marginRight: '10px',  // Adjust the margin as needed
      }}
    />
  );

  return (
    <Typography component="div" className='center-screen' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <AppBar style={{width: "100%", backgroundColor: "#001B33"}}>
        <ul className="home-links">
           <Typography className="logo">
       <OnlineStatusIcon />
       </Typography>
          <li>
            <Button>
              <Link to="/login">Login</Link>
            </Button>
          </li>
        </ul>
      </AppBar>
      <Typography component="div" className={`container ${styles.auth}`}>
        <Card>
         <Typography className={styles.form}>
            <Typography component="div" className="Typography--flex-center">
              <LockOpenIcon style={{ height: "50px", color: "#999" }} />
            </Typography>
            <Typography variant="h2">Register</Typography >
            
            <form onSubmit={register}>
            <Stack style={{ gap: "20px" }} >
              <TextField type="text" placeholder="Name" required name="name" value={name} onChange={handleInputChange} style={{ height: 30 }} />
              <TextField type="email" placeholder="Email" required name="email" value={email} onChange={handleInputChange} style={{ height: 30 }} />
              <TextField type="password" placeholder="Password" required name="password" value={password} onChange={handleInputChange} style={{ height: 30 }} />
              <TextField type="password" placeholder="Confirm Password" required name="password2" value={password2} onChange={handleInputChange} style={{ height: 30 }} />
              <Button
                type="submit"
                className="--btn--btn-primary --btn-block"
                style={{ backgroundColor: '#DDF0FD', color: '#5DB8FC', marginTop:"10px" }}
              >
                Register
              </Button>
            </Stack>
            </form>
          </Typography>
        </Card>
      </Typography>
    </Typography>

    
  );
}

export default Register;
