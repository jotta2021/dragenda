'use client'

import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth-client';
import { redirect } from 'next/navigation';
import React from 'react';

// import { Container } from './styles';

const ButtonSingOut: React.FC = () => {
  return(
    <Button onClick={()=>authClient.signOut({
        fetchOptions:{
            onSuccess:()=> {
                redirect("/authentication")
            }
        }
    })}>Sair</Button>
  )
}

export default ButtonSingOut;