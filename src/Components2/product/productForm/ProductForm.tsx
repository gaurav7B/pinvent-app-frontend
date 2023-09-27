import React, { ChangeEvent, FormEvent } from "react";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
import { Typography, Stack, Button, AppBar, TextField } from '@mui/material';
import "./ProductForm.css";
import Card from "../../Card/Card";

interface ProductFormProps {
  product: {
    name: string;
    category: string;
    price: number;
    quantity: number;
  };
  productImage: File | null;
  imagePreview: string | null;
  description: string;
  setDescription: (description: string) => void;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleImageChange: (e: ChangeEvent<HTMLInputElement>) => void;
  saveProduct: (e: FormEvent) => void;
}

const ProductForm: React.FC<ProductFormProps> = ({
  product,
  productImage,
  imagePreview,
  description,
  setDescription,
  handleInputChange,
  handleImageChange,
  saveProduct,
}) => {
  return (
    <Typography className="add-product">
      <Card cardClass={"card"}>
        <form onSubmit={saveProduct}>
          <Card cardClass={"group"}>
          <Typography variant="body1">Product Image</Typography>
            <TextField
              type="file"
              name="image"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleImageChange(e)}
            />

            {imagePreview != null ? (
              <div className="image-preview">
                <img src={imagePreview} alt="product" />
              </div>
            ) : (
              <Typography>No image set for this product.</Typography>
            )}
          </Card>
          <Stack>
            <Stack>
            <Typography variant="body1">Product Name:</Typography>
          <TextField
            type="text"
            placeholder="Product name"
            name="name"
            value={product?.name}
            onChange={handleInputChange}
          />
            </Stack>
            <Stack>
            <Typography variant="body1">Product Category:</Typography>
          <TextField
            type="text"
            placeholder="Product Category"
            name="category"
            value={product?.category}
            onChange={handleInputChange}
          />
            </Stack>
            <Stack>
            <Typography variant="body1">Product Price:</Typography>
          <TextField
            type="text"
            placeholder="Product Price"
            name="price"
            value={product?.price}
            onChange={handleInputChange}
          />
            </Stack>
            <Stack>
            <Typography variant="body1">Product Quantity:</Typography>
          <TextField
            type="text"
            placeholder="Product Quantity"
            name="quantity"
            value={product?.quantity}
            onChange={handleInputChange}
          />
            </Stack>
            <Stack>
            <Typography variant="body1">roduct Description:</Typography>
          <TextField
            value={description}
            onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
              setDescription(e.target.value)
            }
          />
            </Stack>
          </Stack>

          <Typography style={{ marginTop: 10 }}>
            <Button type="submit"  style={{ float: "right" , backgroundColor:"#030b6b", color:"#fff"}}>
              Save Product
            </Button>
          </Typography>
        </form>
      </Card>
    </Typography>
  );
};



export default ProductForm;
