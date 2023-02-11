import PropTypes from 'prop-types';
import { ImgGalleryItem } from '../ImgGalleryItem/ImgGalleryItem';
import { ListImg } from './ImgGalleryList.styled';

export const ImgGalleryList = ({ images, onOpenModal }) => (
  <ListImg>
    {images.map(({ id, webformatURL, largeImageURL, tags }) => (
      <ImgGalleryItem
        key={id}
        url={webformatURL}
        largeImageURL={largeImageURL}
        tag={tags}
        openModal={onOpenModal}
      />
    ))}
  </ListImg>
);

ImgGalleryList.prototypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ).isRequired,
  onOpenModal: PropTypes.func.isRequired,
};
