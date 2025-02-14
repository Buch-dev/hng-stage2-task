import React from "react";
import PropTypes from "prop-types";
import TicsArrowSvgIcon from "./tics-arrow";

const Button = ({
  children,
  withArrow,
  className,
  disabled,
  style,
  onClick,
  ...props
}) => {
  return (
    <button
      {...props}
      className={className}
      disabled={disabled}
      style={style}
      onClick={onClick}
    >
      {children}
      {withArrow && <TicsArrowSvgIcon fill={''} className='' />}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  withArrow: PropTypes.bool,
};

Button.defaultProps = {
  withArrow: false,
};

export default Button;
