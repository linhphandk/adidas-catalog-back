import express, {Router} from 'express';
import {Pool} from 'pg';
import { IShoesDetail, IGetShoesDetailParams, IGetShoesResponse, IGetShoesQueryParams } from '@Interfaces/IShoes';
import ShoesController from '@Controllers/shoes.controller';
const getShoesRoutes:(router:Router, dbPool: Pool)=>Router =
(router, dbPool) =>{
  /**
  * @swagger
  * /shoes/:
  *   get:
  *     tags:
  *       - shoes
  *     summary: Retrieve a list of shoes and page count
  *     description: Retrieve a list of shoes and page count
  *     parameters:
  *       - in: query
  *         name: items
  *         schema:
  *           type: integer
  *           required: true
  *           description: Number of items you want to retrieve
  *       - in: query
  *         name: page
  *         schema:
  *           type: integer
  *           required: true
  *           description: Page number
  *     responses:
  *       200:
  *         description: return a list of shoes and total shoe count
  *       300:
  *         description: returned when missing param
  */     
    router.get('/',
        (
            req: express.Request<null, null, null, IGetShoesQueryParams>,
            res: express.Response<IGetShoesResponse|string>,
        )=>{
            const {page, items} = req.query
            
            if(!page){
                res.status(300).send('missing param page')
                return
            }

            if(!items){
                res.status(300).send('missing param items')
                return
            }
            ShoesController.getShoesPage(page,items, dbPool).then((result)=>{
                if(!(result instanceof Error)){
                    res.status(200).send(result)
                }else{
                    res.status(500).send(result?.message)
                }
            })
           
        });

   /**
  * @swagger
  * /shoes/detail/{shoesId}:
  *   get:
  *     tags:
  *       - shoes
  *     summary: Retrieve details of a shoe
  *     parameters:
  *       - in: path
  *         name: shoesId
  *         schema:
  *           type: integer
  *           required: true
  *           description: Numeric ID of the shoe
  *     responses:
  *       200:
  *         description: test
  *       500:
  *         description: returned on error
  */

router.get('/detail/:shoesId',
    (
        req: express.Request<IGetShoesDetailParams, null, null>,
        res: express.Response<IShoesDetail|string|Error>,
    )=>{
        const {shoesId} = req.params;
        
        if(!shoesId){
            res.status(300).send('missing param page')
            return
        }

        ShoesController.getShoesDetail(shoesId, dbPool).then((result)=>{
        
            if(!(result instanceof Error)
            ){
                res.status(200).send(result)
            }else{
                res.status(500).send(result?.message)
            }
        })
       
    });


    return router;
};

export default getShoesRoutes;
