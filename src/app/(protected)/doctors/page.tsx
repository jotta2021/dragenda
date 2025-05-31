import { Button } from '@/components/ui/button';
import { PageActions, PageContainer, PageContent, PageHeader, PageHeaderContent, PageSubtitle, PageTitle } from '@/components/ui/page-container';
import { auth } from '@/lib/auth';
import { Plus } from 'lucide-react';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react';

// import { Container } from './styles';

const Doctors = async  () => {
  const session =  await auth.api.getSession({
    headers: await headers()
  })
if(!session){
  redirect('/authentication')
}
if(!session.user.clinicId){
  redirect('/clinic-form')
}


  return (
 
      <PageContainer>
        <PageHeader>
          <PageHeaderContent>
          <PageTitle><h1>Médicos</h1></PageTitle>
          <PageSubtitle>Gerencie os médicos da sua clínica</PageSubtitle>
          </PageHeaderContent>
          <PageActions>
          <Button>
            <Plus  />
            Adicionar Médico</Button>
        </PageActions>
        </PageHeader>
        
        <PageContent>
<div>
medicos

</div>
        </PageContent>
      </PageContainer>
  
  )
}
export default Doctors;