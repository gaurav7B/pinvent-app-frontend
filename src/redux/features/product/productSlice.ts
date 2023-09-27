import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import productService from "./productService";
import { toast } from "react-toastify";

interface Product {
  filePath: any;
  image: Product | null;
  description: Product | null;
  // Define the properties of a product here
  id: number;
  name: string;
  price: number;
  quantity: number;
  category: string;
  // Add other properties as needed
}

interface ProductState {
  product: Product | null;
  products: Product[];
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
  totalStoreValue: number;
  outOfStock: number;
  category: string[];
}

const initialState: ProductState = {
  product: null,
  products: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  totalStoreValue: 0,
  outOfStock: 0,
  category: [],
};

// Create New Product
export const createProduct:any = createAsyncThunk<Product, FormData>(
  "products/create",
  async (formData, thunkAPI) => {
    try {
      return await productService.createProduct(formData);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get all products
export const getProducts:any  = createAsyncThunk<Product[]>(
  "products/getAll",
  async (_, thunkAPI) => {
    try {
      return await productService.getProducts();
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete a Product
export const deleteProduct:any  = createAsyncThunk<void, number>(
  "products/delete",
  async (id, thunkAPI) => {
    try {
      await productService.deleteProduct(id);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get a product
export const getProduct:any  = createAsyncThunk<Product, number>(
  "products/getProduct",
  async (id, thunkAPI) => {
    try {
      return await productService.getProduct(id);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update product
export const updateProduct:any  = createAsyncThunk<Product, { id: number; formData: FormData }>(
  "products/updateProduct",
  async ({ id, formData }, thunkAPI) => {
    try {
      return await productService.updateProduct(id, formData);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const productSlice:any  = createSlice({
  name: "product",
  initialState,
  reducers: {
    CALC_STORE_VALUE(state, action: PayloadAction<Product[]>) {
      const products = action.payload;
      const array: number[] = [];
      products.forEach((item) => {
        const { price, quantity } = item;
        const productValue = price * quantity;
        array.push(productValue);
      });
      const totalValue = array.reduce((a, b) => a + b, 0);
      state.totalStoreValue = totalValue;
    },
    CALC_OUTOFSTOCK(state, action: PayloadAction<Product[]>) {
      const products = action.payload;
      const array: number[] = [];
      products.forEach((item) => {
        const { quantity } = item;
        array.push(quantity);
      });
      let count = 0;
      array.forEach((number) => {
        if (number === 0 || number.toString() === "0") {
          count += 1;
        }
      });
      state.outOfStock = count;
    },
    CALC_CATEGORY(state, action: PayloadAction<Product[]>) {
      const products = action.payload;
      const array: string[] = [];
      products.forEach((item) => {
        const { category } = item;
        array.push(category);
      });
      const uniqueCategory = [...new Set(array)];
      state.category = uniqueCategory;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        state.products.push(action.payload);
        toast.success("Product added successfully");
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = String(action.payload);
        toast.error(action.payload as any);
      })
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = String(action.payload);
        toast.error(action.payload as any);
      })
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProduct.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success("Product deleted successfully");
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = String(action.payload);
        toast.error(action.payload as any);
      })
      .addCase(getProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.product = action.payload;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = String(action.payload);
        toast.error(action.payload as any);
      })
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProduct.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success("Product updated successfully");
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = String(action.payload);
        toast.error(action.payload as any);
      });
  },
});

export const { CALC_STORE_VALUE, CALC_OUTOFSTOCK, CALC_CATEGORY } = productSlice.actions;

export const selectIsLoading = (state: { product: ProductState }) => state.product.isLoading;
export const selectProduct = (state: { product: ProductState }) => state.product.product;
export const selectTotalStoreValue = (state: { product: ProductState }) => state.product.totalStoreValue;
export const selectOutOfStock = (state: { product: ProductState }) => state.product.outOfStock;
export const selectCategory = (state: { product: ProductState }) => state.product.category;

export default productSlice.reducer;
