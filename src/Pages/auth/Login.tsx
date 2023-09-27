import React, { useState, ChangeEvent, FormEvent } from "react";
import styles from "./auth.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { loginUser, validateEmail } from "../../services/authService";
import { SET_LOGIN, SET_NAME } from "../../redux/features/auth/authSlice";
import { Typography, Stack, Button, AppBar, TextField } from '@mui/material';
// import Loader from "../../components/loader/Loader";
import Card from "../../Components2/Card/Card";
import Loader from "../../Components2/loader/Loader";
import AcUnitIcon from '@mui/icons-material/AcUnit';
import HomeIcon from '@mui/icons-material/Home';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';


interface FormData {
  email: string;
  password: string;
}

const initialState: FormData = {
  email: "",
  password: "",
};

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>(initialState);
  const { email, password } = formData;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const login = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      return toast.error("All fields are required");
    }

    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email");
    }

    const userData = {
      email,
      password,
    };
    setIsLoading(true);
    try {
      const data = await loginUser(userData);
      console.log(data);
      await dispatch(SET_LOGIN(true));
      await dispatch(SET_NAME(data.name));
      navigate("/dashboard");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
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

  return (
    <Typography component="div" className='center-screen' 
    style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
    >
      <AppBar style={{width: "100%", backgroundColor: "#001B33"}}>
        <ul className="home-links">
           <Typography className="logo">
       <OnlineStatusIcon />
       </Typography>
        <li>
          <Button>
          <Link to="/register">Register</Link>
          </Button>
        </li>
        </ul>
      </AppBar>
      <Typography component="div" className={`container ${styles.auth}`}>
        <Card>
         <Typography className={styles.form}>
            <Typography component="div" className="Typography--flex-center">
              {/* <LockOpenIcon style={{ height: "50px", color: "#999" }} /> */}
            </Typography>
            <Typography variant="h2" style={{marginBottom:20}}>Login</Typography >

            <form onSubmit={login}>
            <Stack style={{ gap: "25px" }}>
              <TextField type="email" placeholder="Email" required name="email" value={email} onChange={handleInputChange} style={{ height: 30, }} />
              <TextField type="password" placeholder="Password" required name="password" value={password} onChange={handleInputChange} style={{ height: 30 }} />
              <Button
                type="submit"
                className="--btn--btn-primary --btn-block"
                style={{ backgroundColor: '#DDF0FD', color: '#5DB8FC' }}
              >
                 Login
              </Button>
            </Stack>
            </form>
            {/* <Stack style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Stack>
            <span className={styles.register}>
              <HomeIcon/>
            <Link to="/">Home</Link>
          </span>
            </Stack>
            <Stack>
            <span className={styles.register}>
              <AppRegistrationIcon/>
            <Link to="/register">Register</Link>
          </span>
            </Stack>
          </Stack> */}
          </Typography>
        </Card>
      </Typography>
    </Typography>
  );
};

export default Login;
  