import React, { useCallback } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Button, SxProps, Theme } from "@mui/material";

const style: SxProps<Theme> = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  minHeight: 300,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const paddingStyle: React.CSSProperties = {
  padding: "15px",
};
interface FormsModalWrapperProps {
  isOpen: boolean;
  handleClose: () => void;
  renderProps: () => JSX.Element;
}
export const FormsModalWrapper: React.FC<FormsModalWrapperProps> = ({ isOpen, handleClose, renderProps }) => {
  return (
    <div>
      <Modal
        keepMounted
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <Box sx={{ display: "flex", flexDirection: "column", maxWidth: "400px", margin: "100px auto" }}>
            {renderProps()}
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export const BoxContainer: React.FC<{ name: string; renderProps: () => JSX.Element }> = ({ name, renderProps }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <Button variant="outlined" sx={{ margin: 2 }}>
        Edit {name}
      </Button>
      {renderProps()}
      <Button type="submit" variant="contained">
        Submit
      </Button>
    </Box>
  );
};
export default FormsModalWrapper;
