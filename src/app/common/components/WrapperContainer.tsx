// Types
import { PropsWithChildren } from "react";

const WrapperContainer = ({ children }: PropsWithChildren) => {
  return <div className="max-w-screen-lg m-auto p-4">{children}</div>;
};

export default WrapperContainer;
