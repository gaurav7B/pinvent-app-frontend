import React, { useEffect } from "react";
import loaderImg from "../../assets/loader.gif";
import ReactDOM from "react-dom";
import "./Loader.css";
import { Typography, Stack } from '@mui/material';


const Loader: React.FC = () => {
  useEffect(() => {
    const loaderElement = document.getElementById("loader");
    
    if (loaderElement) {
      ReactDOM.createPortal(
        <Typography component="div" className="wrapper">
          <Typography component="div" className="loader">
            <img src={loaderImg} alt="Loading..." />
          </Typography>
        </Typography>,
        loaderElement
      );
    }
  }, []); // Empty dependency array to run this effect only once

  return null; // Return null since this component doesn't render any visible content
};

export const SpinnerImg: React.FC = () => {
  return (
    <Typography component="div" className="--center-all">
      <img src={loaderImg} alt="Loading..." />
    </Typography>
  );
};

export default Loader;
