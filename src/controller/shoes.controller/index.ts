import { Pool, QueryResult } from 'pg';
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
      `SELECT shoes_id,url, product_name, shoes_image.image FROM shoes 
        full join shoes_image 
        on shoes.shoes_id = shoes_image.fk_shoes
        Where shoes_image.is_default = true order by shoes_id LIMIT ` + items +' OFFSET ' + skipItems)
        .then((result): IShoes[] => {
            return result.rows;
        }).catch((e:Error)=>{
          return e
        });
    return returnValue
  }

  public static async getShoesDetail (shoesID: number,dbPool: Pool):Promise<IShoesDetail|Error>{
    let returnValue:IShoesDetail = {} as IShoesDetail
    returnValue.shoesDetail = await dbPool.query(`
      SELECT * from shoes
      where shoes_id = ${shoesID}
    `).then((result:QueryResult<IShoes>)=>{
      return result.rows[0]
    }).catch((e:Error) => e)

    if(returnValue.shoesDetail instanceof Error){
      return returnValue.shoesDetail
    }

    returnValue.images = await dbPool.query(`
      SELECT * from shoes_image
      where fk_shoes = ${shoesID}
    `).then((result:QueryResult<string[]>)=>{
      return result.rows
    }).catch((e:Error) => e)

    if(returnValue.images instanceof Error){
      return returnValue.images
    }

    return returnValue
  }
}


export interface IShoesDetail{
    shoesDetail: IShoes | Error,
    images: string[][] | Error
}