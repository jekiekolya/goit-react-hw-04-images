import { createPortal } from 'react-dom';
import { useEffect } from 'react';

import PropTypes from 'prop-types';

import { Overlay, ModalWindow, IMG } from './Modal.styled';

const modalRoot = document.getElementById('modal-root');

export default function Modal({ modalData, toggleIsModalShow }) {
  useEffect(() => {
    window.addEventListener('keydown', onKeydown);
    return () => {
      window.removeEventListener('keydown', onKeydown);
    };
  });

  const onKeydown = e => {
    if (e.code === 'Escape') {
      toggleIsModalShow();
    }
  };

  const handleClick = e => {
    if (e.currentTarget === e.target) {
      toggleIsModalShow();
    }
  };

  return createPortal(
    <Overlay onClick={handleClick}>
      <ModalWindow>
        <IMG src={modalData.largeImageURL} alt={modalData.altName} />
      </ModalWindow>
    </Overlay>,
    modalRoot
  );
}

Modal.propTypes = {
  toggleIsModalShow: PropTypes.func.isRequired,
};
