import React from 'react';
import logo from './logo.svg';
import { Typography, Stack, Button  ,AppBar} from '@mui/material';
import styles from "./auth.module.css";
import Card from '../../Components2/Card/Card';
import LoginIcon from '@mui/icons-material/Login';
import { Link } from 'react-router-dom';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import "./Home.css";

function Forgot() {
  return (
    <Typography className='home'>
      <AppBar  style={{width:"100%"}}>
      <Typography className="logo">
        <AcUnitIcon style={{height:"35px"}}/>
      </Typography>
      <ul className="home-links">
        <li>
          <Button>
          <Link to="/register">Register</Link>
          </Button>
        </li>
        <li>
          <Button>
          <Link to="/login">Login</Link>
          </Button>
        </li>
        <li>
          <Button>
          <Link to="/mainpage">Dashboard</Link>
          </Button>
        </li>
      </ul>
    </AppBar>
    <Typography className={`container ${styles.auth}`} style={{marginLeft:300}}>
      <Card>
        <Typography className={styles.form}>
            <Typography >
            <MailOutlineIcon style={{height:"50px", color:"#999",}}/>
            </Typography>
            <h2>Forgot Password</h2>

            <Stack style={{gap:"20px",}}>
                <input type="email" placeholder="Email" required name="email" style={{height:30}}/>
                <Button
                  type="submit"
                  className="--btn--btn-primary --btn-block"
                  style={{ backgroundColor: '#DDF0FD' , color: '#5DB8FC'}}
                >
                  Get Reset Email
                </Button>
             <Typography className={styles.links}>
                <p>
                <Link to="/">- Home</Link>
                </p>
                <p>
                <Link to="/login">- Login</Link>
                </p>
            </Typography>
            </Stack>
            
        </Typography>
      </Card>
    </Typography>
    </Typography>
  );
}

export default Forgot;