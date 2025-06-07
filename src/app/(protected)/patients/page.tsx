import { Button } from "@/components/ui/button";
import {
  PageContainer,
  PageHeader,
  PageHeaderContent,
  PageActions,
  PageTitle,
  PageSubtitle,
  PageContent,
} from "@/components/ui/page-container";
import { PlusIcon } from "lucide-react";
import React from "react";
import ButtonAdd from "./_components/buttonAdd";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./_components/table-colum";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import db from "@/db";
import { patientsTable } from "@/db/schema";
import { eq } from "drizzle-orm";
// import { Container } from './styles';

const PatientsPage = async () => {
  const session = await  auth.api.getSession({
    headers: await headers()
  })

  const patients = await db.select().from(patientsTable).where(eq(patientsTable.clinicId, session?.user.clinicId as string))
 

  return (
    <PageContainer>
      <PageHeader>
        <PageHeaderContent>
          <PageTitle>Pacientes</PageTitle>
          <PageSubtitle>Gerencie os pacientes</PageSubtitle>
        </PageHeaderContent>
        <PageActions>
          <ButtonAdd />
        </PageActions>
      </PageHeader>

      <PageContent>
        <DataTable columns={columns} data={patients} />
      </PageContent>
    </PageContainer>
  );
};

export default PatientsPage;
