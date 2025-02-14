import * as React from "react";

const MessageIcon = ({className}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="16"
    fill="none"
    viewBox="0 0 20 16"
    className={className}
  >
    <path
      fill="#fff"
      d="M18 0H2C.897 0 0 .897 0 2v12c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V2c0-1.103-.897-2-2-2m0 2v.511l-8 6.223-8-6.222V2zM2 14V5.044l7.386 5.745a.994.994 0 0 0 1.228 0L18 5.044 18.002 14z"
    ></path>
  </svg>
);

export default MessageIcon;
