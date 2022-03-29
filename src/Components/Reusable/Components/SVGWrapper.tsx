import React from "react";
export const SVGWrapper: React.FC = () => {
  return (
    <svg
      viewBox="-30 -2 180 75"
      width="35"
      height="30"
      style={{
        fill: "#fefefe",
        boxShadow: "inset 0 0 0 2px #fefefe",
      }}
    >
      <rect width="120" height="10"></rect>
      <rect y="30" width="120" height="10"></rect>
      <rect y="60" width="120" height="10"></rect>
    </svg>
  );
};
