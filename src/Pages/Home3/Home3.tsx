import React from 'react';
import { Typography ,AppBar, Button} from '@mui/material';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import "./Home.css";
import heroImg from "../../assets/inv-img.png"

interface NumberTextProps {
  num: number;
  text: string;
}

function Home3() {
  return (
    <Typography className='home' style={{backgroundColor:"#fff !important"}}>
    <AppBar style={{width: "100%", backgroundColor: "#001B33"}}>
      <Typography className="logo">
        <AcUnitIcon style={{height:"35px"}}/>
      </Typography>
      <ul className="home-links">
        <li>
          <Button>
          <Link to="/login">Login</Link>
          </Button>
        </li>
      </ul>
    </AppBar>
    {/* Hero Section */}
    <Typography className="container hero"style={{marginRight:"900px", }}>
      <Typography className="hero-text" style={{marginTop:"200px",}}>
        <h2>Inventory and Stock Management Solution</h2>
        <p>Inventory System to control and manage products in warehouse
          in real time and integrated to make it easier to develop your business.
        </p>
        <Typography className="hero-buttons">
        <Button style={{ border: '1px solid #030b6b' , marginBottom:"10px"}}>
          <Link to="/dashboard">Free Trial 1 Month</Link>
        </Button>
        </Typography>
        <Typography className="--flex-start"style={{gap:"20px",}}>
        <NumberText num={140000} text="Brand Owners" />
        <NumberText num={230000} text="Active Users" />
        <NumberText num={500} text="Partners" />
        </Typography>
      </Typography>
      {/* <Typography className="hero-image" style={{marginTop:"100px",}}>
        <img src={heroImg} alt="Inventory" style={{marginLeft:"500px", width:"700px"}} />
      </Typography> */}
    </Typography>
    </Typography>
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

export default Home3;

