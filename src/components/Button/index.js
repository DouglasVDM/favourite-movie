import React from "react";
import PropTypes from 'prop-types';
// STYLES
import { Wrapper } from "../Button/Button.styles";

const Button = ({ text, callback }) => (
  <Wrapper type='button' onClick={callback}>
    {text}
  </Wrapper>
)

Button.propType = {
  text: PropTypes.string,
  callback: PropTypes.func
};

export default Button
