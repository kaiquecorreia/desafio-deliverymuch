import { Router } from 'express';
import RecipesController from './app/controllers/RecipesController';

const routes = new Router();

routes.get('/recipes', RecipesController.list);

export default routes;
