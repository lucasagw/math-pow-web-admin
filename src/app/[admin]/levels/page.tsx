import { useLevelStore } from "./store/levelStore";
// Actions
import * as levelActions from "./actions";
// Components
import { Button, Input } from "@nextui-org/react";
import LevelCard from "./components/LevelCard";

const Levels = async () => {
  const { levels } = useLevelStore.getState();
  await levelActions.loadLevels();

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
      <section className="flex flex-col mt-4 gap-4 flex-1 h-[70vh] overflow-auto">
        {levels.map((level, idx) => (
          <LevelCard level={level} key={idx} />
        ))}
      </section>
      <div className="mt-4">
        <Button className="w-full bg-secondary text-white">Criar novo</Button>
      </div>
    </main>
  );
};

export default Levels;
