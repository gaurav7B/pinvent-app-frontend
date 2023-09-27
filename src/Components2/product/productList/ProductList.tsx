import React, { useEffect, useState } from "react";
import { SpinnerImg } from "../../loader/Loader";
import "./productList.css";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Search from "../../search/Search";
import { useDispatch, useSelector } from "react-redux";
import {
  FILTER_PRODUCTS,
  selectFilteredPoducts,
} from "../../../redux/features/product/filterSlice";
import ReactPaginate from "react-paginate";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import {
  deleteProduct,
  getProducts,
} from "../../../redux/features/product/productSlice";
import { Link } from "react-router-dom";
import {
  TableBody,
  TableRow,
  TableCell,
  Typography,
  Table,
  TableHead,
} from '@mui/material';

interface Product {
  _id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
}

interface ProductListProps {
  products: Product[];
  isLoading: boolean;
}

const ProductList: React.FC<ProductListProps> = ({ products, isLoading }) => {
  const [search, setSearch] = useState<string>("");
  const filteredProducts = useSelector(selectFilteredPoducts);

  const dispatch = useDispatch();

  const shortenText = (text: string, n: number): string => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat("...");
      return shortenedText;
    }
    return text;
  };

  const delProduct = async (id: string) => {
    console.log(id);
    await dispatch(deleteProduct(id));
    await dispatch(getProducts());
  };

  const confirmDelete = (id: string) => {
    confirmAlert({
      title: "Delete Product",
      message: "Are you sure you want to delete this product.",
      buttons: [
        {
          label: "Delete",
          onClick: () => delProduct(id),
        },
        {
          label: "Cancel",
          // onClick: () => alert('Click No')
        },
      ],
    });
  };

  // Begin Pagination
  const [currentItems, setCurrentItems] = useState<Product[]>([]);
  const [pageCount, setPageCount] = useState<number>(0);
  const [itemOffset, setItemOffset] = useState<number>(0);
  const itemsPerPage = 5;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;

    setCurrentItems(filteredProducts.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredProducts.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, filteredProducts]);

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % filteredProducts.length;
    setItemOffset(newOffset);
  };
  // End Pagination

  useEffect(() => {
    dispatch(FILTER_PRODUCTS({ products, search }));
  }, [products, search, dispatch]);

  return (
    <Typography className="product-list">
      <hr />
      <Typography component="div" className="table">
        <Typography className="--flex-between --flex-dir-column">
          <span>
            <h3>Inventory Items</h3>
          </span>
          <span>
            <Search
              value={search}
              onChange={(e: any) => setSearch(e.target.value)}
            />
          </span>
        </Typography>

        {isLoading && <SpinnerImg />}

        <Typography component="div" className="table">
          {!isLoading && products.length === 0 ? (
            <p>-- No product found, please add a product...</p>
          ) : (
            <Table>
              <TableHead className="table-head">
                <TableRow>
                  <TableCell className="uppercase-bold">s/n</TableCell>
                  <TableCell className="uppercase-bold">Name</TableCell>
                  <TableCell className="uppercase-bold">Category</TableCell>
                  <TableCell className="uppercase-bold">Price</TableCell>
                  <TableCell className="uppercase-bold">Quantity</TableCell>
                  <TableCell className="uppercase-bold">Value</TableCell>
                  <TableCell className="uppercase-bold">Action</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {currentItems.map((product, index) => {
                  const { _id, name, category, price, quantity } = product;
                  return (
                    <TableRow key={_id}>
                      <TableCell className="tablecontent">{index + 1}</TableCell>
                      <TableCell className="tablecontent">{shortenText(name, 16)}</TableCell>
                      <TableCell className="tablecontent">{category}</TableCell>
                      <TableCell className="tablecontent">
                        {"$"}
                        {price}
                      </TableCell>
                      <TableCell className="tablecontent">{quantity}</TableCell>
                      <TableCell className="tablecontent">
                        {"$"}
                        {price * quantity}
                      </TableCell>
                      <TableCell style={{ textDecoration: 'none' }}>
                        <span>
                        <Link to={`/edit-product/${_id}`} className="icon-link">
                          <EditIcon />
                       </Link>
                        </span>
                        <span>
                        <DeleteIcon className="hand-cursor" onClick={() => confirmDelete(_id)} />
                        </span>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </Typography>
        <ReactPaginate
          breakLabel="..."
          nextLabel="Next"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel="Prev"
          renderOnZeroPageCount={null}
          containerClassName="pagination"
          pageLinkClassName="page-num"
          previousLinkClassName="page-num"
          nextLinkClassName="page-num"
          activeLinkClassName="activePage"
        />
      </Typography>
    </Typography>
  );
};

export default ProductList;
