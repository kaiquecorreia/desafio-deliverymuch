import {
  getIngredientsKeyWords,
  EMPTY_PARAMS,
  MAXKEYWORDS,
} from '../../../src/app/utils/recipes';

describe('Recipes', () => {
  describe('Recipes Utils', () => {
    it('should return error to empty params', () => {
      const ingredientsParams = '';
      const ingredientsArray = getIngredientsKeyWords(ingredientsParams);
      expect(ingredientsArray).toHaveProperty('error');
      expect(ingredientsArray.error).toBe(EMPTY_PARAMS);
    });

    it('should return error to empty params with undefined params', () => {
      const ingredientsParams = undefined;
      const ingredientsArray = getIngredientsKeyWords(ingredientsParams);
      expect(ingredientsArray).toHaveProperty('error');
      expect(ingredientsArray.error).toBe(EMPTY_PARAMS);
    });

    it('should return error max keywords', () => {
      const ingredientsParams = 'onion,tomato,banana,orange';
      const ingredientsArray = getIngredientsKeyWords(ingredientsParams);
      expect(ingredientsArray).toHaveProperty('error');
      expect(ingredientsArray.error).toBe(MAXKEYWORDS);
    });

    it('should return array of keywords', () => {
      const ingredientsParams = 'onion,tomato';
      const ingredientsArray = getIngredientsKeyWords(ingredientsParams);
      expect(ingredientsArray.length).toBe(2);
      expect(ingredientsArray).toContain('onion');
      expect(ingredientsArray).toContain('tomato');
    });
  });
});
