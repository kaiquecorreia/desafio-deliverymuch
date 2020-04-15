import ErrorHandler from '../error/ErrorHandler';

export const EMPTY_PARAMS = 'Empty params.';
export const MAXKEYWORDS = 'Max keywords is 3.';

export const getIngredientsKeyWords = (ingredients) => {
  if (!ingredients) {
    return ErrorHandler.mountError(EMPTY_PARAMS);
  }

  const keywords = ingredients
    .split(',')
    .map((item) => item.trim())
    .filter((item) => item);

  if (!keywords.length) {
    return ErrorHandler.mountError(EMPTY_PARAMS);
  }
  return keywords.length > 3 ? ErrorHandler.mountError(MAXKEYWORDS) : keywords;
};

export const mountRecipesList = () => {
  return [];
};
