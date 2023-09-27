import React, { useState, ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { Typography, Stack, Button  ,AppBar} from '@mui/material';


interface SidebarItemProps {
  item: MenuItem;
  isOpen: boolean;
}

interface MenuItem {
  title: string;
  icon?: ReactNode;
  path: string;
  childrens?: MenuItem[];
}

const activeLink = ({ isActive }: { isActive: boolean }) => (isActive ? 'active' : 'link');
const activeSublink = ({ isActive }: { isActive: boolean }) => (isActive ? 'active' : 'link');

const SidebarItem: React.FC<SidebarItemProps> = ({ item, isOpen }) => {
  const [expandMenu, setExpandMenu] = useState(false);

  if (item.childrens) {
    return (
      <Typography component="div"
        className={expandMenu ? 'sidebar-item s-parent open' : 'sidebar-item s-parent'}
      >
        <Typography component="div" className="sidebar-title">
          <span>
            {item.icon && <div className="icon">{item.icon}</div>}
            {isOpen && <div>{item.title}</div>}
          </span>
          <Button className="arrow-icon"
            onClick={() => setExpandMenu(!expandMenu)}>
                Arrow
          </Button>
        </Typography>
        <Typography component="div" className="sidebar-content">
          {item.childrens.map((child, index) => (
            <Typography component="div" key={index} className="s-child">
              <NavLink to={child.path} className={activeSublink}>
                <Typography component="div" className="sidebar-item">
                  <Typography component="div" className="sidebar-title">
                    <span>
                      {child.icon && <div className="icon">{child.icon}</div>}
                      {isOpen && <div>{child.title}</div>}
                    </span>
                  </Typography>
                </Typography>
              </NavLink>
            </Typography>
          ))}
        </Typography>
      </Typography>
    );
  } else {
    return (
      <NavLink to={item.path} className={activeLink}>
        <Typography component="div" className="sidebar-item s-parent">
          <Typography component="div" className="sidebar-title">
            <span>
              {item.icon && <div className="icon">{item.icon}</div>}
              {isOpen && <div>{item.title}</div>}
            </span>
          </Typography>
        </Typography>
      </NavLink>
    );
  }
};

export default SidebarItem;
