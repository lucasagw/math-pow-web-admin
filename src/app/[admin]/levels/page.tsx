import { Button, Input } from "@nextui-org/react";
import { FormEvent } from "react";
import { useLevelStore } from "./store/levelStore";
// Actions
import * as levelActions from "./actions";

const Levels = async () => {
  const { levels, fetchAll } = useLevelStore.getState();
  await fetchAll();

  return (
    <main className="flex-1">
      <h1 className="text-3xl mb-4">Rankings</h1>
      <form action={levelActions.submitForm}>
        <Input
          placeholder="Pesquisar ranking"
          type="text"
          name="search"
          endContent={
            <Button className="text-white bg-secondary" type="submit">
              Pesquisar
            </Button>
          }
        />
      </form>
    </main>
  );
};

export default Levels;
