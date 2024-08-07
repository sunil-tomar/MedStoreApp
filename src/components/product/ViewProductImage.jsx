import { Dialog, DialogContent, Box } from "@mui/material";

export default function ViewProductImage({
  openImageViewDialog,
  handleImageViewClose,
  selectedImageUrl,
}) {
  return (
    <Dialog open={openImageViewDialog} onClose={handleImageViewClose}>
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
}
