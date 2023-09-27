import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../Components2/loader/Loader";
import ProductForm from "../../Components2/product/productForm/ProductForm";
import {
  getProduct,
  getProducts,
  selectIsLoading,
  selectProduct,
  updateProduct,
} from "../../redux/features/product/productSlice";
import { Typography, Stack } from '@mui/material';


interface Product {
    name: string;
    category: string;
    quantity: number;
    price: string;
    image?: {
      filePath: string;
      // Add other properties as needed
    };
  }

  
const defaultProduct: Product = {
    name: "",
    category: "",
    quantity: 0,
    price: "",
    image: undefined,
  };
  

const EditProduct: React.FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectIsLoading);

  const productEdit : any= useSelector(selectProduct);

  const [product, setProduct] = useState<Product | null | any>(productEdit as unknown as Product);
  const [productImage, setProductImage] = useState<File | null | any>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [description, setDescription] = useState<string>("");

  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch, id]);

  useEffect(() => {
    setProduct(productEdit as unknown as Product);

     setImagePreview(
      productEdit && productEdit.image ? `${productEdit.image.filePath}` : null
    );

    setDescription(
      productEdit && productEdit.description ? productEdit.description : ""
    );
  }, [productEdit]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct((prevProduct:any):any => {
      return {
        ...prevProduct,
        [name]: value !== "" ? value : undefined,
      };
    });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProductImage(e.target.files[0]);
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const saveProduct = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", product?.name || "");

    formData.append("category", product?.category || "");
    formData.append("quantity", product?.quantity || "");
    formData.append("price", product?.price || "");
    formData.append("description", description);
    if (productImage) {
      formData.append("image", productImage);
    }

    console.log(...formData);

    if (product) {
      await dispatch(updateProduct({ id, formData }));
      await dispatch(getProducts());
      navigate("/dashboard");
    }
  };

  return (
    <Typography component="div">
      {isLoading && <Loader />}
      <h3 className="--mt">Edit Product</h3>
      <ProductForm
        product={product || defaultProduct} // Use defaultProduct if product is null
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

export default EditProduct;
