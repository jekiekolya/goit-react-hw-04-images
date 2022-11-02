import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '30238693-0e670d13d8b6be1c19eb21932';

export async function fetchPhoto(searchValue, numberPage) {
  const config = {
    params: {
      key: KEY,
      q: searchValue,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: numberPage,
      per_page: 12,
    },
  };

  try {
    let { data } = await axios.get(`${BASE_URL}`, config);
    return data;
  } catch (error) {
    return error;
  }
}
