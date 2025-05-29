
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { authClient } from "@/lib/auth-client";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
import ButtonSingOut from "./components/buttonSingOut";
import db from "@/db";
import { eq } from "drizzle-orm";
import { userToClinicsTable } from "@/db/schema";

// import { Container } from './styles';

const DashboardPage: React.FC = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if(!session){
    redirect("/authentication")
  }

  //verifica se o usuario tem um clinica
  const clinic = await db.query.userToClinicsTable.findMany({
    where: eq(userToClinicsTable.userId,session.user.id)
  })

  if(clinic.length ===0){
    redirect("/clinic-form")
  }
  return (
    <div>
      <h1>Dashboard</h1>

      <h1>{session?.user?.email}</h1>
      <ButtonSingOut/>
      
    </div>
  );
};

export default DashboardPage;
