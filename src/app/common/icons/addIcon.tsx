import { IoMdAdd } from "react-icons/io";

const AddIcon = ({ ...props }) => {
  return <IoMdAdd className={`text-2xl ${props.className}`} />;
};

export default AddIcon;
