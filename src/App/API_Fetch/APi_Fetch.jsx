import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
axios.defaults.params = {
  key: '30187143-4d7f5699d03729238b163605a',
  image_type: 'photo',
  orientation: 'horizontal',
  per_page: '12',
};

export const fetchImg = async (searchQuery, page) => {
  const response = await axios.get(`?q=${searchQuery}&page=${page}`);
  return response.data;
};

export const needValues = data => {
  return data.map(({ id, tas, largeImageURL, webformatURL }) => ({
    id,
    largeImageURL,
    tas,
    webformatURL,
  }));
};
