"use client";
import z from "zod";

export const courseSchema = z.object({
  img: z.any(),
  title: z.coerce
    .string({
      required_error: "É necessário informar o nome do curso",
    })
    .min(4, "O nome do curso deve ter no mínimo 4 caracteres")
    .trim(),
  description: z.coerce.string().trim(),
});

export type courseData = z.infer<typeof courseSchema>;
