import RecipesServices from '../services/RecipesServices';
import GiphyServices from '../services/GiphyServices';
import { getIngredientsKeyWords } from '../utils/recipes';
import ErrorHandler from '../error/ErrorHandler';
class RecipesController {
  constructor() {
    this.recipesService = new RecipesServices(GiphyServices);
  }

  list = async (request, response) => {
    const { i: ingredient } = request.query;
    const keywords = getIngredientsKeyWords(ingredient);

    if (ErrorHandler.hasError(keywords)) {
      return ErrorHandler.responseError(response, keywords);
    }

    const recipesFound = await this.recipesService.getRecipes(ingredient);

    if (ErrorHandler.hasError(recipesFound)) {
      return ErrorHandler.responseError(response, recipesFound);
    }

    const recipesWithGiphys = await this.recipesService.getRecipesWithGif(
      recipesFound
    );

    if (ErrorHandler.hasError(recipesWithGiphys)) {
      return ErrorHandler.responseError(response, recipesWithGiphys);
    }

    return response.status(200).json({ keywords, recipes: recipesWithGiphys });
  };
}

export default new RecipesController();
