import { createPortal } from 'react-dom';
import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { Overlay, ModalWindow, IMG } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.onKeydown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeydown);
  }

  onKeydown = e => {
    if (e.code === 'Escape') {
      this.props.toggleIsModalShow();
    }
  };

  handleClick = e => {
    if (e.currentTarget === e.target) {
      this.props.toggleIsModalShow();
    }
  };

  render() {
    const { handleClick } = this;
    return createPortal(
      <Overlay onClick={handleClick}>
        <ModalWindow>
          <IMG
            src={this.props.modalData.largeImageURL}
            alt={this.props.modalData.altName}
          />
        </ModalWindow>
      </Overlay>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  toggleIsModalShow: PropTypes.func.isRequired,
};
