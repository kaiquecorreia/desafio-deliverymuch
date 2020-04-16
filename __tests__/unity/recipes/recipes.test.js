import axios from 'axios';
const sinon = require('sinon');
import { mockRecipeList, mockEmptyRecipeList } from './mock';
import {
  getIngredientsKeyWords,
  EMPTY_PARAMS,
  MAXKEYWORDS,
} from '../../../src/app/utils/recipes';

import RecipesServices, {
  EMPTY_RECIPESLIST,
  RECIPEPUPPY_API_OFFLINE,
} from '../../../src/app/services/RecipesServices';

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
  describe('Recipes Service', () => {
    it('should return empty recipe list error', async () => {
      const ingredients = 'onions';
      const recipeService = new RecipesServices();
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

    it('should return error offline api', async () => {
      const ingredients = 'onions';
      const recipeService = new RecipesServices();
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
      const recipeService = new RecipesServices();
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
  });
});
