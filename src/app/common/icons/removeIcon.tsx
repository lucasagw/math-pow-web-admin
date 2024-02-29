import { AiOutlineDelete } from "react-icons/ai";

const RemoveIcon = ({ ...props }) => {
  return <AiOutlineDelete className={`text-2xl ${props.className}`} />;
};

export default RemoveIcon;
