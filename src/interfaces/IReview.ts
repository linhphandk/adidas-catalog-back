export interface IReview { 
  review_id: number,
  user_name: string,
  rating: number,
  comment: string,
  fk_shoes: number,
}
export interface IGetReviewParams { 
  shoesId: number,
}