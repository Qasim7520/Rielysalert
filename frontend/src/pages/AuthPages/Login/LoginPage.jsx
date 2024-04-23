import React, { useState } from "react";
import { Layout } from "../../../views/Layout";

import { LoginForm } from "./components/LoginForm/LoginForm";
import { ForgetPassword } from "./components/ForgetPassword/ForgetPassword";
import { PasswordReset } from "./components/PasswordReset/PasswordReset";
import { SuccessBox } from "./components/SuccessBox/SuccessBox";

const forms = [
  { name: "login" },
  { name: "forget_password" },
  { name: "reset_password" },
  { name: "success_box" },
];

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [selectedForm, setSelectedForm] = useState(forms[0].name);
  const handleSelection = (type) => setSelectedForm(forms[type].name);

  return (
    <Layout isLoggedIn={false} isFooter={false}>
      {selectedForm === forms[0].name && (
        <LoginForm setSelectedForm={handleSelection} />
      )}
      {selectedForm === forms[1].name && (
        <ForgetPassword setEmail={setEmail} setSelectedForm={handleSelection} />
      )}
      {selectedForm === forms[2].name && (
        <PasswordReset setSelectedForm={handleSelection} />
      )}
      {selectedForm === forms[3].name && (
        <SuccessBox email={email} setSelectedForm={handleSelection} />
      )}
    </Layout>
  );
};
