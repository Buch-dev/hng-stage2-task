import * as React from "react";

const TicsArrowSvgIcon = ({ className, width = "18", height = "8", fill }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill={fill}
    viewBox="0 0 18 8"
    className={className}
  >
    <path
      fill={fill}
      d="M1 3.5a.5.5 0 0 0 0 1zm16.354.854a.5.5 0 0 0 0-.708L14.172.464a.5.5 0 1 0-.708.708L16.293 4l-2.828 2.828a.5.5 0 1 0 .707.708zM1 4.5h16v-1H1z"
    ></path>
  </svg>
);

export default TicsArrowSvgIcon;
