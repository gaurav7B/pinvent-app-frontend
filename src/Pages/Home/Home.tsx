import React from 'react';
import { Typography ,AppBar, Button, Stack} from '@mui/material';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import "./Home.css";
import heroImg from "../../assets/inv-img.png";
import Login from '../auth/Login';

interface NumberTextProps {
  num: number;
  text: string;
}

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
const OnlineStatusIcon2 = () => (
  <img
    src="https://www.mandsconsulting.com/wp-content/uploads/MS-Logo-Web-H-500x164-White-White.svg"  // Replace with the actual path to your icon image
    alt="Online Icon"
    style={{
      width: '800px',   // Set the desired width
      height: '800px',  // Set the desired height
      marginRight: '10px',  // Adjust the margin as needed
    }}
  />
);

function Home() {
  return (
    // <Typography className='home' style={{backgroundColor:"#fff !important"}}>
    // <AppBar style={{width: "100%", backgroundColor: "#001B33"}}>

    //   <ul className="home-links">
    //   <Typography className="logo">
    //   <OnlineStatusIcon />
    //   </Typography>
    //     <li>
    //       <Button>
    //       <Link to="/register">Register</Link>
    //       </Button>
    //     </li>
    //     <li>
    //       <Button>
    //       <Link to="/login">Login</Link>
    //       </Button>
    //     </li>
    //     <li>
    //       <Button>
    //       <Link to="/dashboard">Dashboard</Link>
    //       </Button>
    //     </li>
    //   </ul>
    // </AppBar>
    // <Typography className="container hero"style={{marginRight:"900px", }}>
    //   <Typography className="hero-text" style={{marginTop:"150px",}}>
    //     <h2>Inventory and Stock Management Solution</h2>
    //     <p>Inventory System to control and manage products in warehouse
    //       in real time and integrated to make it easier to develop your business.
    //     </p>
    //     <Typography className="hero-buttons">
    //     <Button style={{ border: '1px solid #030b6b' , marginBottom:"10px"}}>
    //       <Link to="/dashboard">Free Trial 1 Month</Link>
    //     </Button>
    //     </Typography>
    //     <Typography className="--flex-start"style={{gap:"20px",}}>
    //     <NumberText num={140000} text="Brand Owners" />
    //     <NumberText num={230000} text="Active Users" />
    //     <NumberText num={500} text="Partners" />
    //     </Typography>
    //   </Typography>
    //   <Login/>
    // </Typography>
    // </Typography>
    <>
     <Login/>
    </>
  );
}

const NumberText: React.FC<NumberTextProps> = ({ num, text }) => {
  return (
    <Typography className='--mr'>
      <h3 className='--color-#030b6b'>{num}</h3>
      <p className='--color-#030b6b'>{text}</p>
    </Typography>
  );
};

export default Home;

