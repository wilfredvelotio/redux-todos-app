import React, { useCallback } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const style: React.CSSProperties = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  minHeight: 300,
  backgroundColor: "whitesmoke",
  border: "1px solid #000",
  padding: 4,
  boxShadow: "1px 2px",
};

export const paddingStyle: React.CSSProperties = {
  padding: "15px",
};
interface FormsModalWrapperProps {
  isOpen: boolean;
  handleClose: () => void;
}
export const FormsModalWrapper: React.FC<FormsModalWrapperProps> = ({ isOpen, handleClose, children }) => {
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
            {children}
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default FormsModalWrapper;
