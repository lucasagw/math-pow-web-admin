"use client";
// Components
import { ILevel } from "@/app/common/types";
import { Button, Image } from "@nextui-org/react";

interface Props {
  level: ILevel;
}

const LevelCard = ({ level }: Props) => {
  const { title, imageUrl, startIn, numberOfStart, description } = level;
  const handleEdit = () => {};
  const handleDelete = () => {};

  return (
    <div className="w-full rounded-2xl bg-whiteAlt shadow-lg h-20 flex items-center p-2 justify-between">
      <div className="flex items-center gap-2">
        <Image className="w-20 h-16" alt={title} src={imageUrl} />
        <h4>{title}</h4>
      </div>
      <div className="flex items-center gap-2">
        <Button className="bg-tertiary text-white" onClick={handleEdit}>
          Editar
        </Button>
        <Button className="bg-red text-white" onClick={handleDelete}>
          Deletar
        </Button>
      </div>
    </div>
  );
};

export default LevelCard;
