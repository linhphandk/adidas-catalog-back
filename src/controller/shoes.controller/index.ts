import { Pool } from 'pg';
import IShoes from '../../interfaces/IShoes';
/**
 * handles interaction with shoes table
 * @class
 */
export default class ShoesService {
  /**
   * @method
   * @param {number} page - number of the page
   * @param {number} items - number of items that you want to get
   * @param {Pool} dbPool - instance of the database pool
   * @return {IShoes[] | Error} - returns array of shoes or an error
   */
  public static async getShoesPage(page:number, items:number, dbPool:Pool):Promise<IShoes[]| Error> {
    const skipItems: number = (page - 1) * items;
    let returnValue = await dbPool.query(
        'SELECT * FROM shoes LIMIT '+ items +' OFFSET ' + skipItems)
        .then((result): IShoes[] => {
            return result.rows;
        }).catch((e:Error)=>{
          return e
        });
    return returnValue
  }
}
