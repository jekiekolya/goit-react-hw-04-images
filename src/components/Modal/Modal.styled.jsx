import styled from '@emotion/styled';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  /* z-index: 1200; */
`;

export const ModalWindow = styled.div`
  width: calc(100vw - 480px);
  height: calc(100vh - 24px * 4);
  overflow: hidden;
`;

export const IMG = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
