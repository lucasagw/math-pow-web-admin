import { IoIosSearch } from "react-icons/io";

const SearchIcon = ({ ...props }) => {
  return <IoIosSearch className={`text-2xl ${props.className}`} />;
};

export default SearchIcon;
