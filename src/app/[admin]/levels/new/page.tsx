"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
// Components
import { Button, Input } from "@nextui-org/react";
// Schemas
import { createLevelData, createLevelSchema } from "../schemas";
// Stores
import { useLevelStore } from "../store/levelStore";
// Navigation
import { useRouter } from "next/navigation";

const NewLevel = () => {
  const router = useRouter();
  const { storeLevel } = useLevelStore();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<createLevelData>({
    resolver: zodResolver(createLevelSchema),
  });

  const handleCreateLevel = async (data: createLevelData) => {
    try {
      await storeLevel(data);
      router.push("/admin/levels");
    } catch (error) {
      console.error(
        "Error when we tried to create a leve in new level page",
        error
      );
    }
  };

  return (
    <main className="flex-1">
      <h1 className="text-3xl mb-4">Cadastro de Ranking</h1>
      <form
        className="flex flex-col gap-2"
        onSubmit={handleSubmit(handleCreateLevel)}
      >
        <Input
          placeholder="Insira o nome do ranking"
          label="Capa"
          type="file"
          accept="image/*"
          multiple={false}
          {...register("imageUrl", { required: true })}
          errorMessage={errors.imageUrl && (errors.imageUrl.message as string)}
        />
        <Input
          placeholder="Insira o nome do ranking"
          label="Nome"
          type="text"
          labelPlacement="outside"
          required
          errorMessage={errors.title && errors.title.message}
          {...register("title", { required: true })}
        />
        <Input
          placeholder="Inicia-se em"
          label="Intervalo de ínicio"
          type="number"
          labelPlacement="outside"
          required
          errorMessage={errors.startIn && errors.startIn.message}
          {...register("startIn", { required: true })}
        />
        <Input
          placeholder="Insira o número entre 1 e 5"
          label="Número de estrelas"
          type="number"
          labelPlacement="outside"
          min={1}
          max={5}
          errorMessage={errors.numberOfStars && errors.numberOfStars.message}
          {...register("numberOfStars", { required: true })}
        />
        <Input
          placeholder="Descreva aqui o ranking"
          label="Descrição"
          type="text"
          labelPlacement="outside"
          {...register("description")}
        />
        <Button className="w-full mt-4 bg-secondary text-white" type="submit">
          Salvar
        </Button>
      </form>
    </main>
  );
};

export default NewLevel;
