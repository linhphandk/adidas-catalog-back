export interface IReview { 
  user_name: string,
  rating: number,
  user_comment: string,
  fk_shoes: number,
}

export interface IReviewDB extends IReview{ 
  review_id: number,
}
export interface IGetReviewParams { 
  shoesId: number,
}

