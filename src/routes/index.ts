/* eslint-disable new-cap */
import {Router} from 'express';
import getShoesRoutes from '@Routes/shoes.route';
import getReviewsRoutes from '@Routes/reviews.route';
import pool from '../services/db.service';
const router:Router = Router();

router.use('/shoes', getShoesRoutes(router, pool));
router.use('/reviews', getReviewsRoutes(router, pool));

export default router;
