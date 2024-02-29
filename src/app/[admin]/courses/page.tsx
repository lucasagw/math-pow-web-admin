"use client";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import useCourseStore from "./store";
// Components
import { Button, Input } from "@nextui-org/react";
import CourseCard from "./components/CourseCard";

const Course = () => {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const { fetchAll, courses, isGettingCourses } = useCourseStore();

  useEffect(() => {
    fetchAll();
  }, []);

  const filteredCourses = useMemo(
    () =>
      courses.filter((course) =>
        course.title
          .toLowerCase()
          .trim()
          .includes(searchText.toLowerCase().trim())
      ),
    [searchText, isGettingCourses]
  );

  const handleChangeSearchText = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchText(value);
  };
  const handleNavigationToNewCourse = () => {
    router.push("/admin/courses/new");
  };

  return (
    <div>
      <h1 className="text-3xl mb-4">Cursos</h1>
      <Input
        placeholder="Pesquisar curso"
        name="search"
        value={searchText}
        autoComplete=""
        type="text"
        aria-autocomplete="none"
        onChange={handleChangeSearchText}
      />
      <section className="flex flex-col mt-4 gap-4 flex-1  min-h-[70vh]">
        {filteredCourses.map((course, idx) => (
          <CourseCard course={course} key={idx} />
        ))}
      </section>
      <div className="mt-4">
        <Button
          className="w-full bg-secondary text-white"
          onClick={handleNavigationToNewCourse}
        >
          Criar novo
        </Button>
      </div>
    </div>
  );
};

export default Course;
