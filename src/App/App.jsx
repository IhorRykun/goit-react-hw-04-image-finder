import { Component } from 'react';
import { ImgGalleryList } from './components/ImgGalleryList/ImgGalleryList';
import { SearchForm } from './components/Searchbar/Searchbar';
import { Modal } from './components/Modal/Modal';
import { fetchImg, needValues } from './API_Fetch/APi_Fetch';
import { ButtonLoadImg } from './components/Button/ButtonLoadImg';
import css from './App.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThreeCircles } from 'react-loader-spinner';

export class App extends Component {
  state = {
    images: [],
    searchQuery: '',
    page: 1,
    error: null,
    isLoading: false,
    showModal: false,
    originalImageURL: '',
    tags: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const prevSearchQuery = prevState.searchQuery;
    const nextSearchQuery = this.state.searchQuery;
    const prevPage = prevState.page;
    const page = this.state.page;

    if (prevSearchQuery !== nextSearchQuery || prevPage !== page) {
      this.renderGalery();
    }
  }

  renderGalery = async () => {
    const { searchQuery, page } = this.state;
    this.setState({ isLoading: true });
    try {
      const { hits, totalHits } = await fetchImg(searchQuery, page);
      if (totalHits === 0) {
        toast.warn(
          'Вибачте, пошук за вашим запитом не дав результатів. Спробуйте ще раз...'
        );
      }
      const newImages = needValues(hits);

      this.setState(({ images }) => ({
        images: [...images, ...newImages],
        totalHits,
      }));
    } catch (error) {
      this.setState({
        error,
      });
      toast.error('Упс, щось пішло не так, будь ласка спробуйте ще раз');
    } finally {
      this.setState({ isLoading: false });
    }
  };

  onSubmitForm = searchQuery => {
    this.setState({ searchQuery, images: [], page: 1 });
  };

  onLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  openModal = (originalImageURL, tags) => {
    this.toggleModal();
    this.setState({ originalImageURL, tags });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { images, originalImageURL, tags, showModal, totalHits, isLoading } =
      this.state;
    const allImages = images.length === totalHits;
    return (
      <>
        <ToastContainer />
        <header className={css.container}>
          <SearchForm onSubmit={this.onSubmitForm} />
        </header>
        <div className={css.spiner__container}>
          {isLoading && <ThreeCircles color="#1e2939" />}
        </div>
        <main className={css.container_main}>
          <ImgGalleryList images={images} onOpenModal={this.openModal} />
          {images.length !== 0 && !isLoading && !allImages && (
            <ButtonLoadImg onClick={this.onLoadMore} />
          )}
          {showModal && (
            <Modal
              onModalClick={this.toggleModal}
              largeImage={originalImageURL}
              alt={tags}
            />
          )}
        </main>
      </>
    );
  }
}
