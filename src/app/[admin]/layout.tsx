// Types
import { PropsWithChildren } from "react";
// Components
import { NavHeader, WrapperContainer } from "../common";

const AdminLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <NavHeader />
      <WrapperContainer>{children}</WrapperContainer>
    </>
  );
};

export default AdminLayout;
