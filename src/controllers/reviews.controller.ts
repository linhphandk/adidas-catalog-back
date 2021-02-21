import { Pool, QueryResult } from 'pg';
import { IReview } from '../interfaces/IReview';
/**
 * handles interaction with reviews table
 * @class
 */
export default class ShoesController {
  /**
   * @method
   * @param {number} page - number of the page
   * @param {number} items - number of items that you want to get
   * @param {Pool} dbPool - instance of the database pool
   * @return {IShoes[] | Error} - returns array of shoes or an error
   */
  public static async getReviews(shoeId:number, dbPool:Pool):Promise<IReview[] | Error> {
    let listOfReviews = await dbPool.query(
      `SELECT * FROM public.reviews where fk_shoes=1;`)
      .then((result): IReview[] => {
          console.log(result.rows)
          return result.rows;
        }).catch((e:Error)=>{
          return e
        });
    return listOfReviews
  }
}
