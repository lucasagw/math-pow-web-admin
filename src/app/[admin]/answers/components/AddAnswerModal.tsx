//Zod
import { zodResolver } from "@hookform/resolvers/zod";

//React
import { useForm } from "react-hook-form";
import { ChangeEvent, useRef, useState } from "react";

//NextUi
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Divider,
  Input,
} from "@nextui-org/react";

//Components
import Image from "next/image";

// Schemas
import { AnswerData, answerSchema } from "../schema";

// Stores
import { useAnswerStore } from "../store/";

//Icons
import { AddFileSvg } from "../../../common/icons";

const AddAnswerModal = ({ ...props }) => {
  const { isOpen, onOpen, onOpenChange, fetchAll } = props;

  const [selectedImage, setSelectedImage] = useState<string>("");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const { storeAnswer } = useAnswerStore();
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isValid, isSubmitting },
  } = useForm<AnswerData>({
    resolver: zodResolver(answerSchema),
  });

  const handleCreateAnswer = async (data: AnswerData) => {
    try {
      await storeAnswer(data);
      await fetchAll();
    } catch (error) {
      console.error("Error when we tried to create a new answer", error);
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
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="top-center"
      backdrop="blur"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Cadastrar uma resposta
            </ModalHeader>
            <Divider />
            <ModalBody>
              <form
                className="flex flex-col gap-2"
                onSubmit={handleSubmit(handleCreateAnswer)}
              >
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  multiple={false}
                  ref={fileInputRef}
                  onChange={onImageChange}
                />
                {selectedImage ? (
                  <Image
                    src={selectedImage}
                    alt="Imagem selecionada"
                    width={200}
                    height={400}
                    className="rounded-xl min-w-full bg-primary h-56 cursor-pointer"
                    onClick={handleFileInput}
                  />
                ) : (
                  <Button
                    isIconOnly
                    aria-label="Selecione uma imagem"
                    className="rounded-xl min-w-full bg-primary h-56 cursor-pointer"
                    onClick={handleFileInput}
                  >
                    <AddFileSvg />
                  </Button>
                )}
                <Input
                  placeholder="Insira o enunciado"
                  label="Enunciado"
                  type="text"
                  labelPlacement="outside"
                  required
                  errorMessage={errors.statement && errors.statement.message}
                  {...register("statement", { required: true })}
                />
                <Input
                  placeholder="Insira uma descrição"
                  label="Descrição"
                  type="text"
                  labelPlacement="outside"
                  required
                  errorMessage={
                    errors.description && errors.description.message
                  }
                  {...register("description", { required: true })}
                />
              </form>
            </ModalBody>
            <Divider />
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Fechar
              </Button>
              <Button
                className="bg-green"
                type="button"
                onClick={async () => {
                  await handleSubmit(handleCreateAnswer)();
                  onClose();
                }}
              >
                Cadastrar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default AddAnswerModal;
