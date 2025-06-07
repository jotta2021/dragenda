import { Button } from '@/components/ui/button';
import { PageContainer, PageHeader, PageHeaderContent, PageActions, PageTitle, PageSubtitle, PageContent   } from '@/components/ui/page-container';
import { PlusIcon } from 'lucide-react';
import React from 'react';
import ButtonAdd from './_components/buttonAdd';
// import { Container } from './styles';

const PatientsPage = () => {
  return (
    <PageContainer>
        <PageHeader>
            <PageHeaderContent>
                    <PageTitle>Pacientes</PageTitle>
                <PageSubtitle>Gerencie os pacientes</PageSubtitle>
            </PageHeaderContent>
            <PageActions>
                <ButtonAdd/>
            </PageActions>
        </PageHeader>

        <PageContent>

        </PageContent>
    </PageContainer>
  )
}

export default PatientsPage;