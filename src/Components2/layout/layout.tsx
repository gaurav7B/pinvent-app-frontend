import React, { ReactNode } from 'react';
import { Typography, AppBar, Button } from '@mui/material';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <Typography style={{ minHeight: "80vh" }} className="--pad">
        {children}
      </Typography>
      <Footer />
    </>
  );
}

export default Layout;
