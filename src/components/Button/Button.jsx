import PropTypes from 'prop-types';

import { ButtonStyled } from './Button.styled';

export default function Button({ labelName, handleClick }) {
  return <ButtonStyled onClick={handleClick}>{labelName}</ButtonStyled>;
}

Button.propTypes = {
  labelName: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};
