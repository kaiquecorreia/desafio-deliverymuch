import axios from 'axios';
import GiphyServices from '../services/GiphyServices';
import { mountRecipesList } from '../utils/recipes';
import ErrorHandler from '../error/ErrorHandler';

export const EMPTY_RECIPESLIST = 'No recipes found.';
export const RECIPEPUPPY_API_OFFLINE =
  'Recipe Puppy API is offline or with errors.';

export const GIPHY_API_OFFLINE = 'GIPHY API is offline or with errors.';

export default class RecipesService {
  constructor(GiphyServices) {
    this.recipePuppyApiUrl = process.env.RECIPEPUPPY_URL;
    this.recipeGiphyUrl = process.env.GIPHY_URL;
    this.giphyApiKey = process.env.GIPHY_API_KEY;
    this.giphyServices = new GiphyServices();
  }
  getRecipes = async (ingredients) => {
    try {
      const params = { params: { i: ingredients } };
      const recipesList = await axios.get(this.recipePuppyApiUrl, params);

      if (recipesList.status !== 200) {
        return ErrorHandler.mountError(RECIPEPUPPY_API_OFFLINE);
      }

      const recipesListResult = recipesList.data.results;
      if (!recipesListResult.length) {
        return ErrorHandler.mountError(EMPTY_RECIPESLIST);
      }

      return recipesListResult;
    } catch (error) {
      return ErrorHandler.mountError(error.message);
    }
  };

  getRecipesWithGif = async (recipes) => {
    try {
      const statusGiphy = await this.giphyServices.verifyGihpyServiceIsOn();
      if (!statusGiphy) {
        return ErrorHandler.mountError(
          this.giphyServices.errorMessage || GIPHY_API_OFFLINE
        );
      }
      const recipeWithGif = Promise.all(
        recipes.map((recipe) => mountRecipesList(recipe, this.giphyServices))
      );
      return recipeWithGif;
    } catch (error) {
      return ErrorHandler.mountError(error.message);
    }
  };
}
