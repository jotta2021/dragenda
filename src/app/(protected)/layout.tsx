import React from 'react';
import { AppSidebar } from './_components/appSideBar';
import { SidebarProvider } from '@/components/ui/sidebar';

// import { Container } from './styles';

const LayoutProtected = ({children}: {children: React.ReactNode}) => {
  return (
    <SidebarProvider>
        
  
    <AppSidebar/>
      {children}
      </SidebarProvider>
  );
}

export default LayoutProtected;