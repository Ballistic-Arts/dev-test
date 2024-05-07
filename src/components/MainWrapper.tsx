import React, { ReactNode } from "react";
import { Header, Footer } from "@components";

//main wrapper, to be used for all pages to keep header & footer on every page
const Wrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Wrapper;
