"use client";
import { ChangeEvent, useEffect, useMemo, useState } from "react";

// Stories
import { useAnswerStore } from "./store";
// Components
import { Button, Input, Spinner, useDisclosure } from "@nextui-org/react";
import AnswerCard from "./components/AnswerCard";
import AddAnswerModal from "./components/AddAnswerModal";
//Icons
import { AddIcon, SearchIcon } from "../../common/icons";

const Answers = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [searchText, setSearchText] = useState("");
  const { answers, fetchAll, isLoading } = useAnswerStore();

  useEffect(() => {
    fetchAll();
  }, []);

  const filteredAnswers = useMemo(
    () =>
      answers.filter((answer) =>
        answer.description
          .toLowerCase()
          .trim()
          .includes(searchText.toLowerCase().trim())
      ),
    [searchText, answers.length]
  );

  const handleChangeSearchText = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  return (
    <main className="flex-1">
      <section className="flex justify-between">
        <h1 className="text-3xl mb-4">Respostas</h1>
        <Button
          startContent={<AddIcon />}
          className="w-auto bg-secondary text-white"
          onPress={onOpen}
        >
          Adicionar
        </Button>
      </section>
      <Input
        variant="bordered"
        placeholder="Pesquisar resposta"
        name="search"
        value={searchText}
        autoComplete=""
        type="text"
        aria-autocomplete="none"
        onChange={handleChangeSearchText}
        endContent={<SearchIcon />}
      />
      <section className="flex flex-col mt-4 gap-4 flex-1 min-h-[70vh] items-center">
        {isLoading ? (
          <Spinner label="Carregando..." color="primary" />
        ) : filteredAnswers.length ? (
          filteredAnswers.map((answer, idx) => (
            <AnswerCard answer={answer} key={idx} />
          ))
        ) : (
          <h1>Não há dados para serem exibidos ...</h1>
        )}
      </section>
      <AddAnswerModal
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
        fetchAll={fetchAll}
      />
    </main>
  );
};

export default Answers;
