import React from 'react';
import { Typography, AppBar, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { logoutUser } from '../../services/authService';
import { SET_LOGIN, selectName } from '../../redux/features/auth/authSlice';

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const name = useSelector(selectName);

  const logout = async () => {
    await logoutUser();
    await dispatch(SET_LOGIN(false));
    navigate("/login");
  };

  return (
    <Typography className="--pad header">
      <Typography className="--flex-between">
        <Typography variant="h3">
          <span className="--fw-thin">Welcome, </span>
          <span className="--color-danger">{name}</span>
        </Typography>
        <Button onClick={logout}>
          Logout
        </Button>
      </Typography>
      <hr />
    </Typography>
  );
}

export default Header;
