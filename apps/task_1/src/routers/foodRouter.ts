import express, { Router } from 'express';
import * as foodController from '../controllers/foodController';

const router: Router = express.Router();

router.get('/', foodController.getAllFoods);

export default router;
