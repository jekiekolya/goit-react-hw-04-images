import React, { Component } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { ThreeDots } from 'react-loader-spinner';

import { fetchPhoto } from 'api/fetch-photo';
import { Searchbar, ImageGallery, Button, Modal } from './index';

import { Box } from './Box';
import { Container } from './App.styled';

export class App extends Component {
  state = {
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

  // Logic for first research
  // componentDidMount() {
  //   fetchPhoto(this.state.query, this.state.page)
  //     .then(r => {
  //       this.setState(() => {
  //         return {
  //           photos: [...this.state.photos, ...r.hits],
  //           totalItems: r.total,
  //         };
  //       });
  //     })
  //     .catch(error => {
  //       Notify.failure(`We have a problem!`);
  //     });
  // }

  componentDidUpdate(_, prevState) {
    // Fetch data
    if (
      prevState.page !== this.state.page ||
      prevState.query !== this.state.query
    ) {
      fetchPhoto(this.state.query, this.state.page)
        .then(r => {
          if (r.hits.length === 0) {
            Notify.failure(`We didn't find anything!`);
          }
          this.setState(prevState => {
            return {
              photos: [...prevState.photos, ...r.hits],
              totalItems: r.total,
            };
          });
        })
        .catch(error => {
          Notify.failure(`We have a problem!`);
        })
        .finally(() => {
          this.setState(() => {
            return {
              isLoading: false,
            };
          });
        });
    }
  }

  handelSubmit = e => {
    e.preventDefault();
    const searchQuery = e.currentTarget.elements.query.value;

    if (searchQuery !== this.state.query) {
      this.setState(() => {
        return {
          page: 1,
          query: searchQuery,
          photos: [],
          totalItems: 0,
          isLoading: true,
        };
      });
    } else {
      Notify.failure(`Put something else!`);
    }
  };

  loadMore = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1, isLoading: true };
    });
  };

  toggleIsModalShow = () => {
    this.setState(prevState => {
      return { isModalShow: !prevState.isModalShow };
    });
  };

  openModalWindow = newModalData => {
    if (newModalData.largeImageURL !== this.state.modalData.largeImageURL) {
      this.setState(() => {
        return {
          modalData: { ...newModalData },
        };
      });
    }
    this.toggleIsModalShow();
  };

  render() {
    const { handelSubmit, loadMore, toggleIsModalShow, openModalWindow } = this;
    const { photos, totalItems, page, isLoading, isModalShow, modalData } =
      this.state;

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
}
