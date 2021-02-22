import express, { Router } from 'express';
import { Pool } from 'pg';
import { IReview, IGetReviewParams, IReviewDB } from '@Interfaces/IReview';
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
    
    /**
   * @swagger
   * /reviews/:
   *   post:
   *     tags:
   *       - reviews
   *     summary: adds a review
   *     requestBody:
   *       description: review object
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               user_name:
   *                 type: string
   *               rating:
   *                 type: number
   *               user_comment:
   *                 type: string
   *               fk_shoes:
   *                 type: number
   *     responses:
   *       200:
   *         description: returns the review object
   *       300:
   *         description: missing parameter
   *       500:
   *         description: returned on error
   */

    router.post('/',
      (
        req: express.Request<null, null, IReview>,
        res: express.Response<IReviewDB | string | Error>,
      ) => {
        const { user_name, rating, user_comment, fk_shoes } = req.body;
        if (!user_name) {
          res.status(300).send('missing param user_name')
          return
        }
        if (typeof rating === 'undefined') {
          res.status(300).send('missing param rating')
          return
        }
        if (!user_comment) {
          res.status(300).send('missing param user_comment')
          return
        }
        if (typeof fk_shoes === 'undefined') {
          res.status(300).send('missing param fk_shoes')
          return
        }

        ReviewsController.addReview(
          user_name,
          rating,
          user_comment,
          fk_shoes,
          dbPool
        ).then((result) => {
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
