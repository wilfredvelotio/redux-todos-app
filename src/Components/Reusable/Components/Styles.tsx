import React from "react";
import { SxProps, Theme } from "@mui/material";

export const style: SxProps<Theme> = {
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

export const displayFlexCenter: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
};

export const displayFlexSpaceEvenly: React.CSSProperties = {
  ...displayFlexCenter,
  justifyContent: "space-evenly",
};

export const appHeaderBody: React.CSSProperties = {
  display: "flex",
  maxWidth: "1080px",
  height: "80px",
};

export const appBarBackgroundCenter: React.CSSProperties = {
  backgroundColor: "#7c3aed",
  fontSize: "40px",
  justifyContent: "center",
};

export const gridContainerCenter: React.CSSProperties = {
  backgroundColor: "#8b5cf6 ",
  height: " 45px",
  width: " 47px",
  display: " flex",
  alignItems: "center",
  justifyContent: "center",
  marginLeft: "auto",
  cursor: "pointer",
};

export const boxShadow: SxProps<Theme> = {
  boxShadow: 3,
};

export const gridContainerAlignCenter: React.CSSProperties = {
  ...displayFlexCenter,
  minHeight: "300px",
  alignItems: "center",
};

export const gridItemCenter: React.CSSProperties = {
  ...gridContainerAlignCenter,
  minHeight: "80px",
};

export const gridHeader: SxProps<Theme> = {
  display: "flex",
  pt: 6,
  m: 0,
  mx: "auto",
  maxWidth: "md",
};

export const centerImage: React.CSSProperties = {
  borderRadius: "50%",
  height: "100%",
  width: "100%",
};
export const cardHeight: React.CSSProperties = {
  height: "230px",
  width: "230px",
};

export const monteSerrat: React.CSSProperties = {
  fontFamily: `'Montserrat','sans-serif'`,
  minHeight: "200px",
};

export const noTextStyleAlignLeft: React.CSSProperties = {
  textDecoration: "none",
  marginLeft: "auto",
};

export const centerComponentMargin: React.CSSProperties = {
  maxWidth: "1080px",
  margin: "0 auto",
};

export const df: React.CSSProperties = {
  display: "flex",
};

export const df_flex_center_min_h: React.CSSProperties = {
  ...displayFlexCenter,
  minHeight: "100px",
};
