import { useEffect } from 'react';
import { MidalContent, ModalBackDrop } from './Modal.styled';
import PropTypes from 'prop-types';

export const Modal = ({ onModalClick, largeImage, alt }) => {
  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);
  });

  const onKeyDown = e => {
    if (e.code === 'Escape') {
      onModalClick();
    }
  };

  const onBackDropClick = e => {
    if (e.target === e.currentTarget) {
      onModalClick();
    }
  };

  return (
    <ModalBackDrop onClick={onBackDropClick}>
      <MidalContent>
        <img src={largeImage} style={{ width: '1024px' }} alt={alt} />
      </MidalContent>
    </ModalBackDrop>
  );
};

Modal.prototypes = {
  alt: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
  onModalClick: PropTypes.func.isRequired,
};
