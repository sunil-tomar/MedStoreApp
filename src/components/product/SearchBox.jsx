import * as React from "react";
import { Paper, InputBase, IconButton } from "@mui/material";
import { Search as SearchIcon, Clear as ClearIcon } from "@mui/icons-material";
// ref   https://mui.com/material-ui/react-text-field/
export const SearchBox = ({
  handleProductNameSearch,
  handleProductNameSearchClick,
}) => {
  return (
    <Paper
      component="form"
      sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search Google Maps"
        inputProps={{ "aria-label": "search product name" }}
        onKeyUp={(e) => handleProductNameSearch(e.target.value)}
      />
      <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
        <SearchIcon onClick={handleProductNameSearchClick} />
      </IconButton>
    </Paper>
  );
};
