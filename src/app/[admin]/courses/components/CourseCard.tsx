// Types
import { ICourse } from "@/app/common/types";
// Components
import { Card, CardBody, Image, Button } from "@nextui-org/react";
// Stores
import useCourseStore from "../store";

interface Props {
  course: ICourse;
}

const CourseCard = ({ course }: Props) => {
  const { img, title, uid } = course;

  const { deleteCourse, fetchAll, isDeletingCourse } = useCourseStore();

  const handleDeleteCourse = async () => {
    await deleteCourse(uid);
    await fetchAll();
  };
  return (
    <Card>
      <CardBody className="flex flex-row items-center justify-between">
        <div className="items-center flex gap-8">
          <Image src={img} alt="course cover" className="w-20 h-16" />
          <h4>{title}</h4>
        </div>
        <div>
          <Button
            className="bg-red text-white"
            onClick={handleDeleteCourse}
            isLoading={isDeletingCourse}
          >
            Deletar
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};

export default CourseCard;
