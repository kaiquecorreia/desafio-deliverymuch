import RecipesServices from '../services/RecipesServices';
import GiphyServices from '../services/GiphyServices';
import RedisServices from '../services/RedisServices';
import { getIngredientsKeyWords } from '../utils/recipes';
import ErrorHandler from '../error/ErrorHandler';
class RecipesController {
  constructor() {
    this.recipesService = new RecipesServices(GiphyServices);
    this.redisService = new RedisServices();
  }

  list = async (request, response) => {
    let result = null;
    const { i: ingredient } = request.query;
    const cacheRecipes = await this.redisService.getRedisData(ingredient);
    if (!cacheRecipes) {
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
      result = { keywords, recipes: recipesWithGiphys };

      await this.redisService.setRedisData(ingredient, result);
    } else {
      result = JSON.parse(cacheRecipes);
    }

    return response.status(200).json(result);
  };
}

export default new RecipesController();
