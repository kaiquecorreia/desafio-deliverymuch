import RecipesServices from '../services/RecipesServices';
import { mountRecipesList, getKeyWords } from '../utils/recipes';

class RecipesController {
  constructor() {
    this.recipesService = new RecipesServices();
  }

  listRecipes = async (request, response) => {
    const { i } = request.query;
    const keywords = getKeyWords(i);
    const recipesFound = await this.recipesService.getRecipes(i);
    const recipesWithGiphys = await this.recipesService.getRecipes(
      recipesFound
    );
    const recipes = mountRecipesList(recipesWithGiphys);
    return response.json({ keywords, recipes });
  };
}

export default new RecipesController();
