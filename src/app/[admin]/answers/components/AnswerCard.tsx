"use client";
// Types
import { IAnswer } from "@/app/common/types";
// Components
import { Button, Card, CardBody, Image } from "@nextui-org/react";
// Stories
import { useAnswerStore } from "../store";
//Icons
import { RemoveIcon } from "@/app/common/icons";

interface Props {
  answer: Partial<IAnswer>;
}

const AnswerCard = ({ answer }: Props) => {
  const { deleteAnswer, isDeletingAnswer, fetchAll } = useAnswerStore();
  const { description, imageUrl, uid, statement } = answer;

  const handleDelete = async () => {
    if (!uid) return;
    await deleteAnswer(uid);
    await fetchAll();
  };

  return (
    <Card className="w-full hover:ring-1 hover:scale-[101%]">
      <CardBody className="flex flex-row items-center justify-between">
        <div className="items-center flex gap-8">
          <Image className="w-20 h-16" alt={description} src={imageUrl} />
          <h4>{statement}</h4>
        </div>
        <div className="flex items-center gap-2">
          <Button
            className="bg-red text-white"
            onClick={handleDelete}
            isLoading={isDeletingAnswer}
            startContent={<RemoveIcon />}
          >
            Deletar
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};

export default AnswerCard;
