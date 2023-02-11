import PropTypes from 'prop-types';
import { Img } from './ImgCalleryItem.sytled';

export const ImgGalleryItem = ({ url, tag, openModal, largeImageURL }) => {
  return (
    <li>
      <Img
        src={url}
        alt={tag}
        onClick={() => {
          openModal(largeImageURL, tag);
        }}
      />
    </li>
  );
};

ImgGalleryItem.prototype = {
  url: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
