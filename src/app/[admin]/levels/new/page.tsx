"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
// Components
import { Button, Input } from "@nextui-org/react";
import Image from "next/image";
// Schemas
import { createLevelData, createLevelSchema } from "../schemas";
// Stores
import { useLevelStore } from "../store/levelStore";
// Navigation
import { useRouter } from "next/navigation";
import { ChangeEvent, useRef, useState } from "react";

const NewLevel = () => {
  const [selectedImage, setSelectedImage] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { storeLevel, isLoadingNewLevel } = useLevelStore();
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
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

  const onImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = !!e.target.files ? e.target.files[0] : null;
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (loadEvent) => {
      if (loadEvent.target?.result) {
        setSelectedImage(loadEvent.target?.result as string);
        setValue("imageUrl", file);
      }
    };
    reader.readAsDataURL(file);
  };
  const handleFileInput = () => {
    if (!fileInputRef?.current || !fileInputRef?.current.click) return;
    fileInputRef?.current?.click();
  };

  return (
    <main className="flex-1">
      <h1 className="text-3xl mb-4">Cadastro de Ranking</h1>
      <form
        className="flex flex-col gap-2"
        onSubmit={handleSubmit(handleCreateLevel)}
      >
        <input
          type="file"
          accept="image/*"
          className="hidden"
          multiple={false}
          ref={fileInputRef}
          onChange={onImageChange}
        />
        <Image
          src={selectedImage}
          alt="selected image"
          width={200}
          height={400}
          className="rounded-xl min-w-full bg-primary h-72 cursor-pointer"
          onClick={handleFileInput}
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
        <Button
          isLoading={isLoadingNewLevel}
          className="w-full mt-4 bg-secondary text-white"
          type="submit"
        >
          Salvar
        </Button>
      </form>
    </main>
  );
};

export default NewLevel;
