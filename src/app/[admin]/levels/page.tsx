"use client";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
// Stories
import { useLevelStore } from "./store/levelStore";
// Components
import { Button, Input } from "@nextui-org/react";
import LevelCard from "./components/LevelCard";

const Levels = () => {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const { levels, fetchAll } = useLevelStore();

  useEffect(() => {
    fetchAll();
  }, []);

  const filteredLevels = useMemo(
    () =>
      levels.filter((level) =>
        level.description
          .toLowerCase()
          .trim()
          .includes(searchText.toLowerCase().trim())
      ),
    [searchText]
  );

  const handleChangeSearchText = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchText(value);
  };

  const handleNavigationToNewLevel = () => {
    router.push("/admin/levels/new");
  };

  return (
    <main className="flex-1">
      <h1 className="text-3xl mb-4">Rankings</h1>
      <Input
        placeholder="Pesquisar ranking"
        name="search"
        value={searchText}
        autoComplete=""
        type="text"
        aria-autocomplete="none"
        onChange={handleChangeSearchText}
      />
      <section className="flex flex-col mt-4 gap-4 flex-1 h-[70vh] overflow-auto">
        {filteredLevels.map((level, idx) => (
          <LevelCard level={level} key={idx} />
        ))}
      </section>
      <div className="mt-4">
        <Button
          className="w-full bg-secondary text-white"
          onClick={handleNavigationToNewLevel}
        >
          Criar novo
        </Button>
      </div>
    </main>
  );
};

export default Levels;
