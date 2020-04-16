import axios from 'axios';
import sinon from 'sinon';
import {
  mockRecipeList,
  mockEmptyRecipeList,
  oneRecipe,
  mockGiphyResponse,
} from './mock';

import {
  getIngredientsKeyWords,
  getArrayOfIngredients,
  mountRecipesList,
  EMPTY_PARAMS,
  MAXKEYWORDS,
} from '../../../src/app/utils/recipes';

import RecipesServices, {
  EMPTY_RECIPESLIST,
  RECIPEPUPPY_API_OFFLINE,
} from '../../../src/app/services/RecipesServices';
import GiphyServices, {
  GIF_DEFAULT,
} from '../../../src/app/services/GiphyServices';

describe('Unity Tests Recipes', () => {
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

    it('should return array of ingredients keywords', () => {
      const ingredientsParams = 'onion,tomato';
      const ingredientsArray = getIngredientsKeyWords(ingredientsParams);
      expect(ingredientsArray.length).toBe(2);
      expect(ingredientsArray).toContain('onion');
      expect(ingredientsArray).toContain('tomato');
    });

    it('should return list of recipes mounted', async () => {
      const giphyServiceFake = {
        getGifUrl: async function (title) {
          return 'test.gif';
        },
      };

      const recipeList = await mountRecipesList(oneRecipe, giphyServiceFake);

      expect(recipeList).toHaveProperty('title');
      expect(recipeList).toHaveProperty('link');
      expect(recipeList).toHaveProperty('ingredients');
      expect(recipeList).toHaveProperty('gif');

      expect(typeof recipeList.title === 'string').toBeTruthy();
      expect(typeof recipeList.link === 'string').toBeTruthy();
      expect(typeof recipeList.gif === 'string').toBeTruthy();
      expect(typeof recipeList.ingredients === 'object').toBeTruthy();
      expect(recipeList.ingredients.length).toBe(2);
      expect(recipeList.ingredients).toContain('onions');
      expect(recipeList.ingredients).toContain('tomato');
    });

    it('should return array of strings', () => {
      const ingredients = 'banana,orange';
      const ingredientsArray = getArrayOfIngredients(ingredients);
      expect(ingredientsArray.length).toBe(2);
      expect(ingredientsArray).toContain('banana');
      expect(ingredientsArray).toContain('orange');
    });
  });

  describe('Recipes Services', () => {
    it('should return error offline api ', async () => {
      const ingredients = 'onions';
      const recipeService = new RecipesServices(GiphyServices);
      const getRequestResponse = {
        status: 400,
      };
      const getRecipesFn = sinon
        .stub(axios, 'get')
        .resolves(getRequestResponse);
      const recipeList = await recipeService.getRecipes(ingredients);
      expect(recipeList).toHaveProperty('error');
      expect(recipeList.error).toBe(RECIPEPUPPY_API_OFFLINE);
      getRecipesFn.restore();
    });

    it('should return error on try catch ', async () => {
      const ingredients = 'onions';
      const recipeService = new RecipesServices(GiphyServices);
      const errorMessage = 'Error na api.';
      const getRecipesFn = sinon
        .stub(axios, 'get')
        .throws(new Error(errorMessage));

      const recipeList = await recipeService.getRecipes(ingredients);
      expect(recipeList).toHaveProperty('error');
      expect(recipeList.error).toBe(errorMessage);
      getRecipesFn.restore();
    });

    it('should return empty recipe list error', async () => {
      const ingredients = 'onions';
      const recipeService = new RecipesServices(GiphyServices);
      const getRequestResponse = {
        status: 200,
        data: mockEmptyRecipeList,
      };
      const getRecipesFn = sinon
        .stub(axios, 'get')
        .resolves(getRequestResponse);
      const recipeList = await recipeService.getRecipes(ingredients);
      expect(recipeList).toHaveProperty('error');
      expect(recipeList.error).toBe(EMPTY_RECIPESLIST);
      getRecipesFn.restore();
    });

    it('should return recipe list', async () => {
      const ingredients = 'onions';
      const recipeService = new RecipesServices(GiphyServices);
      const getRequestResponse = {
        status: 200,
        data: mockRecipeList,
      };
      const getRecipesFn = sinon
        .stub(axios, 'get')
        .resolves(getRequestResponse);

      const recipeList = await recipeService.getRecipes(ingredients);

      expect(Array.isArray(recipeList)).toBeTruthy();
      expect(recipeList.length).toBe(2);
      getRecipesFn.restore();
    });

    it('should get error offline giphy services', async () => {
      const recipeService = new RecipesServices(GiphyServices);

      const getRecipesFn = sinon
        .stub(recipeService.giphyServices, 'verifyGihpyServiceIsOn')
        .resolves(false);

      const recipeList = await recipeService.getRecipesWithGif(mockRecipeList);

      expect(recipeList).toHaveProperty('error');
      getRecipesFn.restore();
    });

    it('should recipes with gif return try catch error', async () => {
      const recipeService = new RecipesServices(GiphyServices);

      const getRecipesFn = sinon
        .stub(recipeService.giphyServices, 'verifyGihpyServiceIsOn')
        .throws('Error');

      const recipeList = await recipeService.getRecipesWithGif(mockRecipeList);

      expect(recipeList).toHaveProperty('error');
      getRecipesFn.restore();
    });

    it('should return recipes list with gif', async () => {
      const recipeService = new RecipesServices(GiphyServices);
      const verifyGihpyServiceIsOnFn = sinon
        .stub(recipeService.giphyServices, 'verifyGihpyServiceIsOn')
        .returns(true);

      const getGifFn = sinon
        .stub(recipeService.giphyServices, 'getGifUrl')
        .resolves('test.gif');

      const recipeList = await recipeService.getRecipesWithGif(
        mockRecipeList.results
      );
      expect(recipeList.length).toBe(2);
      expect(typeof recipeList === 'object').toBeTruthy();
      verifyGihpyServiceIsOnFn.restore();
      getGifFn.restore();
    });
  });

  describe('Giphy Services', () => {
    it('should return gif default', async () => {
      const giphyServices = new GiphyServices();
      const getAxiosGetFn = sinon.stub(axios, 'get').throws(new Error('Error'));

      const url = await giphyServices.getGifUrl('teste');
      expect(url).toBe(GIF_DEFAULT);
      getAxiosGetFn.restore();

      const getAxiosGetWithResultFn = sinon
        .stub(axios, 'get')
        .resolves({ data: false });

      const urlWithResult = await giphyServices.getGifUrl('teste');
      expect(urlWithResult).toBe(GIF_DEFAULT);

      getAxiosGetWithResultFn.restore();
    });
    it('should return gif url', async () => {
      const giphyServices = new GiphyServices();

      const getAxiosGetWithResultFn = sinon
        .stub(axios, 'get')
        .resolves(mockGiphyResponse);

      const urlWithResult = await giphyServices.getGifUrl('teste');

      expect(typeof urlWithResult === 'string').toBeTruthy();
      expect(urlWithResult).toBe('test.gif');

      getAxiosGetWithResultFn.restore();
    });
  });
});
