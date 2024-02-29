import { QuestionLevel, QuestionType } from "../enums";

export interface IQuestion {
  uid: string;
  description: string;
  level: QuestionLevel;
  type: QuestionType;
  answerUid: string;
}
