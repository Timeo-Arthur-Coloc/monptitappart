import { Router } from 'express';
import { authenticate } from '../../middlewares/auth.middleware';

import * as flatshareController from "../../controllers/flatshare.controller";

const routes = Router();

routes.post('/create', authenticate, flatshareController.createFlatshare);

routes.get('/:id', authenticate, flatshareController.getFlatshare);

routes.get('/', authenticate, flatshareController.getAllFlatshares);

routes.delete('/:id', authenticate, flatshareController.deleteFlatshare);

// Route to change the chief of a flatshare
routes.put('/:id/change-chief', authenticate, flatshareController.changeChief);

export default routes;

