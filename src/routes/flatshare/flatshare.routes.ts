import { Router } from 'express';
import { authenticate } from '../../middlewares/auth.middleware';

import * as flatshareController from "../../controllers/flatshare.controller";

const routes = Router();

routes.post('/create', authenticate, flatshareController.createFlatshare);

routes.get('/:id', authenticate, flatshareController.getFlatshare);

routes.delete('/:id', authenticate, flatshareController.deleteFlatshare);

export default routes;
