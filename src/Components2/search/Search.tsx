import React, { ChangeEvent } from "react";
import styles from "./Search.module.css";
import { Typography ,AppBar, Button, TextField} from '@mui/material';


interface SearchProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Search: React.FC<SearchProps> = ({ value, onChange }) => {
  return (
    <Typography component="div" className={styles.search}>
      <TextField
        type="text"
        placeholder="Search products"
        value={value}
        onChange={onChange}
      />
    </Typography>
  );
};

export default Search;
