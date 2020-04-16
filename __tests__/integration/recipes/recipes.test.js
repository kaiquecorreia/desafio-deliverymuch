import 'dotenv/config';
import RecipesController from '../../../src/app/controllers/RecipesController';
import httpMocks from 'node-mocks-http';

describe('Integration Tests Recipes', () => {
  describe('Recipes Controllers', () => {
    it('should return list of recipes', async () => {
      jest.setTimeout(20000);
      const request = httpMocks.createRequest({
        method: 'GET',
        query: { i: 'onions' },
      });
      const response = httpMocks.createResponse();
      const recipesResult = await RecipesController.list(request, response);
      const recipes = JSON.parse(recipesResult._getData());
      expect(recipesResult.statusCode).toBe(200);
      expect(recipes).toHaveProperty('keywords');
      expect(recipes.keywords.length).toBe(1);
      expect(recipes).toHaveProperty('recipes');
    });
  });
});
