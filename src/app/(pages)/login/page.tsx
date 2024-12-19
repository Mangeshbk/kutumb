import React from "react";
import LoginForm from "./login-form";
import PageWrapper from "@/components/wrapper/pageWrapper";
import "./index.css";

export default function Login() {
  return (
    <main>
      <PageWrapper>
        <LoginForm />
      </PageWrapper>
    </main>
  );
}
