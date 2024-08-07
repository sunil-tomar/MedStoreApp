import { Paper, InputBase, IconButton } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";

/**
 *   reference link :   https://mui.com/material-ui/react-text-field/
 */
export const SearchBox = ({ handleProductNameSearch }) => {
  const handleProdSearchNameChange = (searchedText) => {
    console.log("product name change --search val : " + searchedText);
    handleProductNameSearch(searchedText);
  };

  return (
    <Paper
      component="form"
      sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search Product Name"
        inputProps={{ "aria-label": "search product name" }}
        onKeyUp={(e) => handleProdSearchNameChange(e.target.value)}
      />
      <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};
