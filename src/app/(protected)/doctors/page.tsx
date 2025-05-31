import { Button } from '@/components/ui/button';
import { PageActions, PageContainer, PageContent, PageHeader, PageHeaderContent, PageSubtitle, PageTitle } from '@/components/ui/page-container';
import { Plus } from 'lucide-react';
import React from 'react';

// import { Container } from './styles';

const Doctors = () => {
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