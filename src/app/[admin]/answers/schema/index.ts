"use client";
import z from "zod";

export const answerSchema = z.object({
  imageUrl: z.any(),
  statement: z.coerce
    .string({
      required_error: "É necessário definir um enunciado!",
    })
    .min(5, "O enunciado deve ter no mínimo 5 caracteres")
    .trim(),
  description: z.coerce
    .string({
      required_error: "É necessário informar uma descrição para a questão!",
    })
    .min(5, "A descrição deve ter no mínimo 5 caracteres!")
    .trim(),
});

export type AnswerData = z.infer<typeof answerSchema>;
