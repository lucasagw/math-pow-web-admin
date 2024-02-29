export interface CreateAnswerDTO {
  imageUrl: string;
  statement: string;
  description: string;
}

export interface UpdateAnswerDto {
  uid: string;
  imageUrl: string;
  statement: string;
  description: string;
}
