export const getIngredientsKeyWords = (ingredients) => {
  return typeof ingredients === 'string'
    ? ingredients.split(',').map((item) => item.trim())
    : false;
};

export const mountRecipesList = () => {
  return [];
};
