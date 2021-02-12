import express, {Router} from 'express';
import {Pool, QueryResult} from 'pg';
import IShoes from '../../interfaces/IShoes';
import ShoesController, { IShoesDetail } from '../../controller/shoes.controller'
const getShoesRoutes:(router:Router, dbPool: Pool)=>Router =
(router, dbPool) =>{
  /**
  * @swagger
  * /shoes/:
  *   get:
  *     summary: Retrieve a list of JSONPlaceholder users
  *     description: Retrieve a list of users from JSONPlaceholder.
  *     parameters:
  *       - in: query
  *         name: items
  *         schema:
  *           type: integer
  *           required: true
  *           description: Numeric ID of the user to get
  *       - in: query
  *         name: page
  *         schema:
  *           type: integer
  *           required: true
  *           description: Numeric ID of the user to get
  *     responses:
  *       200:
  *         description: test
  */
    interface IGetShoesQueryParams{
        items:number,
        page:number;
    }
    router.get('/',
        (
            req: express.Request<null, null, null, IGetShoesQueryParams>,
            res: express.Response<IShoes[]|string>,
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
                if(Array.isArray(result)){
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
  */
interface IGetShoesDetailParams{
    shoesId:number;
}

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
