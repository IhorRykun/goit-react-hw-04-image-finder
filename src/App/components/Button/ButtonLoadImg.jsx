import PropTypes from 'prop-types';
import { ButtonLoader } from './ButtonLoadImg.styled';

export const ButtonLoadImg = ({ onClick }) => {
  return (
    <>
      <ButtonLoader type="button" onClick={onClick}>
        Load More
      </ButtonLoader>
    </>
  );
};

ButtonLoader.prototype = {
  onClick: PropTypes.func.isRequired,
};
