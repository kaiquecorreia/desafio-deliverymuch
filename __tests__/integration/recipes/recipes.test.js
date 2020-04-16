import '../../bootstrap';
import httpMocks from 'node-mocks-http';
import sinon from 'sinon';
import RecipesController from '../../../src/app/controllers/RecipesController';

describe('Integration Tests Recipes', () => {
  describe('Recipes Controllers', () => {
    it('should return list of recipes', async () => {
      jest.setTimeout(30000);
      const request = httpMocks.createRequest({
        method: 'GET',
        query: { i: 'onions' },
      });
      const getRedisDataFn = sinon
        .stub(RecipesController.redisService, 'getRedisData')
        .resolves(null);
      const setRedisDataFn = sinon
        .stub(RecipesController.redisService, 'setRedisData')
        .resolves(null);

      const response = httpMocks.createResponse();
      const recipesResult = await RecipesController.list(request, response);
      const recipes = JSON.parse(recipesResult._getData());
      expect(recipesResult.statusCode).toBe(200);
      expect(recipes).toHaveProperty('keywords');
      expect(recipes.keywords.length).toBe(1);
      expect(recipes).toHaveProperty('recipes');
      getRedisDataFn.restore();
      setRedisDataFn.restore();
    });
  });
});
