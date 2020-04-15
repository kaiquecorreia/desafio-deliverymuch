import { getIngredientsKeyWords } from '../../../src/app/utils/recipes';
describe('Recipes', () => {
  describe('Recipes Utils', () => {
    it('should return false to non string', () => {
      const ingredientsParams = 123;
      const ingredientsArray = getIngredientsKeyWords(ingredientsParams);
      expect(ingredientsArray).toBeFalsy();
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
