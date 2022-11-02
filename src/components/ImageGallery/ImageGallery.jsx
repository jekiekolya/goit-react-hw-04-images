import PropTypes from 'prop-types';

import { List } from './ImageGallery.styled';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

export default function ImageGallery({ photos, openModalWindow }) {
  return (
    <List>
      {photos.map(photo => {
        return (
          <ImageGalleryItem
            openModalWindow={openModalWindow}
            key={photo.id}
            url={photo.webformatURL}
            name={photo.tags}
            largeImageURL={photo.largeImageURL}
          />
        );
      })}
    </List>
  );
}

ImageGallery.propTypes = {
  photos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ),
  openModalWindow: PropTypes.func.isRequired,
};
