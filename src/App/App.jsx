import { useState, useEffect } from 'react';
import { ImgGalleryList } from './components/ImgGalleryList/ImgGalleryList';
import { SearchForm } from './components/Searchbar/Searchbar';
import { Modal } from './components/Modal/Modal';
import { fetchImg, needValues } from './API_Fetch/APi_Fetch';
import { ButtonLoadImg } from './components/Button/ButtonLoadImg';
import css from './App.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThreeCircles } from 'react-loader-spinner';

export const App = () => {
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [tags, seTtags] = useState('');
  const [totalHits, setTotalHits] = useState(0);

  useEffect(() => {
    if (!searchQuery) {
      return;
    }
    const renderGallery = async () => {
      setIsLoading(true);

      try {
        const { hits, totalHits } = await fetchImg(searchQuery, page);

        if (totalHits === 0) {
          toast.warn(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        }
        const newImages = needValues(hits);

        setImages(images => [...images, ...newImages]);
        setTotalHits(totalHits);
      } catch {
        setError(error);
        toast.error('Oops... Something went wrong');
      } finally {
        setIsLoading(false);
      }
    };
    renderGallery();
  }, [error, page, searchQuery]);

  const onSubmitForm = searchQuery => {
    setSearchQuery(searchQuery);
    setImages([]);
    setPage(1);
  };

  const onLoadMore = () => {
    setPage(page => page + 1);
  };

  const openModal = (largeImageURL, tags) => {
    toggleModal();
    setLargeImageURL(largeImageURL);
    seTtags(tags);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const allImages = images.length === totalHits;
  return (
    <>
      <ToastContainer />
      <header className={css.container}>
        <SearchForm onSubmit={onSubmitForm} />
      </header>
      <div className={css.spiner__container}>
        {isLoading && <ThreeCircles color="#1e2939" />}
      </div>
      <main className={css.container_main}>
        <ImgGalleryList images={images} onOpenModal={openModal} />
        {images.length !== 0 && !isLoading && !allImages && (
          <ButtonLoadImg onClick={onLoadMore} />
        )}
        {showModal && (
          <Modal
            onModalClick={toggleModal}
            largeImage={largeImageURL}
            alt={tags}
          />
        )}
      </main>
    </>
  );
};
