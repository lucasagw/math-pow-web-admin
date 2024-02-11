"use server";
import { revalidatePath } from "next/cache";
import z from "zod";
import { useLevelStore } from "../store/levelStore";

const schema = z.object({
  search: z.coerce.string().trim(),
});

export async function submitForm(formData: FormData) {
  try {
    const parsedData = schema.parse({
      search: formData.get("search"),
    });
    const findByTitleOrDescription =
      useLevelStore.getState().findByTitleOrDescription;
    findByTitleOrDescription(parsedData.search);
    revalidatePath("/levels");
  } catch (error) {
    console.error(
      "Error when we tried to submit form search in levels page",
      error
    );
  }
}

export async function loadLevels() {
  try {
    const { fetchAll } = useLevelStore.getState();
    await fetchAll();
    revalidatePath("/admin/levels");
  } catch (error) {
    console.error("Error when we tried to load levels  in levels page", error);
  } finally {
    revalidatePath("/admin/levels");
  }
}
