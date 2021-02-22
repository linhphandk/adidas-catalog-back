import { Pool, QueryResult } from 'pg';
import { IReview, IReviewDB } from '../interfaces/IReview';
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
          return result.rows;
        }).catch((e:Error)=>{
          return e
        });
    return listOfReviews
  }

  public static async addReview(
    user_name: string,
    rating: number,
    user_comment: string,
    fk_shoes: number,
    dbPool:Pool
  ): Promise<IReviewDB | Error> {
    let result = await dbPool.query(
      `INSERT INTO reviews(user_name, rating, user_comment, fk_shoes)
       VALUES ( '${user_name}', ${rating}, '${user_comment}', ${fk_shoes})
       returning *`)
      .then((result: QueryResult<IReviewDB>): IReviewDB => {
        return result.rows[0];
      }).catch((e: Error) => {
        return e
      });
    return result
  }
}
