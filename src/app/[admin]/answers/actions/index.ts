"use server";
import { revalidatePath } from "next/cache";
import z from "zod";
import { useAnswerStore } from "../store";

const schema = z.object({
  search: z.coerce.string().trim(),
});

export async function submitForm(formData: FormData) {
  try {
    const parsedData = schema.parse({
      search: formData.get("search"),
    });
    const findByAnswerOrDescription =
      useAnswerStore.getState().findByAnswerOrDescription;
    findByAnswerOrDescription(parsedData.search);
    revalidatePath("/answers");
  } catch (error) {
    console.error(
      "Error when we tried to submit form search in answers page",
      error
    );
  }
}

export async function loadAnswers() {
  try {
    const { fetchAll } = useAnswerStore.getState();
    await fetchAll();
    revalidatePath("/admin/answers");
  } catch (error) {
    console.error("Error when we tried to load answers in answers page", error);
  } finally {
    revalidatePath("/admin/answers");
  }
}
