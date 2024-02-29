"use client";
// Components
import { NextUIProvider } from "@nextui-org/react";
// Types
import { PropsWithChildren } from "react";
import { ToastContainer } from "react-toastify";

const Providers = ({ children }: PropsWithChildren) => {
  return (
    <NextUIProvider>
      <ToastContainer />
      {children}
    </NextUIProvider>
  );
};

export default Providers;
