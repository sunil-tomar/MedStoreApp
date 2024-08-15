import { useState, useEffect } from "react";
import { Box, Button, Dialog, DialogContent } from "@mui/material";
//export const SearchBox = ({ handleProductNameSearch }) => {
export default function EditProductModel({
  product,
  setProduct,
  editProductModal,
  setEditProductModal,
}) {
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editedProduct, setEditedProduct] = useState(product);

  useEffect(() => {
    setOpenEditDialog(editProductModal);
  }, [product, editProductModal]);

  const handleEditDialogClose = () => {
    setOpenEditDialog(false);
    setEditProductModal(false);
  };

  const handleEdit = () => {
    // TODO: handle edit
    setEditProductModal(false);
    // Update the parent component with the edited product
    setProduct(editedProduct);
  };
  const handleProdEditSubmit = () => {
    
  };
  return (
    <Dialog open={openEditDialog} onClose={handleEditDialogClose}>
      <DialogContent>
        <Box>
          <h2>Edit Product</h2>
          {console.log(editedProduct)}
          {editedProduct != null ? (
            <div>
              <p>Name: {editedProduct.name}</p>
              <p>Price: {editedProduct.price}</p>
              <p>Qty: {editedProduct.qty}</p>
              <p>Meds Type: {editedProduct.med_type}</p>
              <p>Schedule Type: {editedProduct.schedule_type}</p>
              <img src={editedProduct.img} style={{ height: "40px" }} />
            </div>
          ) : (
            <h2>Product is not populating {editedProduct}</h2>
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={handleEditDialogClose}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleProdEditSubmit}
          >
            Submit
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
