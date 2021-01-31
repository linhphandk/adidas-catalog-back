import express, {Router} from 'express';
import {Pool} from 'pg';
import IShoes from '../../interfaces/IShoes';
import ShoesController from '../../controller/shoes.controller'
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
    interface test{
        items:number,
        page:number;
    }
    router.get('/',
        (
            req: express.Request<null, null, null, test>,
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

    return router;
};

export default getShoesRoutes;
