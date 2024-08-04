import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
//import Image from "next/image"; // or any image component

export default function ViewProductImage({ imgUrl, open, handleClose }) {
  //debugger;
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <Image src={imageUrl} alt="Enlarged Image" layout="responsive" />
        </DialogContent>
      </Dialog>
    </div>
  );
}
