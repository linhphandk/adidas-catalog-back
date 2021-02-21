import express, { Router } from 'express';
import { Pool } from 'pg';
import { IReview, IGetReviewParams } from '@Interfaces/IReview';
import ReviewsController from '@Controllers/reviews.controller';

const getReviewsRoutes: (router: Router, dbPool: Pool) => Router =
  (router, dbPool) => {
    /**
   * @swagger
   * /reviews/{shoesId}:
   *   get:
   *     tags:
   *       - reviews
   *     summary: list of reviews
   *     parameters:
   *       - in: path
   *         name: shoesId
   *         schema:
   *           type: integer
   *           required: true
   *           description: Numeric ID of the shoe
   *     responses:
   *       200:
   *         description: list of reviews by shoe ID
   *       500:
   *         description: returned on error
   */

    router.get('/:shoesId',
      (
        req: express.Request<IGetReviewParams, null, null>,
        res: express.Response<IReview[] | string | Error>,
      ) => {
        const { shoesId } = req.params;
        if (!shoesId) {
          res.status(300).send('missing param page')
          return
        }

        ReviewsController.getReviews(shoesId, dbPool).then((result) => {

          if (!(result instanceof Error)
          ) {
            res.status(200).send(result)
          } else {
            res.status(500).send(result?.message)
          }
        })

      });

    return router;
  };

export default getReviewsRoutes;
