import RecipesServices from '../services/RecipesServices';
import { mountRecipesList, getIngredientsKeyWords } from '../utils/recipes';

class RecipesController {
  constructor() {
    this.recipesService = new RecipesServices();
  }

  list = async (request, response) => {
    const { i: ingredient } = request.query;
    const keywords = getIngredientsKeyWords(ingredient);
    const recipesFound = await this.recipesService.getRecipes(ingredient);
    const recipesWithGiphys = await this.recipesService.getRecipes(
      recipesFound
    );
    const recipes = mountRecipesList(recipesWithGiphys);
    return response.json({ keywords, recipes });
  };
}

export default new RecipesController();
