import { useState, useContext, useEffect } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  TablePagination,
} from "@mui/material";
import {
  DeleteForeverRounded as DeleteForeverRoundedIcon,
  EditRounded as EditRoundedIcon,
} from "@mui/icons-material";
import { createData, MedList as MedsList } from "./../../store/store";
import { getAPICall } from "../../store/apiCall";
import { URL_FETCH_MEDS_LIST } from "../../store/CONSTANT";
import { SearchBox } from "./SearchBox";
import { convertProdDataToMeds } from "../../utils/CommomMapper";
import { FILTER_PROD_NAME_SEARCH } from "../../utils/CommonFilter";
import ViewProductImage from "./ViewProductImage";
import EditProductModel from "./EditProductModel";

/**
 * This Component is design to show the products in table and do add/update/delete operations.
 * */

export default function Product() {
  //Data
  const { medList } = useContext(MedsList);
  const [medsDataList, setMedsDataList] = useState(medList);
  const [serverData, setServerData] = useState(medList);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [productNameSearch, setProductNameSearch] = useState("");
  //Profile Image
  const [openImageViewDialog, setOpenImageViewDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState("");
  const [editProductModal, setEditProductModal] = useState(false);
  const [product, setProduct] = useState();

  useEffect(() => {
    // fetchData from server;
    const newMedList = getAPICall(URL_FETCH_MEDS_LIST).then((respData) => {
      setIsLoading(true);
      try {
        const convertProd = convertProdDataToMeds(respData.products);
        setServerData(convertProd);
        console.log("newData length : " + convertProd.length);
        updateProductRecord(); //updating record in prod table
      } catch (error) {
        console.log(error);
      } finally {
        //setIsLoading(false);
      }
    });
  }, [isLoading]);

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
    return;
  };
  const handleProductNameSearch = (productNameSearch) => {
    console.debug(
      " searched product : ( " + productNameSearch + " )in product table"
    );
    setProductNameSearch(productNameSearch);

    //if product search is "" or empty update table again.
    if (
      productNameSearch === undefined ||
      (productNameSearch === "" && productNameSearch.length === 0)
    ) {
      return updateProductRecord(); //updating record in prod table
    }

    setMedsDataList(
      serverData.filter((prod) =>
        FILTER_PROD_NAME_SEARCH(prod, productNameSearch)
      )
    );
  };

  const handleImageViewClose = () => {
    setOpenImageViewDialog(false);
    setSelectedImageUrl("");
  };

  const handleImageViewOpen = (imgUrl) => {
    setSelectedImageUrl(imgUrl);
    setOpenImageViewDialog(true);
  };

  const handleProductEditModel = (prod) => {
    console.debug("entered into handleProductEditModel : " + { prod });
    console.debug(prod);
    setProduct(prod);
    setEditProductModal(true);
    console.debug("exiting from handleProductEditModel 2: " + { product });
    console.debug(product);
  };

  const handleProductDeleteModel = (prod) => {
    alert("are you sure to delete this product : " + prod.name);
  };
  return (
    <>
      <SearchBox handleProductNameSearch={handleProductNameSearch} />
      <ViewProductImage
        openImageViewDialog={openImageViewDialog}
        handleImageViewClose={handleImageViewClose}
        selectedImageUrl={selectedImageUrl}
      />
      <EditProductModel
        product={product}
        setProduct={setProduct}
        editProductModal={editProductModal}
        setEditProductModal={setEditProductModal}
      />
      <Paper sx={{ width: "100%" }}>
        <TableContainer component={Paper}>
          <center>
            <b>
              <h2>Meds Store</h2>
            </b>
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
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {medsDataList
                .filter((prod) =>
                  FILTER_PROD_NAME_SEARCH(prod, productNameSearch)
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
                      <TableCell
                        align="right"
                        onClick={() => handleImageViewOpen(row.img)}
                      >
                        <img src={row.img} style={{ height: "40px" }} />
                      </TableCell>
                      <TableCell align="right">
                        <span>
                          <EditRoundedIcon
                            onClick={() => handleProductEditModel(row)}
                            sx={{ fontSize: "50px", color: "blue" }}
                          />
                          <DeleteForeverRoundedIcon
                            onClick={() => handleProductDeleteModel(row)}
                            sx={{
                              marginLeft: "20px",
                              fontSize: "40px",
                              color: "red",
                            }}
                          />
                        </span>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 100]}
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
