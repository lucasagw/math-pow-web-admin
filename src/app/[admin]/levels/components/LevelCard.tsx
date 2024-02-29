"use client";
import { useRouter } from "next/navigation";
// Types
import { ILevel } from "@/app/common/types";
// Components
import { Button, Image } from "@nextui-org/react";
// Stories
import { useLevelStore } from "../store/levelStore";

interface Props {
  level: Partial<ILevel>;
}

const LevelCard = ({ level }: Props) => {
  const router = useRouter();
  const { deleteLevel, isDeletingLevel, fetchAll } = useLevelStore();
  const { title, imageUrl, uid } = level;

  const handleEdit = () => {
    router.push(`/admin/levels/new/${uid}`);
  };
  const handleDelete = async () => {
    if (!uid) return;
    await deleteLevel(uid);
    await fetchAll();
  };

  return (
    <div className="w-full rounded-2xl bg-whiteAlt shadow-lg h-20 flex items-center p-2 justify-between">
      <div className="flex items-center gap-2">
        <Image className="w-20 h-16" alt={title} src={imageUrl} />
        <h4>{title}</h4>
      </div>
      <div className="flex items-center gap-2">
        {/* <Button className="bg-tertiary text-white" onClick={handleEdit}>
          Editar
        </Button> */}
        <Button
          className="bg-red text-white"
          onClick={handleDelete}
          isLoading={isDeletingLevel}
        >
          Deletar
        </Button>
      </div>
    </div>
  );
};

export default LevelCard;
