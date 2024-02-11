"use client";
// Components
import { NextUIProvider } from "@nextui-org/react";
// Types
import { PropsWithChildren } from "react";

const Providers = ({ children }: PropsWithChildren) => {
  return <NextUIProvider>{children}</NextUIProvider>;
};

export default Providers;
