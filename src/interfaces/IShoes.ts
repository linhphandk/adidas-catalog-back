/* eslint-disable camelcase */
export default interface IShoes {
    url: string,
    product_name: string,
    Product_ID : string,
    Listing_Price: number,
    Sale_Price:number,
    Discount:number,
    Brand:string,
    Description:string,
    Rating:number,
    Reviews:number,
    Images:string,
    Last_Visited:string,
};

export interface IGetShoesResponse{
    shoes: IShoes[],
    count: number
}

export interface IGetShoesDetailParams {
    shoesId: number;
}

export interface IShoesDetail {
    shoesDetail: IShoes | Error,
    images: string[][] | Error
}

export interface IGetShoesQueryParams {
    items: number,
    page: number;
}