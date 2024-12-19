import React from "react";
import CreateQuoteForm from "./createQuote";
import PageWrapper from "@/components/wrapper/pageWrapper";
import "./index.css";

export default function CreateQuote() {
  return (
    <main>
      <PageWrapper>
        <CreateQuoteForm />
      </PageWrapper>
    </main>
  );
}
