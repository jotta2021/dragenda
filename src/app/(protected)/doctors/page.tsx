import { Button } from "@/components/ui/button";
import {
  PageActions,
  PageContainer,
  PageContent,
  PageHeader,
  PageHeaderContent,
  PageSubtitle,
  PageTitle,
} from "@/components/ui/page-container";
import { auth } from "@/lib/auth";
import { Plus } from "lucide-react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
import ButtonAdd from "./_components/buttonAdd";
import db from "@/db";
import { doctorsTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import DoctorCard from "./_components/doctor-card";
// import { Container } from './styles';

const Doctors = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/authentication");
  }
  if (!session.user.clinicId) {
    redirect("/clinic-form");
  }

const doctors =await db.select().from(doctorsTable).where(eq(doctorsTable.clinicId, session.user.clinicId))

  return (
    <PageContainer>
      <PageHeader>
        <PageHeaderContent>
          <PageTitle>
            <h1>Médicos</h1>
          </PageTitle>
          <PageSubtitle>Gerencie os médicos da sua clínica</PageSubtitle>
        </PageHeaderContent>
        <PageActions>
         <ButtonAdd/> 
        </PageActions>
      </PageHeader>

      <PageContent>
        <div className="grid grid-cols-4 gap-4 max-md:grid-cols-1">
          {
            doctors.map((doctor)=> (
              <DoctorCard key={doctor.id} doctor={doctor}/>
            ))
          }
        </div>
      </PageContent>
    </PageContainer>
  );
};
export default Doctors;
