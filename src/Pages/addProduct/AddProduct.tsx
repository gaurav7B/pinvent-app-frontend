import React, { useState, ChangeEvent, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  createProduct,
  selectIsLoading,
} from "../../redux/features/product/productSlice";
import Loader from "../../Components2/loader/Loader";
import ProductForm from "../../Components2/product/productForm/ProductForm";
import { Typography } from '@mui/material';


export {};

interface Product {
    name: string;
    category: string;
    quantity: number; // Changed to number
    price: number; // Changed to number
  }
  
  const initialState: Product = {
    name: "",
    category: "",
    quantity: 0, // Initialize with 0 or any appropriate default value
    price: 0, // Initialize with 0 or any appropriate default value
  };
  
  const AddProduct: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [product, setProduct] = useState<Product>(initialState);
    const [productImage, setProductImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [description, setDescription] = useState<string>("");

  
    const isLoading = useSelector(selectIsLoading);
  
    const { name, category, price, quantity } = product;
  
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setProduct({ ...product, [name]: value });
    };
  
    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        setProductImage(e.target.files[0]);
        setImagePreview(URL.createObjectURL(e.target.files[0]));
      }
    };
  
    const generateKSKU = (category: string) => {
      const letter = category.slice(0, 3).toUpperCase();
      const number = Date.now();
      const sku = letter + "-" + number;
      return sku;
    };
  
    const saveProduct = async (e: FormEvent) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append("name", name);
      formData.append("sku", generateKSKU(category));
      formData.append("category", category);
      formData.append("quantity", String(quantity)); // Convert to string
      formData.append("price", String(price)); // Convert to string
      formData.append("description", description);
      if (productImage) {
        formData.append("image", productImage);
      }
  
      console.log(formData);
  
      await dispatch(createProduct(formData));
  
      navigate("/dashboard");
    };
  
    return (
      <Typography component="div">
        {isLoading && <Loader />}
        <h3 className="--mt">Add New Product</h3>
        <ProductForm
          product={product}
          productImage={productImage}
          imagePreview={imagePreview}
          description={description}
          setDescription={setDescription}
          handleInputChange={handleInputChange}
          handleImageChange={handleImageChange}
          saveProduct={saveProduct}
        />
      </Typography>
    );
  };
  
  export default AddProduct;
