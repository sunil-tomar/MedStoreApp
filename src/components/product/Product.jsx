import { useState, useContext, useEffect } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  IconButton,
  Dialog,
  DialogContent,
  Box,
  Typography,
  Button,
  TablePagination,
} from "@mui/material";
import { ArrowUpward, ArrowDownward } from "@mui/icons-material";
import { createData, MedList as MedsList } from "./../../store/store";
import { getAPICall } from "../../store/apiCall";
import { URL_FETCH_MEDS_LIST } from "../../store/CONSTANT";
import { SearchBox } from "./SearchBox";

const convertProdDataToMeds = (newMedsList) => {
  let convertProd = [];
  newMedsList.forEach((prod) => {
    convertProd.push(
      createData(
        prod.title,
        prod.price,
        prod.stock,
        "Capsule",
        "anytime",
        prod.images[0]
      )
    );
  });
  return convertProd;
};
export default function Product() {
  //Data
  const { medList } = useContext(MedsList);
  const [medsDataList, setMedsDataList] = useState(medList);
  const [serverData, setServerData] = useState(medList);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [productNameSearch, setProductNameSearch] = useState("");
  //Profile Image
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState("");

  const handleChangePage = (event, newPage) => {
    console.debug(newPage);
    setPage(newPage);
    updateProductRecord(); //updating record in prod table
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
    updateProductRecord(); //updating record in prod table
  };

  const updateProductRecord = () => {
    const startIndex = page * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    setMedsDataList(serverData.slice(startIndex, endIndex));
  };
  const handleProductNameSearch = (productNameSearch) => {
    console.debug(" searched product : " + productNameSearch);
    setProductNameSearch(productNameSearch);

    //if product search is "" or empty update table again.
    if (productNameSearch === "") return updateProductRecord(); //updating record in prod table

    //predicate for name match.
    const prodNameSearchPredicate = (prod) =>
      productNameSearch === ""
        ? prod
        : prod.name.toLowerCase().includes(productNameSearch.toLowerCase());

    setMedsDataList(serverData.filter(prodNameSearchPredicate));
  };
  const handleProductNameSearchClick = () => {};

  useEffect(() => {
    // fetchData from server;
    const newMedList = getAPICall(URL_FETCH_MEDS_LIST).then((respData) => {
      setIsLoading(true);
      try {
        const convertProd = convertProdDataToMeds(respData.products);
        setServerData(convertProd);
        console.log("newData length : " + convertProd.length);
        // setMedsDataList([...convertProd]);
        updateProductRecord(); //updating record in prod table
      } catch (error) {
      } finally {
        //setIsLoading(false);
      }
    });
  }, [isLoading]);

  const handleClose = () => {
    setOpen(false);
    setSelectedImageUrl("");
  };

  const handleImageView = (event, imgUrl) => {
    console.log(event.target.value);
    setSelectedImageUrl(imgUrl);
    setOpen(true);
  };

  const showProductImg = () => {
    return (
      <Dialog open={open} onClose={handleClose}>
        <DialogContent
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box sx={{ width: "600", height: "600", position: "relative" }}>
            <img
              src={selectedImageUrl}
              alt="Image"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />
          </Box>
        </DialogContent>
      </Dialog>
    );
  };
  return (
    <>
      <SearchBox
        handleProductNameSearch={handleProductNameSearch}
        handleProductNameSearchClick={handleProductNameSearchClick}
      />
      <Paper sx={{ width: "100%" }}>
        <TableContainer component={Paper}>
          <center>
            <b>Meds Store</b>
          </center>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>S.No</TableCell>
                <TableCell>Name</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Qty</TableCell>
                <TableCell align="right">Meds Type</TableCell>
                <TableCell align="right">Schedule Type</TableCell>
                <TableCell align="right">Image</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {medsDataList
                .filter((row) =>
                  productNameSearch === ""
                    ? row
                    : row.name
                        .toLowerCase()
                        .includes(productNameSearch.toLowerCase())
                )
                .map((row, i) => {
                  let itemSold = row.qty == "6" ? "grey" : "";
                  // console.log("itemSold color : " + itemSold);
                  return (
                    <TableRow
                      key={row.name + i}
                      sx={{
                        "&:last-child td, &:last-child th": {
                          border: 0,
                        },
                      }}
                      onClick={(event) => handleImageView(event, row.img)}
                      style={{ backgroundColor: itemSold }}
                    >
                      <TableCell component="th" scope="row">
                        {i + 1}
                      </TableCell>
                      <TableCell align="right">{row.name}</TableCell>
                      <TableCell align="right">{row.price}</TableCell>
                      <TableCell align="right">{row.qty}</TableCell>
                      <TableCell align="right">{row.med_type}</TableCell>
                      <TableCell align="right">{row.schedule_type}</TableCell>
                      <TableCell align="right">
                        <img src={row.img} style={{ height: "40px" }} />
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
            {showProductImg()}
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={serverData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}
