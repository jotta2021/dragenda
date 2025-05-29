
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { authClient } from "@/lib/auth-client";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
import ButtonSingOut from "./components/buttonSingOut";

// import { Container } from './styles';

const DashboardPage: React.FC = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if(!session){
    redirect("/authentication")
  }

  console.log(session);
  return (
    <div>
      <h1>Dashboard</h1>

      <h1>{session?.user?.email}</h1>
      <ButtonSingOut/>
      
    </div>
  );
};

export default DashboardPage;
