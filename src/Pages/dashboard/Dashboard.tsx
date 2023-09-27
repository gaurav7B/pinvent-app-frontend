import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import { selectIsLoggedIn } from "../../redux/features/auth/authSlice";
import { getProducts } from "../../redux/features/product/productSlice";
import ProductList from "../../Components2/product/productList/ProductList";
import { Typography } from "@mui/material";


const Dashboard: React.FC = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();

  const isLoggedIn: boolean = useSelector((state: any) => selectIsLoggedIn(state));
  const { products, isLoading, isError, message } = useSelector(
    (state: any) => state.product
  );

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getProducts());
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);

  return (
    <Typography>
      <ProductList products={products} isLoading={isLoading} />
    </Typography>
  );
};

export default Dashboard;
