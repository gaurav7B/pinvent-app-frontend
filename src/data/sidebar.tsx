import React, { ReactNode } from "react";
import AcUnitIcon from '@mui/icons-material/AcUnit';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import ViewCompactIcon from '@mui/icons-material/ViewCompact';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EditAttributesIcon from '@mui/icons-material/EditAttributes';

interface MenuItem {
    title: string;
    icon?: ReactNode;
    path: string;
    childrens?: MenuItem[];
  }

  const menu: MenuItem[] = [
    {
      title: "Dashboard",
      icon: <ViewCompactIcon />,
      path: "/dashboard",
    },
    {
      title: "Add Product",
      icon: <AddPhotoAlternateIcon />,
      path: "/add-product",
    },
  ];  
export default menu;
