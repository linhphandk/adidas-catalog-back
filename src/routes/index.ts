/* eslint-disable new-cap */
import {Router} from 'express';
import getShoesRoutes from '@routes/shoes.route';
import pool from '../services/db.service';
const router:Router = Router();

router.use('/shoes', getShoesRoutes(router, pool));

export default router;
