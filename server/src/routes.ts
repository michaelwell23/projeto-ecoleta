import express from 'express';

import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';

const routes = express.Router();

// Estânciando a classe
const pointsController = new PointsController();
const itemsController = new ItemsController();

// Rotas
routes.get('/items', itemsController.index);

routes.post('/points', pointsController.create);
routes.get('/points/:id', pointsController.show);

export default routes;
