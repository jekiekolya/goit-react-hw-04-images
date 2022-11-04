import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { ThreeDots } from 'react-loader-spinner';

import { fetchPhoto } from 'api/fetch-photo';
import { Searchbar, ImageGallery, Button, Modal } from './index';

import { Box } from './Box';
import { Container } from './App.styled';
import { useReducer, useEffect, useRef } from 'react';

export function App() {
  const initialState = {
    page: 1,
    query: '',
    photos: [],
    totalItems: 0,
    isLoading: false,
    isModalShow: false,
    modalData: {
      largeImageURL: '',
      altName: '',
    },
  };

  function reducer(prevState, { type, payload }) {
    switch (type) {
      case 'page':
        return { ...prevState, page: payload };
      case 'query':
        return { ...prevState, query: payload };
      case 'photos':
        return { ...prevState, photos: payload };
      case 'totalItems':
        return { ...prevState, totalItems: payload };
      case 'isLoading':
        return { ...prevState, isLoading: payload };
      case 'isModalShow':
        return { ...prevState, isModalShow: payload };
      case 'modalData':
        return { ...prevState, modalData: payload };

      default:
        return prevState;
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);
  const { query, photos, totalItems, page, isLoading, isModalShow, modalData } =
    state;

  const isFirstLoad = useRef(true);
  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }

    if (query === '') {
      Notify.failure('Request can no be empty string');
      return;
    }

    fetchPhoto(query, page)
      .then(r => {
        if (r.hits.length === 0) {
          Notify.failure(`We didn't find anything!`);
        }
        dispatch({ type: 'photos', payload: [...photos, ...r.hits] });
        dispatch({ type: 'totalItems', payload: r.total });
      })
      .catch(error => {
        Notify.failure(`We have a problem!`);
      })
      .finally(() => {
        dispatch({ type: 'isLoading', payload: false });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, query]);

  const handelSubmit = e => {
    e.preventDefault();
    const searchQuery = e.currentTarget.elements.query.value;

    if (searchQuery !== query) {
      dispatch({ type: 'page', payload: 1 });
      dispatch({ type: 'query', payload: searchQuery });
      dispatch({ type: 'photos', payload: [] });
      dispatch({ type: 'totalItems', payload: 0 });
      dispatch({ type: 'isLoading', payload: true });
    } else {
      Notify.failure(`Put something else!`);
    }
  };

  const loadMore = () => {
    dispatch({ type: 'page', payload: page + 1 });
    dispatch({ type: 'isLoading', payload: true });
  };

  const toggleIsModalShow = () => {
    dispatch({ type: 'isModalShow', payload: !isModalShow });
  };

  const openModalWindow = newModalData => {
    if (newModalData.largeImageURL !== modalData.largeImageURL) {
      dispatch({ type: 'modalData', payload: { ...newModalData } });
    }
    toggleIsModalShow();
  };

  return (
    <Container>
      {/* ---------Header------------- */}
      <Searchbar handelSubmit={handelSubmit} />

      {/* ---------Gallery------------- */}
      <ImageGallery photos={photos} openModalWindow={openModalWindow} />

      {/* ---------Load more------------- */}
      {totalItems > page * 12 && !isLoading && (
        <Box display="flex" justifyContent="center">
          <Button labelName="Load more" handleClick={loadMore} />
        </Box>
      )}

      {/* ---------Loader------------- */}
      {isLoading && (
        <Box display="flex" justifyContent="center">
          <ThreeDots
            height="80"
            width="80"
            radius="9"
            color="#3f51b5"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            visible={true}
          />
        </Box>
      )}

      {/* ---------Modal window------------- */}
      {isModalShow && (
        <Modal modalData={modalData} toggleIsModalShow={toggleIsModalShow} />
      )}
    </Container>
  );
}
