import { QuestionLevel, QuestionType } from "@/app/common/enums";
import z from "zod";

const questionSchema = z.object({
  uid: z.coerce.string(),
  description: z.coerce.string(),
  level: z.enum([QuestionLevel.EASY, QuestionLevel.MEDIUM, QuestionLevel.HARD]),
  type: z.enum([QuestionType.INPUT, QuestionType.MULTIPLE, QuestionType.VOICE]),
  answerUid: z.coerce.string(),
});

export type questionData = z.infer<typeof questionSchema>;
