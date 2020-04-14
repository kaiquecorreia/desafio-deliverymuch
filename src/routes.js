import { Router } from 'express';
const routes = new Router();

routes.get('/recipes', (req, res) => {
  return res.json({ message: 'Delivery Much' });
});

export default routes;
