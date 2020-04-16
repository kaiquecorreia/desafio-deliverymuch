import axios from 'axios';
import ErrorHandler from '../error/ErrorHandler';

export const EMPTY_RECIPESLIST = 'No recipes found.';
export const RECIPEPUPPY_API_OFFLINE = 'Recipe Puppy API is offline.';
export default class RecipesService {
  constructor() {
    this.recipePuppyApiUrl = process.env.RECIPEPUPPY_URL;
  }
  getRecipes = async (ingredients) => {
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
  };

  getGiphy = async () => {
    return [];
  };
}
