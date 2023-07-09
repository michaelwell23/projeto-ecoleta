import express from 'express';
import multer from 'multer';

import multerConfig from './config/multer';

import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';

const routes = express.Router();

// config de upload de imagem
const upload = multer(multerConfig);

// Estânciando a classe
const pointsController = new PointsController();
const itemsController = new ItemsController();

// Rotas
routes.get('/items', itemsController.index);
routes.get('/points', pointsController.index);
routes.get('/points/:id', pointsController.show);

routes.post('/points', upload.single('image'), pointsController.create);

export default routes;
