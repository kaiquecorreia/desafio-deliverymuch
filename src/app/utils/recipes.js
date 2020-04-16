import ErrorHandler from '../error/ErrorHandler';

export const EMPTY_PARAMS = 'Empty params.';
export const MAXKEYWORDS = 'Max keywords is 3.';

export const getIngredientsKeyWords = (ingredients) => {
  if (!ingredients) {
    return ErrorHandler.mountError(EMPTY_PARAMS);
  }

  const keywords = getArrayOfIngredients(ingredients);

  if (!keywords.length) {
    return ErrorHandler.mountError(EMPTY_PARAMS);
  }
  return keywords.length > 3 ? ErrorHandler.mountError(MAXKEYWORDS) : keywords;
};

export const mountRecipesList = async (recipe, giphyServices) => {
  const { title, ingredients: ingredientsString, href: link } = recipe;
  const gif = await giphyServices.getGifUrl(title);

  const ingredients = getArrayOfIngredients(ingredientsString);

  return {
    title,
    link,
    ingredients,
    gif,
  };
};

const getArrayOfIngredients = (ingredients) => {
  return ingredients
    .split(',')
    .map((item) => item.trim())
    .filter((item) => item)
    .sort();
};
