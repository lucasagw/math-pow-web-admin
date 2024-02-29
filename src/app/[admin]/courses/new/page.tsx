"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
// Schema
import { courseData, courseSchema } from "../schema";
import { useRouter } from "next/navigation";
// Components
import { ImagePicker } from "@/app/common";
import { Button, Input, Textarea } from "@nextui-org/react";
// Stores
import useCourseStore from "../store";

const NewCourse = () => {
  const router = useRouter();
  const { storeNewCourse, isLoadingNewCourse } = useCourseStore();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<courseData>({
    resolver: zodResolver(courseSchema),
  });

  const onSubmit = async (data: courseData) => {
    try {
      await storeNewCourse(data);
      router.push("/admin/courses");
    } catch (error) {
      console.error(
        "Error when we tried to create new course in new course page",
        error
      );
    }
  };

  const handleSetImage = (image: string, file: File) => {
    setValue("img", file as unknown as string);
  };

  return (
    <main className="flex-1">
      <h1 className="text-3xl mb-4">Cadastro de curso</h1>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
        <ImagePicker onSelectImage={handleSetImage} />
        <Input
          placeholder="Insira o nome do curso"
          label="Nome"
          type="text"
          labelPlacement="outside"
          required
          errorMessage={errors.title && errors.title.message}
          {...register("title", { required: true })}
        />

        <Textarea
          placeholder="Descreva aqui o curso"
          label="Descrição"
          type="text"
          labelPlacement="outside"
          {...register("description")}
        />
        <Button
          isLoading={isLoadingNewCourse}
          className="w-full mt-4 bg-secondary text-white"
          type="submit"
        >
          Salvar
        </Button>
      </form>
    </main>
  );
};

export default NewCourse;
