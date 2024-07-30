import { useState, useContext, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Box from "@mui/material/Box";
import { createData, MedList as MedsList } from "./../../store/store";

const fetchMeds = async () => {
  let newMedsList = [];
  await fetch("https://dummyjson.com/products?limit=194")
    .then((res) => {
      if (res.status != "200") throw new Error(res);
      return res.json();
    })
    .then((obj) => {
      console.log(obj);
      const prodS = obj.products;
      newMedsList = [...newMedsList, ...prodS];
      return newMedsList;
    })
    .catch((error) => console.error(error));
  return newMedsList;
};

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
  const { medList } = useContext(MedsList);
  const [open, setOpen] = useState(false);
  const [medsDataList, setMedsDataList] = useState(medList);
  const [selectedImageUrl, setSelectedImageUrl] = useState("");

  useEffect(() => {
    // fetchData from server;
    const newMedList = fetchMeds().then((respData) => {
      const convertProd = convertProdDataToMeds(respData);
      setMedsDataList((data) => {
        const newData = [...data, ...convertProd];
        console.log("newData length : " + newData.length);
        return newData;
      });
    });
  }, []);

  const handleClose = () => {
    setOpen(false);
    setSelectedImageUrl("");
  };

  const handleImageView = (event, imgUrl) => {
    console.log(event.target.value);
    setSelectedImageUrl(imgUrl);
    setOpen(true);
  };
  return (
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
          {medsDataList.map((row, i) => {
            let itemSold = row.qty == "6" ? "grey" : "";
            console.log("itemSold color : " + itemSold);
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
                  {i}
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
      </Table>
    </TableContainer>
  );
}
