import React, { ReactNode } from "react";
import Navbar from "../navbar/navbar";
import "./index.css";

interface IProps {
  children: ReactNode;
}

export default function PageWrapper({ children }: IProps) {
  return (
    <main>
      <Navbar />
      <main className='page_wrapper'>{children}</main>
    </main>
  );
}
