import React from 'react';
import logo from './logo.svg';
import { Typography, Stack, Button } from '@mui/material';
import styles from "./auth.module.css";
import Card from '../../Components2/Card/Card';
import LoginIcon from '@mui/icons-material/Login';
import { Link } from 'react-router-dom';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockResetIcon from '@mui/icons-material/LockReset';

function Reset() {
  return (
    <Typography className={`container ${styles.auth}`} style={{marginLeft:300}}>
      <Card>
        <Typography className={styles.form}>
            <Typography >
            <LockResetIcon style={{height:"50px", color:"#999",}}/>
            </Typography>
            <h2>Reset Password</h2>

            <Stack style={{gap:"20px",}}>
                <input type="Password" placeholder="New Password" required name="password" style={{height:30}}/>
                <input type="Password" placeholder="Confirm New Password" required name="password" style={{height:30}}/>
                <Button
                  type="submit"
                  className="--btn--btn-primary --btn-block"
                  style={{ backgroundColor: '#DDF0FD' , color: '#5DB8FC'}}
                >
                  Reset Password
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
  );
}

export default Reset;



// import React from 'react';
// import logo from './logo.svg';
// import { Typography, Stack } from '@mui/material';


// function MainPage() {
//   return (
//     <div >
      
//     </div>
//   );
// }

// export default MainPage;