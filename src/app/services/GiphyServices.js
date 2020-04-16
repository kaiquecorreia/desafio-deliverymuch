import axios from 'axios';

export const GIF_DEFAULT =
  'https://gifimage.net/wp-content/uploads/2018/06/x-gif.gif';

export default class GiphyServices {
  errorMessage = null;

  constructor() {
    this.recipeGiphyUrl = process.env.GIPHY_URL;
    this.giphyApiKey = process.env.GIPHY_API_KEY;
  }

  getGifUrl = async (title) => {
    try {
      const params = {
        params: { api_key: this.giphyApiKey, q: title, limit: 1 },
      };
      const gifData = await axios.get(this.recipeGiphyUrl, params);
      if (gifData.data) {
        return gifData.data.data[0].images.original.url;
      } else {
        return GIF_DEFAULT;
      }
    } catch (error) {
      return GIF_DEFAULT;
    }
  };

  verifyGihpyServiceIsOn = async () => {
    try {
      const params = {
        params: { api_key: this.giphyApiKey },
      };
      const response = await axios.get(this.recipeGiphyUrl, params);

      return response.status === 200;
    } catch (error) {
      this.setErrorMessage(error.message);
      return false;
    }
  };

  getErrorMessage = () => {
    this.errorMessage;
  };

  setErrorMessage = (errorMessage) => {
    this.errorMessage = errorMessage;
  };
}
