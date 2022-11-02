import PropTypes from 'prop-types';

import { Item, Img } from './ImageGalleryItem.styled';

export default function ImageGalleryItem({
  url,
  name,
  largeImageURL,
  openModalWindow,
}) {
  const newModalData = {
    largeImageURL: largeImageURL,
    altName: name,
  };
  return (
    <Item onClick={() => openModalWindow(newModalData)}>
      <Img src={url} alt={name} />
    </Item>
  );
}

ImageGalleryItem.propTypes = {
  url: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  openModalWindow: PropTypes.func.isRequired,
};
